import {
  DefaultValueAccessor,
  FormsModule,
  GuestPreorderStore,
  MainCoverImageComponent,
  ModalComponent,
  NgControlStatus,
  NgModel,
  ToastService,
  toSignal
} from "./chunk-LFOFOUR3.js";
import {
  CustomButtonComponent,
  DishCardComponent
} from "./chunk-DT5WR34X.js";
import "./chunk-4VXFMGC4.js";
import {
  ActivatedRoute,
  CurrencyPipe,
  DatePipe,
  Router,
  RouterLink
} from "./chunk-SEN52NIG.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  __async,
  computed,
  effect,
  inject,
  input,
  map,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-BAQCAAG6.js";

// src/app/pages/guest-pre-order-page/ui/guest-name-modal/guest-name-modal.component.ts
function GuestNameModalComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275text(1, "Loading reservation details...");
    \u0275\u0275elementEnd();
  }
}
function GuestNameModalComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Restaurant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "span", 11);
    \u0275\u0275text(8, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 10)(12, "span", 11);
    \u0275\u0275text(13, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 10)(17, "span", 11);
    \u0275\u0275text(18, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 12);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 10)(22, "span", 11);
    \u0275\u0275text(23, "Guests");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 12);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.invite().restaurantName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.invite().locationAddress);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.invite().dateText);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.invite().timeText);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.invite().guestsText);
  }
}
function GuestNameModalComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, "Name is required");
    \u0275\u0275elementEnd();
  }
}
var GuestNameModalComponent = class _GuestNameModalComponent {
  invite = input(
    null,
    ...ngDevMode ? [{ debugName: "invite" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmed = output();
  closed = output();
  // x / esc / backdrop (we'll ignore this on the page)
  name = signal(
    "",
    ...ngDevMode ? [{ debugName: "name" }] : (
      /* istanbul ignore next */
      []
    )
  );
  touched = signal(
    false,
    ...ngDevMode ? [{ debugName: "touched" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trimmed = computed(
    () => this.name().trim(),
    ...ngDevMode ? [{ debugName: "trimmed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  valid = computed(
    () => this.trimmed().length > 0,
    ...ngDevMode ? [{ debugName: "valid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submit() {
    this.touched.set(true);
    if (!this.valid())
      return;
    this.confirmed.emit(this.trimmed());
  }
  static \u0275fac = function GuestNameModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestNameModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GuestNameModalComponent, selectors: [["app-guest-name-modal"]], inputs: { invite: [1, "invite"] }, outputs: { confirmed: "confirmed", closed: "closed" }, decls: 13, vars: 8, consts: [[3, "closed", "title", "width", "closeOnBackdrop"], [1, "subtitle"], [1, "details-loading"], [1, "details"], [1, "field"], ["for", "guestName", 1, "field-label"], ["id", "guestName", "type", "text", "placeholder", "e.g. Jonson D.", "autocomplete", "name", 3, "ngModelChange", "blur", "keydown.enter", "ngModel"], [1, "error"], ["modal-actions", "", 1, "actions"], ["type", "button", "variant", "primary", "size", "extra-large", "fullWidth", "", 3, "click", "disabled"], [1, "row"], [1, "label"], [1, "value"]], template: function GuestNameModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-modal", 0);
      \u0275\u0275listener("closed", function GuestNameModalComponent_Template_app_modal_closed_0_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275elementStart(1, "p", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, GuestNameModalComponent_Conditional_3_Template, 2, 0, "div", 2)(4, GuestNameModalComponent_Conditional_4_Template, 26, 5, "div", 3);
      \u0275\u0275elementStart(5, "div", 4)(6, "label", 5);
      \u0275\u0275text(7, "Enter Your Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function GuestNameModalComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
        return $event;
      });
      \u0275\u0275listener("blur", function GuestNameModalComponent_Template_input_blur_8_listener() {
        return ctx.touched.set(true);
      })("keydown.enter", function GuestNameModalComponent_Template_input_keydown_enter_8_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275conditionalCreate(9, GuestNameModalComponent_Conditional_9_Template, 2, 0, "div", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 8)(11, "app-custom-button", 9);
      \u0275\u0275listener("click", function GuestNameModalComponent_Template_app_custom_button_click_11_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(12, " Browse Menu ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("title", "You\u2019re Invited!")("width", "520px")("closeOnBackdrop", false);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.invite()?.inviterName || "Someone", " invited you to pre-order for an upcoming reservation. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.invite() ? 3 : 4);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.name);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.touched() && !ctx.valid() ? 9 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.valid() || !ctx.invite());
    }
  }, dependencies: [ModalComponent, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, CustomButtonComponent], styles: ["\n[_nghost-%COMP%]     .modal-backdrop .modal-card {\n  gap: 0;\n}\n[_nghost-%COMP%]     .modal-backdrop .modal-body {\n  gap: 32px;\n}\n[_nghost-%COMP%]     .modal-backdrop .modal-actions {\n  margin-top: 32px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #232323;\n  font-size: 14px;\n  line-height: 24px;\n}\n.details[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n.row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 100px 1fr;\n  gap: 16px;\n  align-items: center;\n  font-size: 14px;\n  line-height: 24px;\n}\n.label[_ngcontent-%COMP%] {\n  color: #232323;\n  font-weight: 500;\n}\n.value[_ngcontent-%COMP%] {\n  color: #232323;\n}\n.details-loading[_ngcontent-%COMP%] {\n  color: #898989;\n  font-size: 14px;\n  line-height: 24px;\n}\n.field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 4px;\n}\n.field-label[_ngcontent-%COMP%] {\n  color: #232323;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 24px;\n}\ninput[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  height: 44px;\n  padding: 0 16px;\n  border: 1px solid #dadada;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #232323;\n  font-size: 14px;\n  line-height: 24px;\n}\ninput[_ngcontent-%COMP%]::placeholder {\n  color: #898989;\n}\n.error[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #B70B0B;\n  font-size: 12px;\n}\n.actions[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=guest-name-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuestNameModalComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-guest-name-modal", imports: [ModalComponent, FormsModule, CustomButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<app-modal [title]='"You\u2019re Invited!"' [width]="'520px'" [closeOnBackdrop]="false" (closed)="closed.emit()">\r
    <p class="subtitle">\r
        {{ invite()?.inviterName || 'Someone' }} invited you to pre-order for an upcoming reservation.\r
    </p>\r
\r
    @if (!invite()) {\r
    <div class="details-loading">Loading reservation details...</div>\r
    } @else {\r
    <div class="details">\r
        <div class="row"><span class="label">Restaurant</span><span class="value">{{ invite()!.restaurantName }}</span>\r
        </div>\r
        <div class="row"><span class="label">Location</span><span class="value">{{ invite()!.locationAddress }}</span>\r
        </div>\r
        <div class="row"><span class="label">Date</span><span class="value">{{ invite()!.dateText }}</span></div>\r
        <div class="row"><span class="label">Time</span><span class="value">{{ invite()!.timeText }}</span></div>\r
        <div class="row"><span class="label">Guests</span><span class="value">{{ invite()!.guestsText }}</span></div>\r
    </div>\r
    }\r
\r
    <div class="field">\r
        <label class="field-label" for="guestName">Enter Your Name</label>\r
        <input id="guestName" type="text" placeholder="e.g. Jonson D." [(ngModel)]="name" (blur)="touched.set(true)"\r
            (keydown.enter)="submit()" autocomplete="name" />\r
        @if (touched() && !valid()) {\r
        <div class="error">Name is required</div>\r
        }\r
    </div>\r
\r
    <div modal-actions class="actions">\r
        <app-custom-button type="button" variant="primary" size="extra-large" fullWidth\r
            [disabled]="!valid() || !invite()" (click)="submit()">\r
            Browse Menu\r
        </app-custom-button>\r
    </div>\r
</app-modal>`, styles: ["/* src/app/pages/guest-pre-order-page/ui/guest-name-modal/guest-name-modal.component.scss */\n:host ::ng-deep .modal-backdrop .modal-card {\n  gap: 0;\n}\n:host ::ng-deep .modal-backdrop .modal-body {\n  gap: 32px;\n}\n:host ::ng-deep .modal-backdrop .modal-actions {\n  margin-top: 32px;\n}\n.subtitle {\n  margin: 0;\n  color: #232323;\n  font-size: 14px;\n  line-height: 24px;\n}\n.details {\n  display: grid;\n  gap: 8px;\n}\n.row {\n  display: grid;\n  grid-template-columns: 100px 1fr;\n  gap: 16px;\n  align-items: center;\n  font-size: 14px;\n  line-height: 24px;\n}\n.label {\n  color: #232323;\n  font-weight: 500;\n}\n.value {\n  color: #232323;\n}\n.details-loading {\n  color: #898989;\n  font-size: 14px;\n  line-height: 24px;\n}\n.field {\n  display: grid;\n  gap: 4px;\n}\n.field-label {\n  color: #232323;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 24px;\n}\ninput {\n  box-sizing: border-box;\n  height: 44px;\n  padding: 0 16px;\n  border: 1px solid #dadada;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #232323;\n  font-size: 14px;\n  line-height: 24px;\n}\ninput::placeholder {\n  color: #898989;\n}\n.error {\n  margin: 0;\n  color: #B70B0B;\n  font-size: 12px;\n}\n.actions {\n  width: 100%;\n}\n/*# sourceMappingURL=guest-name-modal.component.css.map */\n"] }]
  }], null, { invite: [{ type: Input, args: [{ isSignal: true, alias: "invite", required: false }] }], confirmed: [{ type: Output, args: ["confirmed"] }], closed: [{ type: Output, args: ["closed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GuestNameModalComponent, { className: "GuestNameModalComponent", filePath: "app/pages/guest-pre-order-page/ui/guest-name-modal/guest-name-modal.component.ts", lineNumber: 15 });
})();

// src/app/pages/guest-pre-order-page/ui/guest-cart-drawer/guest-cart-drawer.component.ts
var _forTrack0 = ($index, $item) => $item.dishId;
function GuestCartDrawerComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275domElement(1, "img", 8);
    \u0275\u0275domElementStart(2, "h3", 9);
    \u0275\u0275text(3, "Your cart is empty");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 10);
    \u0275\u0275text(5, "Looks like you haven't added any dishes to your cart yet");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "button", 11);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Conditional_8_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToMenu.emit());
    });
    \u0275\u0275text(7, "Go to Menu");
    \u0275\u0275domElementEnd()();
  }
}
function GuestCartDrawerComponent_Conditional_0_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275domElement(1, "img", 20);
    \u0275\u0275domElementStart(2, "div", 21)(3, "div", 22);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 23);
    \u0275\u0275text(6, "Expected ready time - 10 minutes");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 24)(8, "button", 25);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Conditional_9_For_2_Template_button_click_8_listener() {
      const it_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.dec.emit(it_r6.dishId));
    });
    \u0275\u0275text(9, " - ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "span", 26);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "button", 27);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Conditional_9_For_2_Template_button_click_12_listener() {
      const it_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.inc.emit(it_r6.dishId));
    });
    \u0275\u0275text(13, " + ");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(14, "div", 28)(15, "button", 29);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Conditional_9_For_2_Template_button_click_15_listener() {
      const it_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.remove.emit(it_r6.dishId));
    });
    \u0275\u0275domElement(16, "img", 30);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "div", 31);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "currency");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const it_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275domProperty("src", it_r6.imageUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(it_r6.title);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("disabled", ctx_r1.busy());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(it_r6.qty);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.busy());
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.busy());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 7, it_r6.price, "$"));
  }
}
function GuestCartDrawerComponent_Conditional_0_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function GuestCartDrawerComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, GuestCartDrawerComponent_Conditional_0_Conditional_9_For_2_Template, 20, 10, "div", 13, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 14);
    \u0275\u0275conditionalCreate(4, GuestCartDrawerComponent_Conditional_0_Conditional_9_Conditional_4_Template, 2, 1, "p", 15);
    \u0275\u0275domElementStart(5, "div", 16)(6, "span", 17);
    \u0275\u0275text(7, "Grand Total");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "span", 18);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "button", 19);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Conditional_9_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitted.emit());
    });
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.items());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.error() ? 4 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 4, ctx_r1.total(), "$"));
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.items().length === 0 || ctx_r1.busy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.busy() ? "Please wait..." : "Submit Pre-Order", " ");
  }
}
function GuestCartDrawerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "button", 1);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit());
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "aside", 2)(3, "div", 3)(4, "h3", 4);
    \u0275\u0275text(5, "Cart");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "button", 5);
    \u0275\u0275domListener("click", function GuestCartDrawerComponent_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit());
    });
    \u0275\u0275domElement(7, "img", 6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(8, GuestCartDrawerComponent_Conditional_0_Conditional_8_Template, 8, 0, "div", 7)(9, GuestCartDrawerComponent_Conditional_0_Conditional_9_Template, 13, 7);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.items().length === 0 ? 8 : 9);
  }
}
var GuestCartDrawerComponent = class _GuestCartDrawerComponent {
  open = input(
    false,
    ...ngDevMode ? [{ debugName: "open" }] : (
      /* istanbul ignore next */
      []
    )
  );
  items = input(
    [],
    ...ngDevMode ? [{ debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  total = input(
    0,
    ...ngDevMode ? [{ debugName: "total" }] : (
      /* istanbul ignore next */
      []
    )
  );
  busy = input(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = input(
    null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closed = output();
  goToMenu = output();
  inc = output();
  dec = output();
  remove = output();
  submitted = output();
  static \u0275fac = function GuestCartDrawerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestCartDrawerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GuestCartDrawerComponent, selectors: [["app-guest-cart-drawer"]], inputs: { open: [1, "open"], items: [1, "items"], total: [1, "total"], busy: [1, "busy"], error: [1, "error"] }, outputs: { closed: "closed", goToMenu: "goToMenu", inc: "inc", dec: "dec", remove: "remove", submitted: "submitted" }, decls: 1, vars: 1, consts: [[1, "backdrop"], ["type", "button", "aria-label", "Close cart", 1, "backdrop-dismiss", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "guest-cart-title", 1, "drawer"], [1, "header"], ["id", "guest-cart-title"], ["type", "button", "aria-label", "Close cart", 1, "icon-button", "icon-button--small", "close", 3, "click"], ["src", "assets/svg/close.svg", "alt", "", "aria-hidden", "true"], [1, "empty"], ["src", "assets/svg/cart-empty-preorder.svg", "alt", "", "aria-hidden", "true"], [1, "empty-title"], [1, "empty-text"], ["type", "button", 1, "button", "button--tertiary", "button--small", "go", 3, "click"], [1, "list"], [1, "item"], [1, "footer"], ["role", "alert", 1, "cart-error"], [1, "total"], [1, "total-label"], [1, "total-value"], ["type", "button", 1, "submit", 3, "click", "disabled"], ["alt", "", 1, "img", 3, "src"], [1, "info"], [1, "name"], [1, "sub"], [1, "qty"], ["type", "button", "aria-label", "Decrease quantity", 1, "qty-btn", 3, "click", "disabled"], [1, "qty-value"], ["type", "button", "aria-label", "Increase quantity", 1, "qty-btn", 3, "click", "disabled"], [1, "actions"], ["type", "button", "aria-label", "Remove item", 1, "trash", 3, "click", "disabled"], ["src", "assets/svg/trash.svg", "alt", ""], [1, "price"]], template: function GuestCartDrawerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, GuestCartDrawerComponent_Conditional_0_Template, 10, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.open() ? 0 : -1);
    }
  }, dependencies: [CurrencyPipe], styles: ["\n.backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(218, 218, 218, 0.6);\n}\n.backdrop-dismiss[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n}\n.drawer[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100%);\n  height: 100%;\n  background: #ffffff;\n  box-shadow: 0 0 0.625rem 0.25rem rgba(194, 194, 194, 0.5019607843);\n  box-sizing: border-box;\n  z-index: 1;\n}\n.header[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px 64px;\n  border-bottom: 1px solid #f7f7f7;\n}\n.header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 24px;\n  transform: translateY(-50%);\n}\n.list[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 1;\n  align-content: start;\n  gap: 16px;\n  overflow: auto;\n  padding: 0 24px;\n}\n.item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 64px minmax(0, 1fr) auto;\n  gap: 12px;\n  padding: 12px;\n  border: 1px solid #f7f7f7;\n  border-radius: 12px;\n}\n.img[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  overflow-wrap: anywhere;\n}\n.sub[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  color: #575757;\n  font-size: 0.875rem;\n}\n.qty[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n}\n.qty-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #dadada;\n  border-radius: 6px;\n  background: #ffffff;\n  cursor: pointer;\n}\n.qty-btn[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: 0.55;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: space-between;\n  min-width: 58px;\n}\n.trash[_ngcontent-%COMP%] {\n  padding: 4px;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n}\n.trash[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.trash[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: 0.55;\n}\n.price[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  padding: 112px 24px 24px;\n  text-align: center;\n}\n.empty-title[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n}\n.empty-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 24px;\n}\n.go[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.footer[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  padding: 24px;\n  border-top: 1px solid #f7f7f7;\n}\n.total[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.total-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.total-value[_ngcontent-%COMP%] {\n  color: #0F7A37;\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n.cart-error[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #B70B0B;\n  font-size: 0.875rem;\n}\n.submit[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  border: 0;\n  border-radius: 8px;\n  background: #0F7A37;\n  color: #ffffff;\n  font-weight: 600;\n  cursor: pointer;\n}\n.submit[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 520px) {\n  .drawer[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .header[_ngcontent-%COMP%] {\n    padding: 16px 56px;\n  }\n  .close[_ngcontent-%COMP%] {\n    right: 16px;\n  }\n  .footer[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .empty[_ngcontent-%COMP%] {\n    padding-top: 64px;\n  }\n  .list[_ngcontent-%COMP%] {\n    padding: 0 16px;\n  }\n  .item[_ngcontent-%COMP%] {\n    grid-template-columns: 52px minmax(0, 1fr) auto;\n    gap: 8px;\n    padding: 10px;\n  }\n  .img[_ngcontent-%COMP%] {\n    width: 52px;\n    height: 52px;\n  }\n}\n/*# sourceMappingURL=guest-cart-drawer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuestCartDrawerComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-guest-cart-drawer", imports: [CurrencyPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `@if (open()) {\r
    <div class="backdrop">\r
        <button type="button" class="backdrop-dismiss" (click)="closed.emit()" aria-label="Close cart"></button>\r
        <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="guest-cart-title">\r
            <div class="header">\r
                <h3 id="guest-cart-title">Cart</h3>\r
                <button type="button" class="icon-button icon-button--small close" (click)="closed.emit()" aria-label="Close cart">\r
                    <img src="assets/svg/close.svg" alt="" aria-hidden="true" />\r
                </button>\r
            </div>\r
\r
            @if (items().length === 0) {\r
                <div class="empty">\r
                    <img src="assets/svg/cart-empty-preorder.svg" alt="" aria-hidden="true" />\r
                    <h3 class="empty-title">Your cart is empty</h3>\r
                    <span class="empty-text">Looks like you haven't added any dishes to your cart yet</span>\r
                    <button type="button" class="button button--tertiary button--small go" (click)="goToMenu.emit()">Go to Menu</button>\r
                </div>\r
            } @else {\r
                <div class="list">\r
                    @for (it of items(); track it.dishId) {\r
                        <div class="item">\r
                            <img class="img" [src]="it.imageUrl" alt="" />\r
\r
                            <div class="info">\r
                                <div class="name">{{ it.title }}</div>\r
                                <div class="sub">Expected ready time - 10 minutes</div>\r
\r
                                <div class="qty">\r
                                    <button type="button" class="qty-btn" [disabled]="busy()" (click)="dec.emit(it.dishId)" aria-label="Decrease quantity">\r
                                        -\r
                                    </button>\r
                                    <span class="qty-value">{{ it.qty }}</span>\r
                                    <button type="button" class="qty-btn" [disabled]="busy()" (click)="inc.emit(it.dishId)" aria-label="Increase quantity">\r
                                        +\r
                                    </button>\r
                                </div>\r
                            </div>\r
\r
                            <div class="actions">\r
                                <button \r
                                    type="button"\r
                                    class="trash"\r
                                    [disabled]="busy()"\r
                                    (click)="remove.emit(it.dishId)"\r
                                    aria-label="Remove item"\r
                                >\r
                                    <img src="assets/svg/trash.svg" alt="" />\r
                            </button>\r
\r
                            <div class="price">{{ it.price | currency: '$' }}</div>\r
                            </div>\r
                        </div>\r
                    }\r
                </div>\r
\r
                <div class="footer">\r
                    @if (error()) {\r
                        <p class="cart-error" role="alert">{{ error() }}</p>\r
                    }\r
                    <div class="total">\r
                        <span class="total-label">Grand Total</span>\r
                        <span class="total-value">{{ total() | currency: '$' }}</span>\r
                    </div>\r
\r
                    <button\r
                        type="button"\r
                        class="submit"\r
                        [disabled]="items().length === 0 || busy()"\r
                        (click)="submitted.emit()"\r
                    >\r
                    {{ busy() ? 'Please wait...' : 'Submit Pre-Order' }}\r
                    </button>\r
                </div>\r
            }\r
        </aside>\r
    </div>\r
}`, styles: ["/* src/app/pages/guest-pre-order-page/ui/guest-cart-drawer/guest-cart-drawer.component.scss */\n.backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: flex;\n  justify-content: flex-end;\n  background: rgba(218, 218, 218, 0.6);\n}\n.backdrop-dismiss {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n}\n.drawer {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100%);\n  height: 100%;\n  background: #ffffff;\n  box-shadow: 0 0 0.625rem 0.25rem rgba(194, 194, 194, 0.5019607843);\n  box-sizing: border-box;\n  z-index: 1;\n}\n.header {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px 64px;\n  border-bottom: 1px solid #f7f7f7;\n}\n.header h3 {\n  margin: 0;\n}\n.close {\n  position: absolute;\n  top: 50%;\n  right: 24px;\n  transform: translateY(-50%);\n}\n.list {\n  display: grid;\n  flex: 1;\n  align-content: start;\n  gap: 16px;\n  overflow: auto;\n  padding: 0 24px;\n}\n.item {\n  display: grid;\n  grid-template-columns: 64px minmax(0, 1fr) auto;\n  gap: 12px;\n  padding: 12px;\n  border: 1px solid #f7f7f7;\n  border-radius: 12px;\n}\n.img {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.info {\n  min-width: 0;\n}\n.name {\n  font-weight: 500;\n  overflow-wrap: anywhere;\n}\n.sub {\n  margin-top: 4px;\n  color: #575757;\n  font-size: 0.875rem;\n}\n.qty {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n}\n.qty-btn {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #dadada;\n  border-radius: 6px;\n  background: #ffffff;\n  cursor: pointer;\n}\n.qty-btn:disabled {\n  cursor: wait;\n  opacity: 0.55;\n}\n.actions {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: space-between;\n  min-width: 58px;\n}\n.trash {\n  padding: 4px;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n}\n.trash img {\n  width: 20px;\n  height: 20px;\n}\n.trash:disabled {\n  cursor: wait;\n  opacity: 0.55;\n}\n.price {\n  white-space: nowrap;\n}\n.empty {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  padding: 112px 24px 24px;\n  text-align: center;\n}\n.empty-title {\n  margin: 8px 0 0;\n}\n.empty-text {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 24px;\n}\n.go {\n  margin-top: 16px;\n}\n.footer {\n  display: grid;\n  gap: 12px;\n  padding: 24px;\n  border-top: 1px solid #f7f7f7;\n}\n.total {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.total-label {\n  font-weight: 600;\n}\n.total-value {\n  color: #0F7A37;\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n.cart-error {\n  margin: 0;\n  color: #B70B0B;\n  font-size: 0.875rem;\n}\n.submit {\n  width: 100%;\n  height: 44px;\n  border: 0;\n  border-radius: 8px;\n  background: #0F7A37;\n  color: #ffffff;\n  font-weight: 600;\n  cursor: pointer;\n}\n.submit:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 520px) {\n  .drawer {\n    width: 100%;\n  }\n  .header {\n    padding: 16px 56px;\n  }\n  .close {\n    right: 16px;\n  }\n  .footer {\n    padding: 18px;\n  }\n  .empty {\n    padding-top: 64px;\n  }\n  .list {\n    padding: 0 16px;\n  }\n  .item {\n    grid-template-columns: 52px minmax(0, 1fr) auto;\n    gap: 8px;\n    padding: 10px;\n  }\n  .img {\n    width: 52px;\n    height: 52px;\n  }\n}\n/*# sourceMappingURL=guest-cart-drawer.component.css.map */\n"] }]
  }], null, { open: [{ type: Input, args: [{ isSignal: true, alias: "open", required: false }] }], items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: false }] }], total: [{ type: Input, args: [{ isSignal: true, alias: "total", required: false }] }], busy: [{ type: Input, args: [{ isSignal: true, alias: "busy", required: false }] }], error: [{ type: Input, args: [{ isSignal: true, alias: "error", required: false }] }], closed: [{ type: Output, args: ["closed"] }], goToMenu: [{ type: Output, args: ["goToMenu"] }], inc: [{ type: Output, args: ["inc"] }], dec: [{ type: Output, args: ["dec"] }], remove: [{ type: Output, args: ["remove"] }], submitted: [{ type: Output, args: ["submitted"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GuestCartDrawerComponent, { className: "GuestCartDrawerComponent", filePath: "app/pages/guest-pre-order-page/ui/guest-cart-drawer/guest-cart-drawer.component.ts", lineNumber: 13 });
})();

// src/app/pages/guest-pre-order-page/ui/guest-preorder-submitted/guest-preorder-submitted.component.ts
var _forTrack02 = ($index, $item) => $item.dishId;
function GuestPreorderSubmittedComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
    \u0275\u0275pipe(2, "date");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(1, 2, ctx_r0.invite().StartTime, "HH:mm"), " - ", \u0275\u0275pipeBind2(2, 5, ctx_r0.invite().EndTime, "HH:mm"), " ");
  }
}
function GuestPreorderSubmittedComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " - ");
  }
}
function GuestPreorderSubmittedComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.invite().MaxGuestCount, " people ");
  }
}
function GuestPreorderSubmittedComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " - ");
  }
}
function GuestPreorderSubmittedComponent_For_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const it_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", it_r2.title, " \xD7 ", it_r2.qty);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, it_r2.price * it_r2.qty, "$"));
  }
}
var GuestPreorderSubmittedComponent = class _GuestPreorderSubmittedComponent {
  invite = input(
    null,
    ...ngDevMode ? [{ debugName: "invite" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guestName = input(
    "",
    ...ngDevMode ? [{ debugName: "guestName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  items = input(
    [],
    ...ngDevMode ? [{ debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  total = input(
    0,
    ...ngDevMode ? [{ debugName: "total" }] : (
      /* istanbul ignore next */
      []
    )
  );
  createNew = output();
  static \u0275fac = function GuestPreorderSubmittedComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestPreorderSubmittedComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GuestPreorderSubmittedComponent, selectors: [["app-guest-preorder-submitted"]], inputs: { invite: [1, "invite"], guestName: [1, "guestName"], items: [1, "items"], total: [1, "total"] }, outputs: { createNew: "createNew" }, decls: 55, vars: 13, consts: [[1, "page"], [1, "card"], [1, "check"], ["src", "assets/svg/check-image.svg", "alt", "", "aria-hidden", "true"], [1, "subtitle"], [1, "subtitle-2"], [1, "divider"], [1, "details"], [1, "row"], [1, "label"], [1, "value"], [1, "items"], [1, "item-row"], [1, "total"], [1, "total-label"], [1, "total-value"], ["variant", "secondary", "fullWidth", "", 3, "click"], [1, "item-title"], [1, "item-price"]], template: function GuestPreorderSubmittedComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1");
      \u0275\u0275text(5, "Pre-Order Submitted!");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275element(8, "br");
      \u0275\u0275elementStart(9, "span", 5);
      \u0275\u0275text(10, "The restaurant will have everything ready for you.");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(11, "div", 6);
      \u0275\u0275elementStart(12, "div", 7)(13, "div", 8)(14, "span", 9);
      \u0275\u0275text(15, "Restaurant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 10);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 8)(19, "span", 9);
      \u0275\u0275text(20, "Location");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 10);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 8)(24, "span", 9);
      \u0275\u0275text(25, "Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 10);
      \u0275\u0275text(27);
      \u0275\u0275pipe(28, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 8)(30, "span", 9);
      \u0275\u0275text(31, "Time");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span", 10);
      \u0275\u0275conditionalCreate(33, GuestPreorderSubmittedComponent_Conditional_33_Template, 3, 8)(34, GuestPreorderSubmittedComponent_Conditional_34_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 8)(36, "span", 9);
      \u0275\u0275text(37, "Guests");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span", 10);
      \u0275\u0275conditionalCreate(39, GuestPreorderSubmittedComponent_Conditional_39_Template, 1, 1)(40, GuestPreorderSubmittedComponent_Conditional_40_Template, 1, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(41, "div", 6);
      \u0275\u0275elementStart(42, "h3");
      \u0275\u0275text(43, "Your items");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 11);
      \u0275\u0275repeaterCreate(45, GuestPreorderSubmittedComponent_For_46_Template, 6, 6, "div", 12, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 13)(48, "span", 14);
      \u0275\u0275text(49, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "strong", 15);
      \u0275\u0275text(51);
      \u0275\u0275pipe(52, "currency");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "app-custom-button", 16);
      \u0275\u0275listener("click", function GuestPreorderSubmittedComponent_Template_app_custom_button_click_53_listener() {
        return ctx.createNew.emit();
      });
      \u0275\u0275text(54, " Create New Pre-Order ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" Your selections have been added to ", ctx.guestName() || "guest", "'s table. ");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.invite()?.RestaurantName || "-");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.invite()?.LocationAddress || "-");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.invite()?.StartTime ? \u0275\u0275pipeBind2(28, 7, ctx.invite().StartTime, "MMM dd, yyyy") : "-");
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.invite()?.StartTime && ctx.invite()?.EndTime ? 33 : 34);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.invite()?.MaxGuestCount ? 39 : 40);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.items());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(52, 10, ctx.total(), "$"));
    }
  }, dependencies: [CustomButtonComponent, CurrencyPipe, DatePipe], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 66px);\n  display: grid;\n  place-items: center;\n  padding: 16px;\n  background: #F7F7EC;\n  box-sizing: border-box;\n}\n.card[_ngcontent-%COMP%] {\n  width: min(620px, 100%);\n  background: #ffffff;\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: 0 0 5px rgba(218, 218, 218, 0.7);\n  text-align: center;\n  box-sizing: border-box;\n}\n.check[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin: 0 0 16px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 32px;\n  line-height: 40px;\n  font-weight: 500;\n  color: #232323;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #575757;\n  font-size: 14px;\n  line-height: 24px;\n}\n.subtitle-2[_ngcontent-%COMP%] {\n  color: #575757;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  margin: 20px 0;\n  background: #dadada;\n}\n.details[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  text-align: left;\n}\n.row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 100px minmax(0, 1fr);\n  gap: 16px;\n  align-items: center;\n  font-size: 14px;\n  line-height: 24px;\n}\n.label[_ngcontent-%COMP%] {\n  color: #232323;\n  font-weight: 500;\n}\n.value[_ngcontent-%COMP%] {\n  color: #232323;\n  overflow-wrap: anywhere;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  text-align: left;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n  color: #232323;\n}\n.items[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  text-align: left;\n}\n.item-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 14px;\n  line-height: 24px;\n}\n.item-title[_ngcontent-%COMP%] {\n  color: #575757;\n}\n.item-price[_ngcontent-%COMP%] {\n  color: #232323;\n  font-weight: 600;\n}\n.total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 24px 0;\n  text-align: left;\n}\n.total-label[_ngcontent-%COMP%] {\n  color: #232323;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n}\n.total-value[_ngcontent-%COMP%] {\n  color: #0F7A37;\n  font-size: 20px;\n  line-height: 32px;\n  font-weight: 600;\n}\n@media (max-width: 480px) {\n  .page[_ngcontent-%COMP%] {\n    min-height: calc(100vh - 58px);\n    padding: 12px;\n  }\n  .card[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n    border-radius: 16px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 26px;\n    line-height: 36px;\n  }\n}\n/*# sourceMappingURL=guest-preorder-submitted.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuestPreorderSubmittedComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-guest-preorder-submitted", imports: [CurrencyPipe, DatePipe, CustomButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">\r
    <div class="card">\r
        <div class="check">\r
            <img src="assets/svg/check-image.svg" alt="" aria-hidden="true" />\r
        </div>\r
\r
        <h1>Pre-Order Submitted!</h1>\r
\r
        <p class="subtitle">\r
            Your selections have been added to {{ guestName() || 'guest' }}'s table.\r
            <br />\r
            <span class="subtitle-2">The restaurant will have everything ready for you.</span>\r
        </p>\r
\r
        <div class="divider"></div>\r
\r
        <div class="details">\r
            <div class="row"><span class="label">Restaurant</span><span class="value">{{ invite()?.RestaurantName || '-'\r
                    }}</span></div>\r
            <div class="row"><span class="label">Location</span><span class="value">{{ invite()?.LocationAddress || '-'\r
                    }}</span></div>\r
            <div class="row"><span class="label">Date</span><span class="value">{{ invite()?.StartTime ? (invite()!.StartTime | date: 'MMM dd, yyyy') : '-' }}</span>\r
            </div>\r
\r
            <div class="row">\r
                <span class="label">Time</span>\r
                <span class="value">\r
                    @if (invite()?.StartTime && invite()?.EndTime) {\r
                    {{ invite()!.StartTime | date: 'HH:mm' }} - {{ invite()!.EndTime | date: 'HH:mm' }}\r
                    } @else { - }\r
                </span>\r
            </div>\r
\r
            <div class="row">\r
                <span class="label">Guests</span>\r
                <span class="value">\r
                    @if (invite()?.MaxGuestCount) { {{ invite()!.MaxGuestCount }} people } @else { - }\r
                </span>\r
            </div>\r
        </div>\r
\r
        <div class="divider"></div>\r
\r
        <h3>Your items</h3>\r
\r
        <div class="items">\r
            @for (it of items(); track it.dishId) {\r
            <div class="item-row">\r
                <span class="item-title">{{ it.title }} \xD7 {{ it.qty }}</span>\r
                <span class="item-price">{{ it.price * it.qty | currency: '$' }}</span>\r
            </div>\r
            }\r
        </div>\r
\r
        <div class="total">\r
            <span class="total-label">Total</span>\r
            <strong class="total-value">{{ total() | currency: '$' }}</strong>\r
        </div>\r
\r
        <app-custom-button variant="secondary" fullWidth (click)="createNew.emit()">\r
            Create New Pre-Order\r
        </app-custom-button>\r
    </div>\r
</div>`, styles: ["/* src/app/pages/guest-pre-order-page/ui/guest-preorder-submitted/guest-preorder-submitted.component.scss */\n.page {\n  min-height: calc(100vh - 66px);\n  display: grid;\n  place-items: center;\n  padding: 16px;\n  background: #F7F7EC;\n  box-sizing: border-box;\n}\n.card {\n  width: min(620px, 100%);\n  background: #ffffff;\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: 0 0 5px rgba(218, 218, 218, 0.7);\n  text-align: center;\n  box-sizing: border-box;\n}\n.check {\n  display: flex;\n  justify-content: center;\n  margin: 0 0 16px;\n}\nh1 {\n  margin: 0 0 16px;\n  font-size: 32px;\n  line-height: 40px;\n  font-weight: 500;\n  color: #232323;\n}\n.subtitle {\n  margin: 0;\n  color: #575757;\n  font-size: 14px;\n  line-height: 24px;\n}\n.subtitle-2 {\n  color: #575757;\n}\n.divider {\n  height: 1px;\n  margin: 20px 0;\n  background: #dadada;\n}\n.details {\n  display: grid;\n  gap: 8px;\n  text-align: left;\n}\n.row {\n  display: grid;\n  grid-template-columns: 100px minmax(0, 1fr);\n  gap: 16px;\n  align-items: center;\n  font-size: 14px;\n  line-height: 24px;\n}\n.label {\n  color: #232323;\n  font-weight: 500;\n}\n.value {\n  color: #232323;\n  overflow-wrap: anywhere;\n}\nh3 {\n  margin: 0 0 20px;\n  text-align: left;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n  color: #232323;\n}\n.items {\n  display: grid;\n  gap: 8px;\n  text-align: left;\n}\n.item-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 14px;\n  line-height: 24px;\n}\n.item-title {\n  color: #575757;\n}\n.item-price {\n  color: #232323;\n  font-weight: 600;\n}\n.total {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 24px 0;\n  text-align: left;\n}\n.total-label {\n  color: #232323;\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n}\n.total-value {\n  color: #0F7A37;\n  font-size: 20px;\n  line-height: 32px;\n  font-weight: 600;\n}\n@media (max-width: 480px) {\n  .page {\n    min-height: calc(100vh - 58px);\n    padding: 12px;\n  }\n  .card {\n    padding: 24px 16px;\n    border-radius: 16px;\n  }\n  h1 {\n    font-size: 26px;\n    line-height: 36px;\n  }\n}\n/*# sourceMappingURL=guest-preorder-submitted.component.css.map */\n"] }]
  }], null, { invite: [{ type: Input, args: [{ isSignal: true, alias: "invite", required: false }] }], guestName: [{ type: Input, args: [{ isSignal: true, alias: "guestName", required: false }] }], items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: false }] }], total: [{ type: Input, args: [{ isSignal: true, alias: "total", required: false }] }], createNew: [{ type: Output, args: ["createNew"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GuestPreorderSubmittedComponent, { className: "GuestPreorderSubmittedComponent", filePath: "app/pages/guest-pre-order-page/ui/guest-preorder-submitted/guest-preorder-submitted.component.ts", lineNumber: 15 });
})();

// src/app/pages/guest-pre-order-page/guest-pre-order-page.component.ts
var _forTrack03 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function GuestPreOrderPageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-guest-preorder-submitted", 1);
    \u0275\u0275listener("createNew", function GuestPreOrderPageComponent_Conditional_0_Template_app_guest_preorder_submitted_createNew_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.store.createNewPreorder());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("items", ctx_r1.store.cartItems())("total", ctx_r1.store.total())("guestName", ctx_r1.store.guestName())("invite", ctx_r1.store.invite());
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 2)(1, "h1");
    \u0275\u0275text(2, "We couldn\u2019t load the invitation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "This may be a temporary connection or server issue. Please try again.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function GuestPreOrderPageComponent_Conditional_1_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.retryInviteLoad());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.store.inviteLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.store.inviteLoading() ? "Retrying..." : "Try again", " ");
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const vm_r5 = ctx;
    \u0275\u0275textInterpolate3(" You are making a pre-order for the reservation ", vm_r5.locationAddress, ", ", vm_r5.tableNumberText, ", ", vm_r5.timeText, " ");
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Loading reservation details... ");
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Reservation details are unavailable ");
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1, "Loading menu...");
    \u0275\u0275elementEnd();
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.store.menuError());
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1, "Menu is empty");
    \u0275\u0275elementEnd();
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_For_6_Template_button_click_0_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectCategory(category_r8.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r1.selectedCategory() === category_r8.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r8.label, " ");
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-dish-card", 34);
    \u0275\u0275listener("preOrderClicked", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_For_19_Template_app_dish_card_preOrderClicked_0_listener() {
      const dish_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addDishToCart(dish_r10));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dish_r10 = ctx.$implicit;
    \u0275\u0275property("dish", dish_r10)("preOrderEnabled", true);
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 19)(1, "div", 22)(2, "nav", 23)(3, "button", 24);
    \u0275\u0275listener("click", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectCategory(null));
    });
    \u0275\u0275text(4, " All dishes ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_For_6_Template, 2, 3, "button", 25, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 26)(8, "label", 27);
    \u0275\u0275text(9, "Sort by:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 28);
    \u0275\u0275listener("change", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_Template_select_change_10_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onSortChanged($event));
    });
    \u0275\u0275elementStart(11, "option", 29);
    \u0275\u0275text(12, "Recommended");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 30);
    \u0275\u0275text(14, "Price: Low to high");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 31);
    \u0275\u0275text(16, "Price: High to low");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 32);
    \u0275\u0275repeaterCreate(18, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_For_19_Template, 1, 2, "app-dish-card", 33, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.selectedCategory() === null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.categoryOptions());
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.selectedSort());
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.visibleDishes());
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-guest-name-modal", 35);
    \u0275\u0275listener("confirmed", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_27_Template_app_guest_name_modal_confirmed_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.store.join($event));
    })("closed", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_27_Template_app_guest_name_modal_closed_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.noop());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("invite", ctx_r1.store.inviteVm());
  }
}
function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275conditionalCreate(2, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_2_Template, 1, 3)(3, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_3_Template, 1, 0)(4, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_4_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCart());
    });
    \u0275\u0275element(6, "img", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "div", 9)(9, "a", 10);
    \u0275\u0275text(10, "Main page");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "\u203A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 11);
    \u0275\u0275text(14, "Menu");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "section", 12);
    \u0275\u0275element(16, "app-main-cover-image", 13);
    \u0275\u0275elementStart(17, "div", 14)(18, "p", 15);
    \u0275\u0275text(19, "Green & Tasty Restaurants");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "h1", 16);
    \u0275\u0275text(21, "Menu");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "main", 17);
    \u0275\u0275conditionalCreate(23, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_23_Template, 2, 0, "div", 18)(24, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_24_Template, 2, 1, "div", 18)(25, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_25_Template, 2, 0, "div", 18)(26, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_26_Template, 20, 3, "section", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Conditional_27_Template, 1, 1, "app-guest-name-modal", 20);
    \u0275\u0275elementStart(28, "app-guest-cart-drawer", 21);
    \u0275\u0275listener("closed", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_app_guest_cart_drawer_closed_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeCart());
    })("goToMenu", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_app_guest_cart_drawer_goToMenu_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeCart());
    })("inc", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_app_guest_cart_drawer_inc_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.store.inc($event));
    })("dec", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_app_guest_cart_drawer_dec_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.store.dec($event));
    })("remove", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_app_guest_cart_drawer_remove_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.store.remove($event));
    })("submitted", function GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template_app_guest_cart_drawer_submitted_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.store.submitPreorder());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.store.inviteVm()) ? 2 : ctx_r1.store.inviteLoading() ? 3 : 4, tmp_2_0);
    \u0275\u0275advance(21);
    \u0275\u0275conditional(ctx_r1.store.menuLoading() ? 23 : ctx_r1.store.menuError() ? 24 : !ctx_r1.store.hasMenu() ? 25 : 26);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx_r1.store.guestName() ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("open", ctx_r1.isCartOpen())("items", ctx_r1.store.cartItems())("total", ctx_r1.store.total())("busy", ctx_r1.store.cartBusy())("error", ctx_r1.store.cartError());
  }
}
function GuestPreOrderPageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GuestPreOrderPageComponent_Conditional_1_Conditional_0_Template, 7, 2, "section", 2)(1, GuestPreOrderPageComponent_Conditional_1_Conditional_1_Template, 29, 8);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.store.inviteError() === "retryable" ? 0 : 1);
  }
}
var GuestPreOrderPageComponent = class _GuestPreOrderPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  toast = inject(ToastService);
  store = inject(GuestPreorderStore);
  isCartOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCartOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCategory = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedCategory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSort = signal(
    "recommended",
    ...ngDevMode ? [{ debugName: "selectedSort" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categoryOptions = computed(
    () => this.store.menuCategories().map((key) => ({ key, label: this.categoryLabel(key) })),
    ...ngDevMode ? [{ debugName: "categoryOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleDishes = computed(
    () => {
      const selectedCategory = this.selectedCategory();
      const dishes = Object.entries(this.store.menuByCategory()).filter(([category]) => !selectedCategory || category === selectedCategory).flatMap(([category, categoryDishes]) => categoryDishes.map((dish) => this.toCardDish(dish, category)));
      switch (this.selectedSort()) {
        case "price-asc":
          return dishes.sort((a, b) => a.price - b.price);
        case "price-desc":
          return dishes.sort((a, b) => b.price - a.price);
        default:
          return dishes;
      }
    },
    ...ngDevMode ? [{ debugName: "visibleDishes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // token from /guest-pre-order/:token
  token = toSignal(this.route.paramMap.pipe(map((pm) => pm.get("token") ?? "")), { initialValue: "" });
  constructor() {
    effect(() => {
      const t = this.token();
      if (t)
        this.store.initContext(t);
    });
    effect(() => {
      if (this.store.inviteError() === "expired") {
        this.router.navigateByUrl("/guest-pre-order-expired");
      }
    });
  }
  openCart() {
    this.isCartOpen.set(true);
  }
  closeCart() {
    this.isCartOpen.set(false);
  }
  retryInviteLoad() {
    const token = this.token();
    if (token)
      void this.store.loadInviteByToken(token);
  }
  selectCategory(category) {
    this.selectedCategory.set(category);
  }
  onSortChanged(event) {
    this.selectedSort.set(event.target.value);
  }
  addDishToCart(dish) {
    return __async(this, null, function* () {
      const added = yield this.store.addDish({
        dishId: dish.id,
        title: dish.name,
        price: dish.price,
        imageUrl: dish.imageUrl
      });
      if (added) {
        this.toast.success(`${dish.name} added to your pre-order.`, "Added");
      }
    });
  }
  categoryLabel(category) {
    const labels = {
      Appetizer: "Appetizers",
      MainCourse: "Main Courses",
      Dessert: "Desserts"
    };
    return labels[category] ?? category.replace(/([a-z])([A-Z])/g, "$1 $2");
  }
  toCardDish(dish, category) {
    return {
      id: dish.id,
      name: dish.name,
      imageUrl: dish.imageUrl || "assets/img/dish.png",
      price: dish.price,
      state: dish.selectable ? dish.state : "OutOfStock",
      weight: dish.weight ?? "",
      dishType: category,
      description: dish.description ?? "",
      calories: dish.calories ?? "",
      proteins: dish.proteins ?? "",
      carbohydrates: dish.carbohydrates ?? "",
      fats: dish.fats ?? "",
      vitamins: dish.vitamins ?? ""
    };
  }
  noop() {
  }
  static \u0275fac = function GuestPreOrderPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestPreOrderPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GuestPreOrderPageComponent, selectors: [["app-guest-pre-order-page"]], decls: 2, vars: 1, consts: [[3, "items", "total", "guestName", "invite"], [3, "createNew", "items", "total", "guestName", "invite"], ["role", "alert", 1, "invite-retry"], ["type", "button", 3, "click", "disabled"], [1, "reservation-strip"], [1, "strip-text"], ["type", "button", "aria-label", "Open cart", 1, "cart-btn", 3, "click"], ["src", "assets/svg/cart-empty.svg", "alt", ""], [1, "menu-container"], [1, "page-navigation"], ["routerLink", "/main"], [1, "page-navigation__location"], [1, "hero-section"], ["src", "assets/img/main-page-cover.webp", "alt", "Fresh restaurant dishes"], [1, "hero-text-block"], [1, "hero-subtitle"], [1, "hero-title"], [1, "content-sections"], [1, "menu-placeholder"], ["aria-label", "Pre-order menu", 1, "menu-section"], [3, "invite"], [3, "closed", "goToMenu", "inc", "dec", "remove", "submitted", "open", "items", "total", "busy", "error"], [1, "filter-sort-bar"], ["aria-label", "Dish categories", 1, "category-buttons"], ["type", "button", 3, "click"], ["type", "button", 3, "active"], [1, "sort-dropdown"], ["for", "guestMenuSort"], ["id", "guestMenuSort", 3, "change", "value"], ["value", "recommended"], ["value", "price-asc"], ["value", "price-desc"], [1, "dish-cards"], [3, "dish", "preOrderEnabled"], [3, "preOrderClicked", "dish", "preOrderEnabled"], [3, "confirmed", "closed", "invite"]], template: function GuestPreOrderPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, GuestPreOrderPageComponent_Conditional_0_Template, 1, 4, "app-guest-preorder-submitted", 0)(1, GuestPreOrderPageComponent_Conditional_1_Template, 2, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.store.status() === "submitted" ? 0 : 1);
    }
  }, dependencies: [
    RouterLink,
    DishCardComponent,
    MainCoverImageComponent,
    GuestNameModalComponent,
    GuestCartDrawerComponent,
    GuestPreorderSubmittedComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #F7F7EC;\n}\n.reservation-strip[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 44px;\n  padding: 8px 16px;\n  background: #48AF6F;\n  color: #ffffff;\n}\n.strip-text[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  font-size: 14px;\n  line-height: 20px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.cart-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 16px;\n  width: 36px;\n  height: 36px;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cart-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.menu-container[_ngcontent-%COMP%] {\n  background: #F7F7EC;\n}\n.page-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem 2.5rem;\n  color: #454444;\n  font-size: 0.875rem;\n}\n.page-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n}\n.page-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.page-navigation__location[_ngcontent-%COMP%] {\n  color: #232323;\n  font-weight: 600;\n}\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  height: 13rem;\n  overflow: hidden;\n}\n.hero-section[_ngcontent-%COMP%]::after {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      #e4eee0 0%,\n      rgba(228, 238, 224, 0.88) 38%,\n      rgba(228, 238, 224, 0.08) 100%);\n  content: "";\n}\n.hero-text-block[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 2.5rem;\n  transform: translateY(-50%);\n}\n.hero-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n  color: #00ad0c;\n  font-size: 0.875rem;\n}\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #232323;\n  font-size: 2.25rem;\n  font-weight: 600;\n}\n.content-sections[_ngcontent-%COMP%] {\n  margin: 1.5rem 2.5rem 3rem;\n}\n.filter-sort-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.category-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  overflow-x: auto;\n  box-shadow: inset 0 -1px 0 #dadada;\n}\n.category-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 0.75rem 1.5rem;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  background: transparent;\n  color: #232323;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.category-buttons[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-bottom-color: #0F7A37;\n  color: #0F7A37;\n  font-weight: 600;\n}\n.sort-dropdown[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 1.25rem;\n}\n.sort-dropdown[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #232323;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.sort-dropdown[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 14.75rem;\n  max-width: 100%;\n  height: 3rem;\n  padding: 0 3rem 0 1.125rem;\n  border: 1px solid #dadada;\n  border-radius: 0.5rem;\n  background: #ffffff url(/assets/svg/arrow-down.svg) no-repeat right 1rem center/1.5rem 1.5rem;\n  color: #232323;\n  font: inherit;\n  font-size: 0.875rem;\n  cursor: pointer;\n  appearance: none;\n}\n.dish-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));\n  gap: 2.25rem 1.75rem;\n}\n.menu-placeholder[_ngcontent-%COMP%] {\n  padding: 3rem 1rem;\n  color: #454444;\n  text-align: center;\n}\n@media (max-width: 768px) {\n  .page-navigation[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n  .hero-section[_ngcontent-%COMP%] {\n    height: 11rem;\n  }\n  .hero-text-block[_ngcontent-%COMP%] {\n    left: 1rem;\n  }\n  .content-sections[_ngcontent-%COMP%] {\n    margin: 1rem;\n  }\n  .filter-sort-bar[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .category-buttons[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .dish-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));\n    gap: 1rem;\n  }\n}\n@media (max-width: 420px) {\n  .dish-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    justify-items: center;\n  }\n}\n.invite-retry[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 55vh;\n  align-content: center;\n  justify-items: center;\n  padding: 2rem;\n  text-align: center;\n}\n.invite-retry[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #232323;\n  font-size: 1.5rem;\n}\n.invite-retry[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 32rem;\n  color: #454444;\n}\n.invite-retry[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.7rem 1.5rem;\n  border: 0;\n  border-radius: 0.5rem;\n  background: #0F7A37;\n  color: #ffffff;\n  font: inherit;\n  cursor: pointer;\n}\n.invite-retry[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: 0.65;\n}\n/*# sourceMappingURL=guest-pre-order-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuestPreOrderPageComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-guest-pre-order-page", imports: [
      RouterLink,
      DishCardComponent,
      MainCoverImageComponent,
      GuestNameModalComponent,
      GuestCartDrawerComponent,
      GuestPreorderSubmittedComponent
    ], template: `@if (store.status() === 'submitted') {\r
<app-guest-preorder-submitted [items]="store.cartItems()" [total]="store.total()" [guestName]="store.guestName()"\r
    [invite]="store.invite()" (createNew)="store.createNewPreorder()" />\r
} @else {\r
@if (store.inviteError() === 'retryable') {\r
<section class="invite-retry" role="alert">\r
    <h1>We couldn\u2019t load the invitation</h1>\r
    <p>This may be a temporary connection or server issue. Please try again.</p>\r
    <button type="button" [disabled]="store.inviteLoading()" (click)="retryInviteLoad()">\r
        {{ store.inviteLoading() ? 'Retrying...' : 'Try again' }}\r
    </button>\r
</section>\r
} @else {\r
<!-- green info strip + cart icon -->\r
<div class="reservation-strip">\r
    <div class="strip-text">\r
        @if (store.inviteVm(); as vm) {\r
        You are making a pre-order for the reservation\r
        {{ vm.locationAddress }}, {{ vm.tableNumberText }}, {{ vm.timeText }}\r
        } @else if (store.inviteLoading()) {\r
        Loading reservation details...\r
        } @else {\r
        Reservation details are unavailable\r
        }\r
    </div>\r
\r
    <button type="button" class="cart-btn" (click)="openCart()" aria-label="Open cart">\r
        <img src="assets/svg/cart-empty.svg" alt="" />\r
    </button>\r
</div>\r
\r
<div class="menu-container">\r
    <div class="page-navigation">\r
        <a routerLink="/main">Main page</a>\r
        <span>\u203A</span>\r
        <span class="page-navigation__location">Menu</span>\r
    </div>\r
\r
    <section class="hero-section">\r
        <app-main-cover-image src="assets/img/main-page-cover.webp" alt="Fresh restaurant dishes" />\r
        <div class="hero-text-block">\r
            <p class="hero-subtitle">Green &amp; Tasty Restaurants</p>\r
            <h1 class="hero-title">Menu</h1>\r
        </div>\r
    </section>\r
\r
    <main class="content-sections">\r
        @if (store.menuLoading()) {\r
            <div class="menu-placeholder">Loading menu...</div>\r
        } @else if (store.menuError()) {\r
            <div class="menu-placeholder">{{ store.menuError() }}</div>\r
        } @else if (!store.hasMenu()) {\r
            <div class="menu-placeholder">Menu is empty</div>\r
        } @else {\r
            <section class="menu-section" aria-label="Pre-order menu">\r
                <div class="filter-sort-bar">\r
                    <nav class="category-buttons" aria-label="Dish categories">\r
                        <button type="button" [class.active]="selectedCategory() === null" (click)="selectCategory(null)">\r
                            All dishes\r
                        </button>\r
                        @for (category of categoryOptions(); track category.key) {\r
                            <button type="button" [class.active]="selectedCategory() === category.key" (click)="selectCategory(category.key)">\r
                                {{ category.label }}\r
                            </button>\r
                        }\r
                    </nav>\r
\r
                    <div class="sort-dropdown">\r
                        <label for="guestMenuSort">Sort by:</label>\r
                        <select id="guestMenuSort" [value]="selectedSort()" (change)="onSortChanged($event)">\r
                            <option value="recommended">Recommended</option>\r
                            <option value="price-asc">Price: Low to high</option>\r
                            <option value="price-desc">Price: High to low</option>\r
                        </select>\r
                    </div>\r
                </div>\r
\r
                <div class="dish-cards">\r
                    @for (dish of visibleDishes(); track dish.id) {\r
                        <app-dish-card\r
                            [dish]="dish"\r
                            [preOrderEnabled]="true"\r
                            (preOrderClicked)="addDishToCart(dish)"\r
                        />\r
                    }\r
                </div>\r
            </section>\r
        }\r
    </main>\r
    </div>\r
\r
<!-- mandatory modal: show until name is set -->\r
@if (!store.guestName()) {\r
<app-guest-name-modal [invite]="store.inviteVm()" (confirmed)="store.join($event)" (closed)="noop()" />\r
}\r
\r
<!-- cart drawer -->\r
<app-guest-cart-drawer [open]="isCartOpen()" [items]="store.cartItems()" [total]="store.total()"\r
    [busy]="store.cartBusy()" [error]="store.cartError()" (closed)="closeCart()"\r
    (goToMenu)="closeCart()" (inc)="store.inc($event)" (dec)="store.dec($event)" (remove)="store.remove($event)"\r
    (submitted)="store.submitPreorder()" />\r
}\r
}`, styles: ['/* src/app/pages/guest-pre-order-page/guest-pre-order-page.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background: #F7F7EC;\n}\n.reservation-strip {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 44px;\n  padding: 8px 16px;\n  background: #48AF6F;\n  color: #ffffff;\n}\n.strip-text {\n  flex: 1;\n  text-align: center;\n  font-size: 14px;\n  line-height: 20px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.cart-btn {\n  position: absolute;\n  right: 16px;\n  width: 36px;\n  height: 36px;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cart-btn img {\n  width: 20px;\n  height: 20px;\n}\n.menu-container {\n  background: #F7F7EC;\n}\n.page-navigation {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem 2.5rem;\n  color: #454444;\n  font-size: 0.875rem;\n}\n.page-navigation a {\n  color: inherit;\n  text-decoration: none;\n}\n.page-navigation a:hover {\n  text-decoration: underline;\n}\n.page-navigation__location {\n  color: #232323;\n  font-weight: 600;\n}\n.hero-section {\n  position: relative;\n  height: 13rem;\n  overflow: hidden;\n}\n.hero-section::after {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      #e4eee0 0%,\n      rgba(228, 238, 224, 0.88) 38%,\n      rgba(228, 238, 224, 0.08) 100%);\n  content: "";\n}\n.hero-text-block {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 2.5rem;\n  transform: translateY(-50%);\n}\n.hero-subtitle {\n  margin: 0 0 0.25rem;\n  color: #00ad0c;\n  font-size: 0.875rem;\n}\n.hero-title {\n  margin: 0;\n  color: #232323;\n  font-size: 2.25rem;\n  font-weight: 600;\n}\n.content-sections {\n  margin: 1.5rem 2.5rem 3rem;\n}\n.filter-sort-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.category-buttons {\n  display: flex;\n  align-items: center;\n  overflow-x: auto;\n  box-shadow: inset 0 -1px 0 #dadada;\n}\n.category-buttons button {\n  flex: 0 0 auto;\n  padding: 0.75rem 1.5rem;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  background: transparent;\n  color: #232323;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.category-buttons button.active {\n  border-bottom-color: #0F7A37;\n  color: #0F7A37;\n  font-weight: 600;\n}\n.sort-dropdown {\n  display: flex;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 1.25rem;\n}\n.sort-dropdown label {\n  color: #232323;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.sort-dropdown select {\n  width: 14.75rem;\n  max-width: 100%;\n  height: 3rem;\n  padding: 0 3rem 0 1.125rem;\n  border: 1px solid #dadada;\n  border-radius: 0.5rem;\n  background: #ffffff url(/assets/svg/arrow-down.svg) no-repeat right 1rem center/1.5rem 1.5rem;\n  color: #232323;\n  font: inherit;\n  font-size: 0.875rem;\n  cursor: pointer;\n  appearance: none;\n}\n.dish-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));\n  gap: 2.25rem 1.75rem;\n}\n.menu-placeholder {\n  padding: 3rem 1rem;\n  color: #454444;\n  text-align: center;\n}\n@media (max-width: 768px) {\n  .page-navigation {\n    padding: 0.75rem 1rem;\n  }\n  .hero-section {\n    height: 11rem;\n  }\n  .hero-text-block {\n    left: 1rem;\n  }\n  .content-sections {\n    margin: 1rem;\n  }\n  .filter-sort-bar {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .category-buttons {\n    width: 100%;\n  }\n  .dish-cards {\n    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));\n    gap: 1rem;\n  }\n}\n@media (max-width: 420px) {\n  .dish-cards {\n    grid-template-columns: 1fr;\n    justify-items: center;\n  }\n}\n.invite-retry {\n  display: grid;\n  min-height: 55vh;\n  align-content: center;\n  justify-items: center;\n  padding: 2rem;\n  text-align: center;\n}\n.invite-retry h1 {\n  margin: 0;\n  color: #232323;\n  font-size: 1.5rem;\n}\n.invite-retry p {\n  max-width: 32rem;\n  color: #454444;\n}\n.invite-retry button {\n  padding: 0.7rem 1.5rem;\n  border: 0;\n  border-radius: 0.5rem;\n  background: #0F7A37;\n  color: #ffffff;\n  font: inherit;\n  cursor: pointer;\n}\n.invite-retry button:disabled {\n  cursor: wait;\n  opacity: 0.65;\n}\n/*# sourceMappingURL=guest-pre-order-page.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GuestPreOrderPageComponent, { className: "GuestPreOrderPageComponent", filePath: "app/pages/guest-pre-order-page/guest-pre-order-page.component.ts", lineNumber: 32 });
})();
export {
  GuestPreOrderPageComponent
};
//# debugId=e1789c9c-186a-59be-b223-43457da42253
//# sourceMappingURL=chunk-FYBZNVRY.js.map
