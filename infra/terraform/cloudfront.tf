data "aws_api_gateway_rest_api" "backend" {
  name = local.api_gateway_name
}

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "restaurant-frontend-oac"
  description                       = "OAC for restaurant-frontend S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "api_prefix_rewrite" {
  name    = "restaurant-frontend-api-prefix-rewrite"
  runtime = "cloudfront-js-1.0"
  publish = true
  comment = "Remove /api before forwarding requests to API Gateway"

  code = <<-JAVASCRIPT
    function handler(event) {
      var request = event.request;
      if (request.uri.indexOf('/api/') === 0) {
        request.uri = request.uri.substring(4);
      }
      return request;
    }
  JAVASCRIPT
}

resource "aws_cloudfront_function" "spa_rewrite" {
  name    = "restaurant-frontend-spa-rewrite"
  runtime = "cloudfront-js-1.0"
  publish = true
  comment = "Route Angular client-side paths to index.html"

  code = <<-JAVASCRIPT
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
      if (lastSegment.indexOf('.') === -1) {
        request.uri = '/index.html';
      }
      return request;
    }
  JAVASCRIPT
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # cheapest tier — US/Canada/Europe edge locations only

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "s3-frontend"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  origin {
    domain_name = "${data.aws_api_gateway_rest_api.backend.id}.execute-api.${var.aws_region}.amazonaws.com"
    origin_id   = "restaurant-backend-api"
    origin_path = "/develop"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1.2"]
      origin_read_timeout      = 30
      origin_keepalive_timeout = 5
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3-frontend"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_rewrite.arn
    }
  }

  ordered_cache_behavior {
    path_pattern             = "/api/*"
    target_origin_id         = "restaurant-backend-api"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    compress                 = true
    cache_policy_id          = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # Managed-CachingDisabled
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # Managed-AllViewerExceptHostHeader

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.api_prefix_rewrite.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "cloudfront_distribution_domain_name" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend.id
}
