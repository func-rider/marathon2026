import {
  CommonModule,
  CurrencyPipe,
  NgClass
} from "./chunk-SEN52NIG.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  computed,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-BAQCAAG6.js";

// src/app/shared/custom-components/custom-button/custom-button.component.ts
var _c0 = ["*"];
var _c1 = (a0, a1) => [a0, a1];
var CustomButtonComponent = class _CustomButtonComponent {
  variant = input(
    "primary",
    ...ngDevMode ? [{ debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  size = input(
    "extra-large",
    ...ngDevMode ? [{ debugName: "size" }] : (
      /* istanbul ignore next */
      []
    )
  );
  type = input(
    "button",
    ...ngDevMode ? [{ debugName: "type" }] : (
      /* istanbul ignore next */
      []
    )
  );
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "disabled" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  fullWidth = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "fullWidth" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  static \u0275fac = function CustomButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomButtonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomButtonComponent, selectors: [["app-custom-button"]], hostVars: 2, hostBindings: function CustomButtonComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("custom-button-host--full-width", ctx.fullWidth());
    }
  }, inputs: { variant: [1, "variant"], size: [1, "size"], type: [1, "type"], disabled: [1, "disabled"], fullWidth: [1, "fullWidth"] }, ngContentSelectors: _c0, decls: 2, vars: 8, consts: [[1, "button", "custom-button", 3, "ngClass", "type", "disabled"]], template: function CustomButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "button", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("button--full-width", ctx.fullWidth());
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c1, "button--" + ctx.variant(), "button--" + ctx.size()))("type", ctx.type())("disabled", ctx.disabled());
    }
  }, dependencies: [NgClass], styles: ["\n[_nghost-%COMP%] {\n  display: inline-block;\n  max-width: 100%;\n  vertical-align: top;\n}\n.custom-button-host--full-width[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.custom-button[_ngcontent-%COMP%] {\n  width: auto;\n}\n.custom-button.button--full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=custom-button.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomButtonComponent, [{
    type: Component,
    args: [{ selector: "app-custom-button", standalone: true, imports: [NgClass], changeDetection: ChangeDetectionStrategy.OnPush, host: {
      "[class.custom-button-host--full-width]": "fullWidth()"
    }, template: `<button\r
  class="button custom-button"\r
  [ngClass]="[\r
    'button--' + variant(),\r
    'button--' + size()\r
  ]"\r
  [class.button--full-width]="fullWidth()"\r
  [type]="type()"\r
  [disabled]="disabled()"\r
>\r
  <ng-content />\r
</button>\r
`, styles: ["/* src/app/shared/custom-components/custom-button/custom-button.component.scss */\n:host {\n  display: inline-block;\n  max-width: 100%;\n  vertical-align: top;\n}\n:host(.custom-button-host--full-width) {\n  display: block;\n  width: 100%;\n}\n.custom-button {\n  width: auto;\n}\n.custom-button.button--full-width {\n  width: 100%;\n}\n/*# sourceMappingURL=custom-button.component.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], type: [{ type: Input, args: [{ isSignal: true, alias: "type", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], fullWidth: [{ type: Input, args: [{ isSignal: true, alias: "fullWidth", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomButtonComponent, { className: "CustomButtonComponent", filePath: "app/shared/custom-components/custom-button/custom-button.component.ts", lineNumber: 35 });
})();

// src/app/models/enums/dish-sort.model.ts
var DishSort = /* @__PURE__ */ ((DishSort2) => {
  DishSort2["PriceDescending"] = "PriceDescending";
  DishSort2["PriceAscending"] = "PriceAscending";
  DishSort2["PopularityDescending"] = "PopularityDescending";
  DishSort2["PopularityAscending"] = "PopularityAscending";
  return DishSort2;
})(DishSort || {});

// src/app/models/enums/dish-type.model.ts
var DishType = /* @__PURE__ */ ((DishType2) => {
  DishType2["Appetizer"] = "Appetizer";
  DishType2["MainCourse"] = "MainCourse";
  DishType2["Dessert"] = "Dessert";
  return DishType2;
})(DishType || {});

// src/app/shared/mappers/dish-enum.mapper.ts
var DishTypeLabels = {
  ["Appetizer" /* Appetizer */]: "Appetizers",
  ["MainCourse" /* MainCourse */]: "Main Courses",
  ["Dessert" /* Dessert */]: "Desserts"
};
var DishSortingLabels = {
  ["PriceDescending" /* PriceDescending */]: "Price Descending",
  ["PriceAscending" /* PriceAscending */]: "Price Ascending",
  ["PopularityDescending" /* PopularityDescending */]: "Popularity Descending",
  ["PopularityAscending" /* PopularityAscending */]: "Popularity Ascending"
};
var DishStateLabels = {
  ["OnStop" /* OnStop */]: "On Stop",
  ["Available" /* Available */]: "Available",
  ["OutOfStock" /* OutOfStock */]: "Out Of Stock"
};

// src/app/shared/custom-components/dish-card/dish-card.component.ts
var _c02 = [[["", "dish-footer", ""]]];
var _c12 = ["[dish-footer]"];
function DishCardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.dishStateLabel());
  }
}
function DishCardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-custom-button", 10);
    \u0275\u0275listener("click", function DishCardComponent_Conditional_13_Template_app_custom_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.preOrderClicked.emit());
    });
    \u0275\u0275text(1, " Pre-Order ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r0.isUnavailable());
  }
}
var DishCardComponent = class _DishCardComponent {
  dish = input.required(
    ...ngDevMode ? [{ debugName: "dish" }] : (
      /* istanbul ignore next */
      []
    )
  );
  maxWidth = input(
    "",
    ...ngDevMode ? [{ debugName: "maxWidth" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preOrderEnabled = input(
    false,
    ...ngDevMode ? [{ debugName: "preOrderEnabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dishClicked = output();
  preOrderClicked = output();
  dishStateLabel = computed(
    () => {
      const state = this.dish().state;
      return DishStateLabels[state] ?? state;
    },
    ...ngDevMode ? [{ debugName: "dishStateLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUnavailable = computed(
    () => {
      const state = this.dish().state.toLowerCase();
      return state === "OnStop" /* OnStop */.toLowerCase() || state === "OutOfStock" /* OutOfStock */.toLowerCase();
    },
    ...ngDevMode ? [{ debugName: "isUnavailable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onCardClicked() {
    if (!this.isUnavailable() && !this.preOrderEnabled()) {
      this.dishClicked.emit();
    }
  }
  static \u0275fac = function DishCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DishCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DishCardComponent, selectors: [["app-dish-card"]], inputs: { dish: [1, "dish"], maxWidth: [1, "maxWidth"], preOrderEnabled: [1, "preOrderEnabled"] }, outputs: { dishClicked: "dishClicked", preOrderClicked: "preOrderClicked" }, ngContentSelectors: _c12, decls: 15, vars: 16, consts: [["role", "button", 1, "dish-card", 3, "click", "keydown.space", "keydown.enter", "tabindex"], [1, "status-badge"], [1, "dish-image", 3, "src", "alt"], [1, "dish-info"], [1, "dish-heading"], [1, "dish-name"], [1, "dish-meta"], [1, "dish-price"], [1, "dish-weight"], ["size", "small", "fullWidth", "", 3, "disabled"], ["size", "small", "fullWidth", "", 3, "click", "disabled"]], template: function DishCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c02);
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function DishCardComponent_Template_div_click_0_listener() {
        return ctx.onCardClicked();
      })("keydown.space", function DishCardComponent_Template_div_keydown_space_0_listener() {
        return ctx.onCardClicked();
      })("keydown.enter", function DishCardComponent_Template_div_keydown_enter_0_listener() {
        return ctx.onCardClicked();
      });
      \u0275\u0275conditionalCreate(1, DishCardComponent_Conditional_1_Template, 2, 1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 6)(8, "span", 7);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "currency");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(13, DishCardComponent_Conditional_13_Template, 2, 1, "app-custom-button", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275projection(14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("max-width", ctx.maxWidth() || null);
      \u0275\u0275classProp("unavailable", ctx.isUnavailable());
      \u0275\u0275property("tabindex", ctx.isUnavailable() ? -1 : 0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isUnavailable() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("alt", \u0275\u0275interpolate(ctx.dish().name))("src", ctx.dish().imageUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.dish().name);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 13, ctx.dish().price, "$"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.dish().weight);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.preOrderEnabled() ? 13 : -1);
    }
  }, dependencies: [CommonModule, CustomButtonComponent, CurrencyPipe], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.dish-card[_ngcontent-%COMP%] {\n  border-radius: 1.5rem;\n  box-shadow: 0 0 0.625rem 0.25rem rgba(194, 194, 194, 0.5019607843);\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  aspect-ratio: 316/304;\n  border-radius: 1.5rem;\n  padding: 1.25rem;\n  align-items: center;\n  gap: 1rem;\n  text-decoration: none;\n  position: relative;\n  box-sizing: border-box;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-image[_ngcontent-%COMP%] {\n  width: 62%;\n  aspect-ratio: 1/1;\n  object-fit: cover;\n  object-position: center;\n  border-radius: 50%;\n  box-shadow: 0 0 0.625rem 0.25rem rgba(194, 194, 194, 0.5019607843);\n  max-width: 12.25rem;\n  max-height: 12.25rem;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%]   .dish-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5;\n  font-weight: 500;\n  color: #232323;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%]   .dish-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex: none;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%]   .dish-price[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5;\n  font-weight: 600;\n  color: #0F7A37;\n}\n.dish-card[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%]   .dish-weight[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  color: #232323;\n}\n.dish-card.unavailable[_ngcontent-%COMP%] {\n  pointer-events: none;\n  cursor: not-allowed;\n}\n.dish-card.unavailable[_ngcontent-%COMP%]   .dish-image[_ngcontent-%COMP%], \n.dish-card.unavailable[_ngcontent-%COMP%]   .dish-info[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n.dish-card[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0.125rem 0.5rem;\n  gap: 0.5rem;\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: #FCE9ED;\n  color: #232323;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  border-radius: 0.5rem;\n  z-index: 2;\n  flex: none;\n  order: 2;\n  flex-grow: 0;\n}\n@media screen and (max-width: 768px) {\n  .dish-card[_ngcontent-%COMP%] {\n    width: 84.23%;\n    max-width: 360px;\n    flex-shrink: 0;\n  }\n}\n/*# sourceMappingURL=dish-card.component.css.map */"], changeDetection: 1 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DishCardComponent, [{
    type: Component,
    args: [{ selector: "app-dish-card", standalone: true, changeDetection: ChangeDetectionStrategy.Eager, imports: [CommonModule, CustomButtonComponent], template: `<div\r
    class="dish-card"\r
    role="button"\r
    [tabindex]="isUnavailable() ? -1 : 0"\r
    [class.unavailable]="isUnavailable()"\r
    [style.max-width]="maxWidth() || null"\r
    (click)="onCardClicked()"\r
    (keydown.space)="onCardClicked()"\r
    (keydown.enter)="onCardClicked()"\r
  >\r
    @if (isUnavailable()) {\r
      <div class="status-badge">{{ dishStateLabel() }}</div>\r
    }\r
    <img [src]="dish().imageUrl" alt="{{ dish().name }}" class="dish-image" />\r
    <div class="dish-info">\r
      <div class="dish-heading">\r
        <div class="dish-name">{{ dish().name }}</div>\r
        <div class="dish-meta">\r
          <span class="dish-price">{{ dish().price | currency: '$' }}</span>\r
          <span class="dish-weight">{{ dish().weight }}</span>\r
        </div>\r
      </div>\r
      @if (preOrderEnabled()) {\r
        <app-custom-button size="small" fullWidth [disabled]="isUnavailable()" (click)="preOrderClicked.emit()">\r
          Pre-Order\r
        </app-custom-button>\r
      }\r
    </div>\r
    <ng-content select="[dish-footer]"></ng-content>\r
  </div>\r
\r
`, styles: ["/* src/app/shared/custom-components/dish-card/dish-card.component.scss */\n:host {\n  display: contents;\n}\n.dish-card {\n  border-radius: 1.5rem;\n  box-shadow: 0 0 0.625rem 0.25rem rgba(194, 194, 194, 0.5019607843);\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  aspect-ratio: 316/304;\n  border-radius: 1.5rem;\n  padding: 1.25rem;\n  align-items: center;\n  gap: 1rem;\n  text-decoration: none;\n  position: relative;\n  box-sizing: border-box;\n}\n.dish-card .dish-image {\n  width: 62%;\n  aspect-ratio: 1/1;\n  object-fit: cover;\n  object-position: center;\n  border-radius: 50%;\n  box-shadow: 0 0 0.625rem 0.25rem rgba(194, 194, 194, 0.5019607843);\n  max-width: 12.25rem;\n  max-height: 12.25rem;\n}\n.dish-card .dish-info {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.dish-card .dish-info .dish-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.dish-card .dish-info .dish-name {\n  font-size: 0.875rem;\n  line-height: 1.5;\n  font-weight: 500;\n  color: #232323;\n}\n.dish-card .dish-info .dish-meta {\n  display: flex;\n  flex: none;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.dish-card .dish-info .dish-price {\n  font-size: 0.875rem;\n  line-height: 1.5;\n  font-weight: 600;\n  color: #0F7A37;\n}\n.dish-card .dish-info .dish-weight {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  color: #232323;\n}\n.dish-card.unavailable {\n  pointer-events: none;\n  cursor: not-allowed;\n}\n.dish-card.unavailable .dish-image,\n.dish-card.unavailable .dish-info {\n  opacity: 0.4;\n}\n.dish-card .status-badge {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0.125rem 0.5rem;\n  gap: 0.5rem;\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: #FCE9ED;\n  color: #232323;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  border-radius: 0.5rem;\n  z-index: 2;\n  flex: none;\n  order: 2;\n  flex-grow: 0;\n}\n@media screen and (max-width: 768px) {\n  .dish-card {\n    width: 84.23%;\n    max-width: 360px;\n    flex-shrink: 0;\n  }\n}\n/*# sourceMappingURL=dish-card.component.css.map */\n"] }]
  }], null, { dish: [{ type: Input, args: [{ isSignal: true, alias: "dish", required: true }] }], maxWidth: [{ type: Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], preOrderEnabled: [{ type: Input, args: [{ isSignal: true, alias: "preOrderEnabled", required: false }] }], dishClicked: [{ type: Output, args: ["dishClicked"] }], preOrderClicked: [{ type: Output, args: ["preOrderClicked"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DishCardComponent, { className: "DishCardComponent", filePath: "app/shared/custom-components/dish-card/dish-card.component.ts", lineNumber: 16 });
})();

export {
  CustomButtonComponent,
  DishSort,
  DishType,
  DishTypeLabels,
  DishSortingLabels,
  DishCardComponent
};
//# debugId=8fcf3b52-2ebe-5d1b-a696-989ce833a9fc
//# sourceMappingURL=chunk-DT5WR34X.js.map
