import {
  SKIP_ERROR_TOAST
} from "./chunk-ISCNJM3D.js";
import {
  API_BASE_URL,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpContext
} from "./chunk-SEN52NIG.js";
import {
  BehaviorSubject,
  DOCUMENT,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  Observable,
  Optional,
  SkipSelf,
  __async,
  defer,
  inject,
  map,
  mergeMap,
  of,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-BAQCAAG6.js";

// node_modules/@auth0/angular-jwt/fesm2020/auth0-angular-jwt.mjs
var JWT_OPTIONS = new InjectionToken("JWT_OPTIONS");
var JwtHelperService = class {
  constructor(config = null) {
    this.tokenGetter = config && config.tokenGetter || function() {
    };
  }
  urlBase64Decode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += "==";
        break;
      }
      case 3: {
        output += "=";
        break;
      }
      default: {
        throw new Error("Illegal base64url string!");
      }
    }
    return this.b64DecodeUnicode(output);
  }
  // credits for decoder goes to https://github.com/atk
  b64decode(str) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = "";
    str = String(str).replace(/=+$/, "");
    if (str.length % 4 === 1) {
      throw new Error(`'atob' failed: The string to be decoded is not correctly encoded.`);
    }
    for (
      let bc = 0, bs, buffer, idx = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
  b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  }
  decodeToken(token = this.tokenGetter()) {
    if (token instanceof Promise) {
      return token.then((t) => this._decodeToken(t));
    }
    return this._decodeToken(token);
  }
  _decodeToken(token) {
    if (!token || token === "") {
      return null;
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error(`The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.`);
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error("Cannot decode the token.");
    }
    return JSON.parse(decoded);
  }
  getTokenExpirationDate(token = this.tokenGetter()) {
    if (token instanceof Promise) {
      return token.then((t) => this._getTokenExpirationDate(t));
    }
    return this._getTokenExpirationDate(token);
  }
  _getTokenExpirationDate(token) {
    let decoded;
    decoded = this.decodeToken(token);
    if (!decoded || !decoded.hasOwnProperty("exp")) {
      return null;
    }
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token = this.tokenGetter(), offsetSeconds) {
    if (token instanceof Promise) {
      return token.then((t) => this._isTokenExpired(t, offsetSeconds));
    }
    return this._isTokenExpired(token, offsetSeconds);
  }
  _isTokenExpired(token, offsetSeconds) {
    if (!token || token === "") {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return false;
    }
    return !(date.valueOf() > (/* @__PURE__ */ new Date()).valueOf() + offsetSeconds * 1e3);
  }
  getAuthScheme(authScheme, request) {
    if (typeof authScheme === "function") {
      return authScheme(request);
    }
    return authScheme;
  }
};
JwtHelperService.\u0275fac = function JwtHelperService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || JwtHelperService)(\u0275\u0275inject(JWT_OPTIONS));
};
JwtHelperService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: JwtHelperService,
  factory: JwtHelperService.\u0275fac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwtHelperService, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [JWT_OPTIONS]
      }]
    }];
  }, null);
})();
var fromPromiseOrValue = (input) => {
  if (input instanceof Promise) {
    return defer(() => input);
  }
  return of(input);
};
var JwtInterceptor = class {
  constructor(config, jwtHelper, document) {
    this.jwtHelper = jwtHelper;
    this.document = document;
    this.standardPorts = ["80", "443"];
    this.tokenGetter = config.tokenGetter;
    this.headerName = config.headerName || "Authorization";
    this.authScheme = config.authScheme || config.authScheme === "" ? config.authScheme : "Bearer ";
    this.allowedDomains = config.allowedDomains || [];
    this.disallowedRoutes = config.disallowedRoutes || [];
    this.throwNoTokenError = config.throwNoTokenError || false;
    this.skipWhenExpired = config.skipWhenExpired;
  }
  isAllowedDomain(request) {
    const requestUrl = new URL(request.url, this.document.location.origin);
    if (requestUrl.host === this.document.location.host) {
      return true;
    }
    const hostName = `${requestUrl.hostname}${requestUrl.port && !this.standardPorts.includes(requestUrl.port) ? ":" + requestUrl.port : ""}`;
    return this.allowedDomains.findIndex((domain) => typeof domain === "string" ? domain === hostName : domain instanceof RegExp ? domain.test(hostName) : false) > -1;
  }
  isDisallowedRoute(request) {
    const requestedUrl = new URL(request.url, this.document.location.origin);
    return this.disallowedRoutes.findIndex((route) => {
      if (typeof route === "string") {
        const parsedRoute = new URL(route, this.document.location.origin);
        return parsedRoute.hostname === requestedUrl.hostname && parsedRoute.pathname === requestedUrl.pathname;
      }
      if (route instanceof RegExp) {
        return route.test(request.url);
      }
      return false;
    }) > -1;
  }
  handleInterception(token, request, next) {
    const authScheme = this.jwtHelper.getAuthScheme(this.authScheme, request);
    if (!token && this.throwNoTokenError) {
      throw new Error("Could not get token from tokenGetter function.");
    }
    let tokenIsExpired = of(false);
    if (this.skipWhenExpired) {
      tokenIsExpired = token ? fromPromiseOrValue(this.jwtHelper.isTokenExpired(token)) : of(true);
    }
    if (token) {
      return tokenIsExpired.pipe(map((isExpired) => isExpired && this.skipWhenExpired ? request.clone() : request.clone({
        setHeaders: {
          [this.headerName]: `${authScheme}${token}`
        }
      })), mergeMap((innerRequest) => next.handle(innerRequest)));
    }
    return next.handle(request);
  }
  intercept(request, next) {
    if (!this.isAllowedDomain(request) || this.isDisallowedRoute(request)) {
      return next.handle(request);
    }
    const token = this.tokenGetter(request);
    return fromPromiseOrValue(token).pipe(mergeMap((asyncToken) => {
      return this.handleInterception(asyncToken, request, next);
    }));
  }
};
JwtInterceptor.\u0275fac = function JwtInterceptor_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || JwtInterceptor)(\u0275\u0275inject(JWT_OPTIONS), \u0275\u0275inject(JwtHelperService), \u0275\u0275inject(DOCUMENT));
};
JwtInterceptor.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: JwtInterceptor,
  factory: JwtInterceptor.\u0275fac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwtInterceptor, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [JWT_OPTIONS]
      }]
    }, {
      type: JwtHelperService
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var JwtModule = class _JwtModule {
  constructor(parentModule) {
    if (parentModule) {
      throw new Error(`JwtModule is already loaded. It should only be imported in your application's main module.`);
    }
  }
  static forRoot(options) {
    return {
      ngModule: _JwtModule,
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      }, options.jwtOptionsProvider || {
        provide: JWT_OPTIONS,
        useValue: options.config
      }, JwtHelperService]
    };
  }
};
JwtModule.\u0275fac = function JwtModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || JwtModule)(\u0275\u0275inject(JwtModule, 12));
};
JwtModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: JwtModule
});
JwtModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwtModule, [{
    type: NgModule
  }], function() {
    return [{
      type: JwtModule,
      decorators: [{
        type: Optional
      }, {
        type: SkipSelf
      }]
    }];
  }, null);
})();

// src/app/auth/services/authentication.service.ts
var AuthenticationService = class _AuthenticationService {
  baseUrl = inject(API_BASE_URL);
  user$$ = new BehaviorSubject(this.getUser());
  user$ = this.user$$.asObservable();
  isAuthorised$$ = new BehaviorSubject(localStorage.getItem("auth") !== null);
  isAuthorised$ = this.isAuthorised$$.asObservable();
  jwtHelperService = new JwtHelperService();
  http = inject(HttpClient);
  signIn(email, password) {
    return __async(this, null, function* () {
      const body = {
        email,
        password
      };
      const url = this.baseUrl + "/signin";
      const response = yield fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return yield this.resolveLoginReponse(response);
    });
  }
  getToken() {
    const authData = localStorage.getItem("auth");
    let parsed;
    let idToken;
    if (authData) {
      parsed = JSON.parse(authData);
      idToken = parsed.idToken;
    }
    return idToken;
  }
  register(firstName, lastName, email, password, confirmPassword) {
    return __async(this, null, function* () {
      const body = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      };
      const url = this.baseUrl + "/register";
      const response = yield fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return yield this.resolveRegisterResponse(response);
    });
  }
  signOut() {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    this.user$$.next(null);
    this.isAuthorised$$.next(false);
  }
  getUserNameById$(userId) {
    const url = `${this.baseUrl}/users/${userId}/name`;
    return this.http.get(url).pipe(map((response) => response.name));
  }
  resolveLoginReponse(response) {
    return __async(this, null, function* () {
      const result = { success: true };
      try {
        const body = yield response.json();
        if (response.ok && body.idToken) {
          const tokens = {
            idToken: body.idToken,
            accessToken: body.accessToken
          };
          localStorage.setItem("auth", JSON.stringify(tokens));
          this.isAuthorised$$.next(true);
          this.loadUser();
        } else if (!response.ok) {
          result.success = false;
          result.message = body.error;
          console.error("Login failed:", result.message);
        } else {
          result.success = false;
          result.message = "Unexpected response from the server. Please try again later.";
          console.error("Unexpected response:", body);
        }
      } catch (error) {
        result.success = false;
        result.message = "An error occurred during the login process. Please try again later.";
        console.error("Error processing response:", error);
      }
      return result;
    });
  }
  resolveRegisterResponse(response) {
    return __async(this, null, function* () {
      const body = yield response.json();
      const result = { success: true };
      if (response.ok) {
        return result;
      }
      if (body.error) {
        result.success = false;
        result.message = body.error;
        console.error("Registration failed:", result.message);
      } else {
        result.success = false;
        result.message = "Unexpected response from the server. Please try again later.";
        console.error("Unexpected response:", body);
      }
      return result;
    });
  }
  loadUser() {
    const auth = this.getTokens();
    if (auth === null) {
      return;
    }
    if (this.jwtHelperService.isTokenExpired(auth.idToken)) {
      console.warn("ID Token is expired. User data will not be loaded.");
      this.signOut();
      return;
    }
    const url = this.baseUrl + "/me";
    this.http.get(url).subscribe((user) => {
      this.user$$.next(user);
      localStorage.setItem("user", JSON.stringify(user));
    }, (error) => {
      console.error("Failed to load user data:", error);
      this.user$$.next(null);
    });
  }
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  editProfile(firstName, lastName) {
    const url = this.baseUrl + "/me";
    const body = { firstName, lastName };
    return new Observable((observer) => {
      this.http.put(url, body).subscribe({
        next: () => {
          this.loadUser();
          observer.next("Profile updated successfully");
          observer.complete();
        },
        error: (error) => {
          console.error("Error updating profile:", error);
          observer.error("Failed to update profile. Please try again later.");
        }
      });
    });
  }
  changePassword(oldPassword, newPassword) {
    const url = this.baseUrl + "/me/change-password";
    const tokens = this.getTokens();
    if (!tokens || !tokens.accessToken || this.jwtHelperService.isTokenExpired(tokens.accessToken)) {
      this.signOut();
      return new Observable((observer) => {
        observer.error("User is not authenticated. Please log in again.");
      });
    }
    const body = {
      oldPassword,
      newPassword,
      accessToken: tokens.accessToken
    };
    return new Observable((observer) => {
      this.http.put(url, body).subscribe({
        next: () => {
          observer.next("Password changed successfully");
          observer.complete();
        },
        error: (error) => {
          console.error("Error changing password:", error);
          observer.error("Failed to change password. Please try again later.");
        }
      });
    });
  }
  getTokens() {
    const authStr = localStorage.getItem("auth");
    const auth = authStr ? JSON.parse(authStr) : null;
    const tokens = auth;
    if (!tokens || !tokens.idToken || !tokens.accessToken) {
      return null;
    }
    if (this.jwtHelperService.isTokenExpired(tokens.idToken)) {
      console.warn("ID Token is expired. User data will not be loaded.");
      this.signOut();
      return null;
    }
    return tokens;
  }
  // PUT /me/profile-image
  uploadMyProfileImage(base64Image) {
    const url = this.baseUrl + "/me/profile-image";
    const body = {
      base64Image
    };
    return this.http.put(url, body);
  }
  static \u0275fac = function AuthenticationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthenticationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthenticationService, factory: _AuthenticationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthenticationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/services/reservation/reservation.service.ts
var ReservationService = class _ReservationService {
  baseUrl = inject(API_BASE_URL);
  http = inject(HttpClient);
  // makeReservation$(tableId: string, timeRange: TimeRange, guests: number): Observable<Reservation> {
  //   const url = `${this.baseUrl}/reservations`;
  //   const body = {
  //     tableId: tableId,
  //     startTime: timeRange.start,
  //     endTime: timeRange.end,
  //     guestCount: guests,
  //   };
  //   return this.http.post<Reservation>(url, body);
  // }
  makeReservation$(tableId, timeRange, guests, customerEmail, skipErrorToast = false) {
    const url = `${this.baseUrl}/reservations`;
    const body = {
      tableId,
      startTime: timeRange.start,
      endTime: timeRange.end,
      guestCount: guests
    };
    console.log("[SEND] POST body:", body);
    if (customerEmail != null) {
      body.customerEmail = customerEmail;
    }
    return this.http.post(url, body, {
      context: new HttpContext().set(SKIP_ERROR_TOAST, skipErrorToast)
    });
  }
  editReservation$(reservationId, timeRange, guestCount) {
    const url = `${this.baseUrl}/reservations`;
    const body = {
      reservationId,
      guestCount,
      startTime: timeRange.start,
      endTime: timeRange.end
    };
    return this.http.put(url, body);
  }
  cancelReservation$(reservationId) {
    const url = `${this.baseUrl}/reservations`;
    return this.http.delete(url, { body: { id: reservationId } });
  }
  getReservationsForUser$() {
    const url = `${this.baseUrl}/reservations`;
    return this.http.get(url);
  }
  getReservationFeedback(reservationId) {
    return this.http.get(`${this.baseUrl}/reservations/${reservationId}/feedback`);
  }
  getReservationById(reservationId) {
    return this.http.get(`${this.baseUrl}/reservations/${reservationId}`);
  }
  changeReservationStatus$(id, newStatus) {
    const url = `${this.baseUrl}/reservations/${id}/status`;
    const body = { newStatus };
    return this.http.patch(url, body);
  }
  static \u0275fac = function ReservationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReservationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReservationService, factory: _ReservationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReservationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AuthenticationService,
  ReservationService
};
//# debugId=913d1b07-b0e7-5f62-8143-258d556ebc1f
//# sourceMappingURL=chunk-7IOOMWOM.js.map
