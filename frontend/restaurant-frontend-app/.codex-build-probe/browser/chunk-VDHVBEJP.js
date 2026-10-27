import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-BAQCAAG6.js";

// src/app/pages/guest-pre-order-expired-page/guest-pre-order-expired-page.component.ts
var GuestPreOrderExpiredPageComponent = class _GuestPreOrderExpiredPageComponent {
  static \u0275fac = function GuestPreOrderExpiredPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestPreOrderExpiredPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GuestPreOrderExpiredPageComponent, selectors: [["app-guest-pre-order-expired-page"]], decls: 6, vars: 0, consts: [[1, "page"], [1, "card"]], template: function GuestPreOrderExpiredPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "This pre-order session has expired or is no longer active.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "p");
      \u0275\u0275text(5, "Please ask the reservation owner to generate a new link.");
      \u0275\u0275domElementEnd()()();
    }
  }, styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 80px);\n  display: grid;\n  place-items: center;\n  padding: 24px;\n}\n.card[_ngcontent-%COMP%] {\n  width: min(640px, 100%);\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 24px;\n}\n/*# sourceMappingURL=guest-pre-order-expired-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuestPreOrderExpiredPageComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-guest-pre-order-expired-page", changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="page">\r\n    <div class="card">\r\n        <h1>This pre-order session has expired or is no longer active.</h1>\r\n        <p>Please ask the reservation owner to generate a new link.</p>\r\n    </div>\r\n</div>', styles: ["/* src/app/pages/guest-pre-order-expired-page/guest-pre-order-expired-page.component.scss */\n.page {\n  min-height: calc(100vh - 80px);\n  display: grid;\n  place-items: center;\n  padding: 24px;\n}\n.card {\n  width: min(640px, 100%);\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 24px;\n}\n/*# sourceMappingURL=guest-pre-order-expired-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GuestPreOrderExpiredPageComponent, { className: "GuestPreOrderExpiredPageComponent", filePath: "app/pages/guest-pre-order-expired-page/guest-pre-order-expired-page.component.ts", lineNumber: 10 });
})();
export {
  GuestPreOrderExpiredPageComponent
};
//# debugId=fab1eb24-d1d8-598a-89a3-d3525a08745f
//# sourceMappingURL=chunk-VDHVBEJP.js.map
