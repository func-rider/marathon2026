import {
  AuthenticationService,
  ReservationService
} from "./chunk-7IOOMWOM.js";
import {
  PreOrdersService,
  SKIP_ERROR_TOAST
} from "./chunk-ISCNJM3D.js";
import {
  GuestInviteService
} from "./chunk-4VXFMGC4.js";
import {
  API_BASE_URL,
  ActivatedRoute,
  CurrencyPipe,
  DatePipe,
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
  Router,
  RouterLink
} from "./chunk-SEN52NIG.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  Output,
  ViewChild,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  forkJoin,
  inject,
  input,
  map,
  of,
  output,
  setClassMetadata,
  signal,
  switchMap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-BAQCAAG6.js";

// src/app/components/group-orders/participant-card/participant-card.component.ts
var _forTrack0 = ($index, $item) => $item.dish.id;
function ParticipantCardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h2", 6);
    \u0275\u0275text(1, " My Pre-Order ");
    \u0275\u0275domElementStart(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "button", 8);
    \u0275\u0275text(5, "Edit my Pre-Order");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", ctx_r0.title(), ")");
  }
}
function ParticipantCardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "h2", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 9);
    \u0275\u0275domListener("click", function ParticipantCardComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeRequested.emit(ctx_r0.participant()));
    });
    \u0275\u0275text(3, " Remove Guest ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title());
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r0.canRemove());
    \u0275\u0275attribute("aria-label", "Remove " + ctx_r0.participant().name + " from group");
  }
}
function ParticipantCardComponent_Conditional_6_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 14);
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("src", item_r3.dish.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function ParticipantCardComponent_Conditional_6_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r3.dish.name.charAt(0), " ");
  }
}
function ParticipantCardComponent_Conditional_6_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.note);
  }
}
function ParticipantCardComponent_Conditional_6_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Qty: ", item_r3.quantity);
  }
}
function ParticipantCardComponent_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 10)(1, "button", 11);
    \u0275\u0275domElement(2, "img", 12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 13);
    \u0275\u0275conditionalCreate(4, ParticipantCardComponent_Conditional_6_For_2_Conditional_4_Template, 1, 1, "img", 14)(5, ParticipantCardComponent_Conditional_6_For_2_Conditional_5_Template, 2, 1, "span", 15);
    \u0275\u0275domElementStart(6, "span", 16)(7, "span", 17);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(9, ParticipantCardComponent_Conditional_6_For_2_Conditional_9_Template, 2, 1, "span", 18);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "div", 19)(11, "button", 20);
    \u0275\u0275text(12, "\u2212");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "button", 21);
    \u0275\u0275text(16, "+");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(17, ParticipantCardComponent_Conditional_6_For_2_Conditional_17_Template, 2, 1, "span", 22);
    \u0275\u0275domElementStart(18, "span", 23);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "currency");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Remove " + item_r3.dish.name);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r3.dish.imageUrl ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r3.dish.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.note ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Quantity: " + item_r3.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r3.quantity);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r0.isOwner() ? 17 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(20, 8, item_r3.dish.price * item_r3.quantity, "USD", "symbol", "1.0-2"), " ");
  }
}
function ParticipantCardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "ul", 3);
    \u0275\u0275repeaterCreate(1, ParticipantCardComponent_Conditional_6_For_2_Template, 21, 13, "li", 10, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r0.title() + " dishes");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.participant().items);
  }
}
function ParticipantCardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1, "No dishes yet");
    \u0275\u0275domElementEnd();
  }
}
var ParticipantCardComponent = class _ParticipantCardComponent {
  participant = input.required(
    ...ngDevMode ? [{ debugName: "participant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canRemove = input(
    false,
    ...ngDevMode ? [{ debugName: "canRemove" }] : (
      /* istanbul ignore next */
      []
    )
  );
  removeRequested = output();
  title = computed(
    () => {
      const person = this.participant();
      return `${person.type}: ${person.name}`;
    },
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isOwner = computed(
    () => this.participant().type === "Owner",
    ...ngDevMode ? [{ debugName: "isOwner" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function ParticipantCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ParticipantCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ParticipantCardComponent, selectors: [["app-participant-card"]], inputs: { participant: [1, "participant"], canRemove: [1, "canRemove"] }, outputs: { removeRequested: "removeRequested" }, decls: 14, vars: 9, consts: [[1, "participant-card"], [1, "card-header"], ["role", "status", 1, "visually-hidden"], [1, "items"], [1, "empty-cart"], [1, "subtotal"], [1, "participant-title"], [1, "visually-hidden"], ["type", "button", "disabled", "", 1, "card-action"], ["type", "button", 1, "card-action", 3, "click", "disabled"], [1, "item"], ["type", "button", "disabled", "", 1, "remove-item"], ["src", "assets/svg/trash.svg", "alt", "", "aria-hidden", "true"], [1, "dish-info"], ["alt", "", "width", "48", "height", "48", "loading", "lazy", 1, "dish-image", 3, "src"], ["aria-hidden", "true", 1, "dish-image", "dish-initial"], [1, "dish-copy"], [1, "dish-name"], [1, "dish-note"], ["role", "group", 1, "quantity-stepper"], ["type", "button", "disabled", "", "aria-label", "Decrease quantity"], ["type", "button", "disabled", "", "aria-label", "Increase quantity"], [1, "quantity-label"], [1, "line-price"]], template: function ParticipantCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "article", 0)(1, "header", 1);
      \u0275\u0275conditionalCreate(2, ParticipantCardComponent_Conditional_2_Template, 6, 1)(3, ParticipantCardComponent_Conditional_3_Template, 4, 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "span", 2);
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(6, ParticipantCardComponent_Conditional_6_Template, 3, 1, "ul", 3)(7, ParticipantCardComponent_Conditional_7_Template, 2, 0, "p", 4);
      \u0275\u0275domElementStart(8, "p", 5)(9, "span");
      \u0275\u0275text(10, "Subtotal");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "span");
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "currency");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isOwner() ? 2 : 3);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.participant().isSubmitted ? "Submitted" : "Still choosing", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.participant().items.length > 0 ? 6 : 7);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(13, 4, ctx.participant().total, "USD", "symbol", "1.0-2"));
    }
  }, dependencies: [CurrencyPipe], styles: ['\n.participant-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background-color: #ffffff;\n  border-radius: 0.75rem;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n.participant-title[_ngcontent-%COMP%] {\n  min-width: 0;\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 500;\n  line-height: 2rem;\n}\n.card-action[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 0.25rem 0.5rem;\n  color: #232323;\n  background: transparent;\n  border: 0;\n  border-bottom: 1px solid #232323;\n  font: inherit;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  white-space: nowrap;\n}\n.card-action[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 1;\n}\n.card-action[_ngcontent-%COMP%]:not(:disabled) {\n  cursor: pointer;\n}\n.card-action[_ngcontent-%COMP%]:not(:disabled):hover {\n  color: #0B5B29;\n  border-color: #0B5B29;\n}\n.card-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #0F7A37;\n  outline-offset: 2px;\n}\n.items[_ngcontent-%COMP%] {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2rem minmax(0, 1fr) auto auto 3.75rem;\n  align-items: center;\n  gap: 1rem;\n  min-width: 0;\n  padding: 0.5rem 0.75rem;\n  background-color: #ffffff;\n  border-bottom: 1px solid #f7f7f7;\n}\n.remove-item[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  padding: 0.25rem;\n  background: transparent;\n  border: 0;\n}\n.remove-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n}\n.remove-item[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 1;\n}\n.dish-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 0;\n}\n.dish-image[_ngcontent-%COMP%] {\n  flex: 0 0 3rem;\n  width: 3rem;\n  height: 3rem;\n  object-fit: cover;\n  border-radius: 50%;\n}\n.dish-initial[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  color: #575757;\n  background-color: #e9ffea;\n  font-size: 1rem;\n}\n.dish-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  min-width: 0;\n}\n.dish-name[_ngcontent-%COMP%], \n.dish-note[_ngcontent-%COMP%] {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.dish-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.5rem;\n}\n.dish-note[_ngcontent-%COMP%] {\n  color: #575757;\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.quantity-stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  height: 2.75rem;\n  padding: 0.25rem;\n  border-radius: 0.5rem;\n}\n.quantity-stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-width: 2.25rem;\n  height: 2.25rem;\n  padding: 0 0.75rem;\n  color: #898989;\n  background: #ffffff;\n  border: 1.4px solid #dadada;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-size: 0.875rem;\n}\n.quantity-stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  color: #0F7A37;\n  border-color: #0F7A37;\n}\n.quantity-stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 1;\n}\n.quantity-stepper[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 1rem;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.line-price[_ngcontent-%COMP%] {\n  width: 3.75rem;\n  text-align: right;\n  font-size: 0.875rem;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.quantity-label[_ngcontent-%COMP%] {\n  color: #575757;\n  font-size: 0.75rem;\n  white-space: nowrap;\n}\n.empty-cart[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  color: #575757;\n}\n.subtotal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 0.75rem 0 0;\n  padding: 0.5rem 0.75rem 0;\n  border-top: 1px solid #f7f7f7;\n  font-size: 1.125rem;\n  font-weight: 500;\n  line-height: 2rem;\n}\n.visually-hidden[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  clip-path: inset(50%);\n}\n@media (max-width: 520px) {\n  .card-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .participant-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .card-action[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .item[_ngcontent-%COMP%] {\n    grid-template-columns: 1.5rem minmax(0, 1fr) 3.25rem;\n    grid-template-areas: "remove dish price" "remove quantity price";\n    gap: 0.5rem;\n    padding: 0.5rem 0;\n  }\n  .remove-item[_ngcontent-%COMP%] {\n    grid-area: remove;\n    width: 1.5rem;\n    height: 1.5rem;\n    padding: 0;\n  }\n  .remove-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transform: scale(0.75);\n  }\n  .dish-info[_ngcontent-%COMP%] {\n    grid-area: dish;\n    gap: 0.5rem;\n  }\n  .dish-image[_ngcontent-%COMP%] {\n    flex-basis: 2.5rem;\n    width: 2.5rem;\n    height: 2.5rem;\n  }\n  .quantity-stepper[_ngcontent-%COMP%] {\n    grid-area: quantity;\n    width: max-content;\n    gap: 0.25rem;\n    height: 2.25rem;\n    padding: 0;\n  }\n  .quantity-stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 1.75rem;\n    height: 1.75rem;\n    padding: 0 0.375rem;\n  }\n  .line-price[_ngcontent-%COMP%] {\n    grid-area: price;\n    width: 3.25rem;\n  }\n  .quantity-label[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .subtotal[_ngcontent-%COMP%] {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n/*# sourceMappingURL=participant-card.component.css.map */'], changeDetection: 1 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParticipantCardComponent, [{
    type: Component,
    args: [{ selector: "app-participant-card", standalone: true, imports: [CurrencyPipe], changeDetection: ChangeDetectionStrategy.Eager, template: `<article class="participant-card">
  <header class="card-header">
    @if (isOwner()) {
      <h2 class="participant-title">
        My Pre-Order <span class="visually-hidden">({{ title() }})</span>
      </h2>
      <button class="card-action" type="button" disabled>Edit my Pre-Order</button>
    } @else {
      <h2 class="participant-title">{{ title() }}</h2>
      <button
        class="card-action"
        type="button"
        [disabled]="!canRemove()"
        [attr.aria-label]="'Remove ' + participant().name + ' from group'"
        (click)="removeRequested.emit(participant())"
      >
        Remove Guest
      </button>
    }
  </header>

  <span class="visually-hidden" role="status">
    {{ participant().isSubmitted ? 'Submitted' : 'Still choosing' }}
  </span>

  @if (participant().items.length > 0) {
    <ul class="items" [attr.aria-label]="title() + ' dishes'">
      @for (item of participant().items; track item.dish.id) {
        <li class="item">
          <button
            class="remove-item"
            type="button"
            disabled
            [attr.aria-label]="'Remove ' + item.dish.name"
          >
            <img src="assets/svg/trash.svg" alt="" aria-hidden="true" />
          </button>

          <div class="dish-info">
            @if (item.dish.imageUrl) {
              <img
                class="dish-image"
                [src]="item.dish.imageUrl"
                alt=""
                width="48"
                height="48"
                loading="lazy"
              />
            } @else {
              <span class="dish-image dish-initial" aria-hidden="true">
                {{ item.dish.name.charAt(0) }}
              </span>
            }

            <span class="dish-copy">
              <span class="dish-name">{{ item.dish.name }}</span>
              @if (item.note) {
                <span class="dish-note">{{ item.note }}</span>
              }
            </span>
          </div>

          <div
            class="quantity-stepper"
            role="group"
            [attr.aria-label]="'Quantity: ' + item.quantity"
          >
            <button type="button" disabled aria-label="Decrease quantity">\u2212</button>
            <span>{{ item.quantity }}</span>
            <button type="button" disabled aria-label="Increase quantity">+</button>
          </div>

          @if (!isOwner()) {
            <span class="quantity-label">Qty: {{ item.quantity }}</span>
          }

          <span class="line-price">
            {{ item.dish.price * item.quantity | currency: 'USD' : 'symbol' : '1.0-2' }}
          </span>
        </li>
      }
    </ul>
  } @else {
    <p class="empty-cart">No dishes yet</p>
  }

  <p class="subtotal">
    <span>Subtotal</span>
    <span>{{ participant().total | currency: 'USD' : 'symbol' : '1.0-2' }}</span>
  </p>
</article>
`, styles: ['/* src/app/components/group-orders/participant-card/participant-card.component.scss */\n.participant-card {\n  padding: 1rem;\n  background-color: #ffffff;\n  border-radius: 0.75rem;\n}\n.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n.participant-title {\n  min-width: 0;\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 500;\n  line-height: 2rem;\n}\n.card-action {\n  flex: 0 0 auto;\n  padding: 0.25rem 0.5rem;\n  color: #232323;\n  background: transparent;\n  border: 0;\n  border-bottom: 1px solid #232323;\n  font: inherit;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  white-space: nowrap;\n}\n.card-action:disabled {\n  cursor: default;\n  opacity: 1;\n}\n.card-action:not(:disabled) {\n  cursor: pointer;\n}\n.card-action:not(:disabled):hover {\n  color: #0B5B29;\n  border-color: #0B5B29;\n}\n.card-action:focus-visible {\n  outline: 3px solid #0F7A37;\n  outline-offset: 2px;\n}\n.items {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.item {\n  display: grid;\n  grid-template-columns: 2rem minmax(0, 1fr) auto auto 3.75rem;\n  align-items: center;\n  gap: 1rem;\n  min-width: 0;\n  padding: 0.5rem 0.75rem;\n  background-color: #ffffff;\n  border-bottom: 1px solid #f7f7f7;\n}\n.remove-item {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  padding: 0.25rem;\n  background: transparent;\n  border: 0;\n}\n.remove-item img {\n  display: block;\n}\n.remove-item:disabled {\n  cursor: default;\n  opacity: 1;\n}\n.dish-info {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 0;\n}\n.dish-image {\n  flex: 0 0 3rem;\n  width: 3rem;\n  height: 3rem;\n  object-fit: cover;\n  border-radius: 50%;\n}\n.dish-initial {\n  display: grid;\n  place-items: center;\n  color: #575757;\n  background-color: #e9ffea;\n  font-size: 1rem;\n}\n.dish-copy {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  min-width: 0;\n}\n.dish-name,\n.dish-note {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.dish-name {\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.5rem;\n}\n.dish-note {\n  color: #575757;\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.quantity-stepper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  height: 2.75rem;\n  padding: 0.25rem;\n  border-radius: 0.5rem;\n}\n.quantity-stepper button {\n  display: grid;\n  place-items: center;\n  min-width: 2.25rem;\n  height: 2.25rem;\n  padding: 0 0.75rem;\n  color: #898989;\n  background: #ffffff;\n  border: 1.4px solid #dadada;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-size: 0.875rem;\n}\n.quantity-stepper button:last-child {\n  color: #0F7A37;\n  border-color: #0F7A37;\n}\n.quantity-stepper button:disabled {\n  cursor: default;\n  opacity: 1;\n}\n.quantity-stepper span {\n  width: 1rem;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.line-price {\n  width: 3.75rem;\n  text-align: right;\n  font-size: 0.875rem;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.quantity-label {\n  color: #575757;\n  font-size: 0.75rem;\n  white-space: nowrap;\n}\n.empty-cart {\n  margin: 0.5rem 0;\n  color: #575757;\n}\n.subtotal {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 0.75rem 0 0;\n  padding: 0.5rem 0.75rem 0;\n  border-top: 1px solid #f7f7f7;\n  font-size: 1.125rem;\n  font-weight: 500;\n  line-height: 2rem;\n}\n.visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  clip-path: inset(50%);\n}\n@media (max-width: 520px) {\n  .card-header {\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .participant-title {\n    font-size: 1rem;\n  }\n  .card-action {\n    font-size: 0.75rem;\n  }\n  .item {\n    grid-template-columns: 1.5rem minmax(0, 1fr) 3.25rem;\n    grid-template-areas: "remove dish price" "remove quantity price";\n    gap: 0.5rem;\n    padding: 0.5rem 0;\n  }\n  .remove-item {\n    grid-area: remove;\n    width: 1.5rem;\n    height: 1.5rem;\n    padding: 0;\n  }\n  .remove-item img {\n    transform: scale(0.75);\n  }\n  .dish-info {\n    grid-area: dish;\n    gap: 0.5rem;\n  }\n  .dish-image {\n    flex-basis: 2.5rem;\n    width: 2.5rem;\n    height: 2.5rem;\n  }\n  .quantity-stepper {\n    grid-area: quantity;\n    width: max-content;\n    gap: 0.25rem;\n    height: 2.25rem;\n    padding: 0;\n  }\n  .quantity-stepper button {\n    min-width: 1.75rem;\n    height: 1.75rem;\n    padding: 0 0.375rem;\n  }\n  .line-price {\n    grid-area: price;\n    width: 3.25rem;\n  }\n  .quantity-label {\n    display: none;\n  }\n  .subtotal {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n/*# sourceMappingURL=participant-card.component.css.map */\n'] }]
  }], null, { participant: [{ type: Input, args: [{ isSignal: true, alias: "participant", required: true }] }], canRemove: [{ type: Input, args: [{ isSignal: true, alias: "canRemove", required: false }] }], removeRequested: [{ type: Output, args: ["removeRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ParticipantCardComponent, { className: "ParticipantCardComponent", filePath: "app/components/group-orders/participant-card/participant-card.component.ts", lineNumber: 14 });
})();

// src/app/services/group-orders/group-orders.service.ts
var GroupOrdersService = class _GroupOrdersService {
  baseUrl = inject(API_BASE_URL);
  http = inject(HttpClient);
  authService = inject(AuthenticationService);
  reservationService = inject(ReservationService);
  preOrdersService = inject(PreOrdersService);
  guestInviteService = inject(GuestInviteService);
  getOwnerGroupOrder$(reservationId, groupReservationId) {
    return forkJoin({
      reservation: this.reservationService.getReservationById(reservationId),
      ownerSession: this.getOwnerGuestSessionId$(reservationId),
      ownerOrder: this.getOwnerOrder$(reservationId)
    }).pipe(switchMap(({ reservation, ownerSession, ownerOrder }) => {
      const ownerSessionId = ownerSession.guestSessionId;
      if (groupReservationId) {
        return this.getGroupOrderDetails$(reservation, ownerSessionId, ownerOrder, groupReservationId, {
          GroupReservationId: groupReservationId,
          LocationAddress: reservation.locationAddress,
          StartTime: String(reservation.startTime),
          EndTime: String(reservation.endTime)
        });
      }
      return this.guestInviteService.getInviteToken$(reservationId).pipe(switchMap(({ token }) => this.guestInviteService.getInvite$(token)), switchMap((invite) => this.getGroupOrderDetails$(reservation, ownerSessionId, ownerOrder, invite.GroupReservationId, invite)));
    }));
  }
  submitGroupOrder$(reservationId, groupReservationId) {
    const url = `${this.baseUrl}/group-reservations/${encodeURIComponent(groupReservationId)}/submit`;
    const context = new HttpContext().set(SKIP_ERROR_TOAST, true);
    return this.http.post(url, { reservationId }, { context }).pipe(switchMap((submittedDishes) => this.preOrdersService.getByReservationId(reservationId, true).pipe(map((finalOrder) => ({ submittedDishes, finalOrder })), catchError(() => of({ submittedDishes, finalOrder: null })))));
  }
  deleteGuestSession$(groupReservationId, guestSessionId) {
    const idToken = this.authService.getTokens()?.idToken;
    if (!idToken) {
      return throwError(() => new Error("Please sign in as the reservation owner."));
    }
    const url = `${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/sessions/${encodeURIComponent(guestSessionId)}`;
    return this.http.delete(url, {
      headers: new HttpHeaders({ Authorization: `Bearer ${idToken}` }),
      context: new HttpContext().set(SKIP_ERROR_TOAST, true)
    });
  }
  getOwnerGuestSessionId$(reservationId) {
    const url = `${this.baseUrl}/reservations/${encodeURIComponent(reservationId)}/guest-session-id`;
    return this.http.get(url, {
      context: new HttpContext().set(SKIP_ERROR_TOAST, true)
    });
  }
  getOwnerOrder$(reservationId) {
    return this.preOrdersService.getByReservationId(reservationId, true).pipe(catchError((error) => error.status === 404 ? of(null) : throwError(() => error)));
  }
  getGroupSessions$(groupReservationId) {
    const idToken = this.authService.getTokens()?.idToken;
    if (!idToken) {
      return throwError(() => new Error("Please sign in as the reservation owner."));
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${idToken}` });
    return this.http.get(`${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/sessions`, { headers });
  }
  getGroupStatus$(groupReservationId) {
    return this.http.get(`${this.baseUrl}/guest/groups/${encodeURIComponent(groupReservationId)}/status`);
  }
  getGroupOrderDetails$(reservation, ownerSessionId, ownerOrder, groupReservationId, invite) {
    return forkJoin({
      guestSessions: this.getGroupSessions$(groupReservationId),
      status: this.getGroupStatus$(groupReservationId)
    }).pipe(map(({ guestSessions, status }) => this.toGroupOrderPreview(reservation, invite, ownerSessionId, ownerOrder, guestSessions, status)));
  }
  toGroupOrderPreview(reservation, invite, ownerSessionId, ownerOrder, guestSessions, status) {
    const ownerItems = ownerOrder?.orderItems ?? [];
    const owner = {
      id: ownerSessionId,
      type: "Owner",
      name: this.authService.getUser()?.firstName || "You",
      items: ownerItems.map((item) => ({
        dish: {
          id: item.dish.id,
          name: item.dish.name,
          price: item.dish.price,
          imageUrl: item.dish.imageUrl
        },
        quantity: item.quantity
      })),
      total: ownerItems.reduce((total, item) => total + item.dish.price * item.quantity, 0),
      isSubmitted: reservation.hasSubmittedPreOrder ?? false
    };
    const participants = [owner, ...guestSessions.participants];
    const ownerTotal = ownerItems.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    return {
      invite: {
        GroupReservationId: invite.GroupReservationId,
        LocationAddress: invite.LocationAddress,
        StartTime: invite.StartTime,
        EndTime: invite.EndTime,
        MaxGuestCount: status.maxCapacity
      },
      sessions: {
        participants,
        total: status.status === "Submitted" ? ownerTotal : ownerTotal + guestSessions.total
      },
      status: status.status,
      currentParticipants: status.currentParticipants,
      hasOwnerOrder: ownerOrder !== null
    };
  }
  static \u0275fac = function GroupOrdersService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupOrdersService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GroupOrdersService, factory: _GroupOrdersService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupOrdersService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/pages/group-order-page/group-order-page.component.ts
var _c0 = ["submitDialog"];
var _c1 = ["removeDialog"];
var _forTrack02 = ($index, $item) => $item.id;
function GroupOrderPageComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.orderStatusLabel());
  }
}
function GroupOrderPageComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 11)(1, "div", 16)(2, "dt", 17);
    \u0275\u0275text(3, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dd")(5, "span", 18);
    \u0275\u0275element(6, "img", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 16)(9, "dt", 17);
    \u0275\u0275text(10, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dd")(12, "span", 18);
    \u0275\u0275element(13, "img", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 16)(17, "dt", 17);
    \u0275\u0275text(18, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd")(20, "span", 18);
    \u0275\u0275element(21, "img", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "date");
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 16)(26, "dt", 17);
    \u0275\u0275text(27, "Guests");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "dd")(29, "span", 18);
    \u0275\u0275element(30, "img", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r2 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", data_r2.invite.LocationAddress, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(15, 5, data_r2.invite.StartTime, "mediumDate"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(23, 8, data_r2.invite.StartTime, "HH:mm"), " - ", \u0275\u0275pipeBind2(24, 11, data_r2.invite.EndTime, "HH:mm"), " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r0.guestCountLabel(), " ");
  }
}
function GroupOrderPageComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12);
    \u0275\u0275text(1, " Loading group pre-order... ");
    \u0275\u0275elementEnd();
  }
}
function GroupOrderPageComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 13)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 23);
    \u0275\u0275listener("click", function GroupOrderPageComponent_Conditional_12_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadGroupOrder());
    });
    \u0275\u0275text(4, "Try again");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.loadError());
  }
}
function GroupOrderPageComponent_Conditional_13_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 26)(1, "app-participant-card", 31);
    \u0275\u0275listener("removeRequested", function GroupOrderPageComponent_Conditional_13_For_3_Template_app_participant_card_removeRequested_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openRemoveConfirmation($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const participant_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("participant", participant_r5)("canRemove", participant_r5.type === "Guest" && !ctx_r0.isRemoving());
  }
}
function GroupOrderPageComponent_Conditional_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.removeSuccess());
  }
}
function GroupOrderPageComponent_Conditional_13_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, "Group pre-order sent to the restaurant.");
    \u0275\u0275elementEnd();
  }
}
function GroupOrderPageComponent_Conditional_13_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function GroupOrderPageComponent_Conditional_13_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, GroupOrderPageComponent_Conditional_13_Conditional_13_Conditional_0_Template, 2, 1, "p", 32);
    \u0275\u0275elementStart(1, "button", 33);
    \u0275\u0275listener("click", function GroupOrderPageComponent_Conditional_13_Conditional_13_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openSubmitConfirmation());
    });
    \u0275\u0275text(2, " Submit Pre-Order ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r0.submitReadinessMessage()) ? 0 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.canSubmit());
  }
}
function GroupOrderPageComponent_Conditional_13_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, "This group pre-order has been submitted.");
    \u0275\u0275elementEnd();
  }
}
function GroupOrderPageComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 24)(1, "ul", 25);
    \u0275\u0275repeaterCreate(2, GroupOrderPageComponent_Conditional_13_For_3_Template, 2, 2, "li", 26, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, GroupOrderPageComponent_Conditional_13_Conditional_4_Template, 2, 1, "p", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "footer", 28)(6, "p", 29)(7, "span");
    \u0275\u0275text(8, "Grand Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, GroupOrderPageComponent_Conditional_13_Conditional_12_Template, 2, 0, "p", 30)(13, GroupOrderPageComponent_Conditional_13_Conditional_13_Template, 3, 2)(14, GroupOrderPageComponent_Conditional_13_Conditional_14_Template, 2, 0, "p", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r7 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.participants());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.removeSuccess() ? 4 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(11, 3, data_r7.sessions.total, "USD", "symbol", "1.0-2"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.submitSuccess() ? 12 : data_r7.status === "Open" ? 13 : 14);
  }
}
function GroupOrderPageComponent_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.submitError());
  }
}
function GroupOrderPageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dialog", 34, 0);
    \u0275\u0275listener("cancel", function GroupOrderPageComponent_Conditional_14_Template_dialog_cancel_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.handleSubmitDialogCancel($event));
    });
    \u0275\u0275elementStart(2, "h2", 35);
    \u0275\u0275text(3, "Submit group pre-order?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, GroupOrderPageComponent_Conditional_14_Conditional_6_Template, 2, 1, "p", 37);
    \u0275\u0275elementStart(7, "div", 38)(8, "button", 39);
    \u0275\u0275listener("click", function GroupOrderPageComponent_Conditional_14_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelSubmitConfirmation());
    });
    \u0275\u0275text(9, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 33);
    \u0275\u0275listener("click", function GroupOrderPageComponent_Conditional_14_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmGroupOrderSubmission());
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" This sends ", ctx_r0.submittedGuestCount(), " submitted guest ", ctx_r0.submittedGuestCount() === 1 ? "order" : "orders", " to the restaurant. Unsubmitted guest carts will not be included, and the reservation order will be replaced with the submitted guest dishes. ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitError() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSubmitting() ? "Sending..." : "Confirm & Send", " ");
  }
}
function GroupOrderPageComponent_Conditional_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " The order already sent to the restaurant will remain unchanged. ");
  }
}
function GroupOrderPageComponent_Conditional_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.removeError());
  }
}
function GroupOrderPageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dialog", 40, 1);
    \u0275\u0275listener("cancel", function GroupOrderPageComponent_Conditional_15_Template_dialog_cancel_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.handleRemoveDialogCancel($event));
    });
    \u0275\u0275elementStart(2, "h2", 41);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 42);
    \u0275\u0275text(5);
    \u0275\u0275conditionalCreate(6, GroupOrderPageComponent_Conditional_15_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, GroupOrderPageComponent_Conditional_15_Conditional_7_Template, 2, 1, "p", 37);
    \u0275\u0275elementStart(8, "div", 38)(9, "button", 39);
    \u0275\u0275listener("click", function GroupOrderPageComponent_Conditional_15_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelRemoveConfirmation());
    });
    \u0275\u0275text(10, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 33);
    \u0275\u0275listener("click", function GroupOrderPageComponent_Conditional_15_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmGuestRemoval());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const guest_r10 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Remove ", guest_r10.name, " from the group?");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" This permanently removes ", guest_r10.name, " and their guest session from this group. ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.groupOrder()?.status === "Submitted" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.removeError() ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isRemoving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isRemoving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isRemoving() ? "Removing..." : "Remove Guest", " ");
  }
}
var GroupOrderPageComponent = class _GroupOrderPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  groupOrdersService = inject(GroupOrdersService);
  submitDialogElement = null;
  removeDialogElement = null;
  set submitDialog(ref) {
    this.submitDialogElement = ref?.nativeElement ?? null;
    if (this.submitDialogElement && this.isSubmitConfirmationOpen() && !this.submitDialogElement.open) {
      this.submitDialogElement.showModal();
    }
  }
  set removeDialog(ref) {
    this.removeDialogElement = ref?.nativeElement ?? null;
    if (this.removeDialogElement && this.pendingRemoval() && !this.removeDialogElement.open) {
      this.removeDialogElement.showModal();
    }
  }
  groupOrder = signal(
    null,
    ...ngDevMode ? [{ debugName: "groupOrder" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoading = signal(
    true,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadError = signal(
    null,
    ...ngDevMode ? [{ debugName: "loadError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmitConfirmationOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitConfirmationOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submitError = signal(
    null,
    ...ngDevMode ? [{ debugName: "submitError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submitSuccess = signal(
    false,
    ...ngDevMode ? [{ debugName: "submitSuccess" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingRemoval = signal(
    null,
    ...ngDevMode ? [{ debugName: "pendingRemoval" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isRemoving = signal(
    false,
    ...ngDevMode ? [{ debugName: "isRemoving" }] : (
      /* istanbul ignore next */
      []
    )
  );
  removeError = signal(
    null,
    ...ngDevMode ? [{ debugName: "removeError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  removeSuccess = signal(
    null,
    ...ngDevMode ? [{ debugName: "removeSuccess" }] : (
      /* istanbul ignore next */
      []
    )
  );
  participants = computed(
    () => this.groupOrder()?.sessions.participants ?? [],
    ...ngDevMode ? [{ debugName: "participants" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submittedGuestCount = computed(
    () => this.participants().filter((participant) => participant.type === "Guest" && participant.isSubmitted && participant.items.length > 0).length,
    ...ngDevMode ? [{ debugName: "submittedGuestCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submitReadinessMessage = computed(
    () => {
      const groupOrder = this.groupOrder();
      if (!groupOrder || groupOrder.status !== "Open") {
        return null;
      }
      if (!groupOrder.hasOwnerOrder) {
        return "An owner pre-order is required before you can submit the group order.";
      }
      if (this.submittedGuestCount() === 0) {
        return "At least one guest must submit dishes before you can send the group order.";
      }
      return null;
    },
    ...ngDevMode ? [{ debugName: "submitReadinessMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canSubmit = computed(
    () => this.groupOrder()?.status === "Open" && !this.submitReadinessMessage() && !this.isSubmitting(),
    ...ngDevMode ? [{ debugName: "canSubmit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guestCountLabel = computed(
    () => {
      const groupOrder = this.groupOrder();
      return groupOrder ? `${groupOrder.currentParticipants} of ${groupOrder.invite.MaxGuestCount} guests` : "";
    },
    ...ngDevMode ? [{ debugName: "guestCountLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  orderStatusLabel = computed(
    () => {
      switch (this.groupOrder()?.status) {
        case "Submitted":
          return "Sent to Restaurant";
        case "Closed":
          return "Closed";
        default:
          return "Collecting pre-orders";
      }
    },
    ...ngDevMode ? [{ debugName: "orderStatusLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnInit() {
    this.loadGroupOrder();
  }
  loadGroupOrder() {
    const reservationId = this.route.snapshot.paramMap.get("reservationId");
    const groupReservationId = this.route.snapshot.queryParamMap.get("groupReservationId") ?? void 0;
    if (!reservationId) {
      this.isLoading.set(false);
      this.loadError.set("Reservation ID is missing from the page URL.");
      return;
    }
    this.isLoading.set(true);
    this.loadError.set(null);
    this.groupOrdersService.getOwnerGroupOrder$(reservationId, groupReservationId).subscribe({
      next: (groupOrder) => {
        this.groupOrder.set(groupOrder);
        if (!groupReservationId) {
          void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { groupReservationId: groupOrder.invite.GroupReservationId },
            queryParamsHandling: "merge",
            replaceUrl: true
          });
        }
      },
      error: (error) => {
        this.loadError.set(this.toLoadErrorMessage(error));
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false)
    });
  }
  openSubmitConfirmation() {
    if (!this.canSubmit()) {
      return;
    }
    this.submitError.set(null);
    this.isSubmitConfirmationOpen.set(true);
  }
  cancelSubmitConfirmation() {
    if (!this.isSubmitting()) {
      this.closeSubmitConfirmation();
      this.submitError.set(null);
    }
  }
  handleSubmitDialogCancel(event) {
    event.preventDefault();
    this.cancelSubmitConfirmation();
  }
  openRemoveConfirmation(participant) {
    if (participant.type !== "Guest" || this.isRemoving()) {
      return;
    }
    this.removeError.set(null);
    this.removeSuccess.set(null);
    this.pendingRemoval.set(participant);
  }
  cancelRemoveConfirmation() {
    if (this.isRemoving()) {
      return;
    }
    this.closeRemoveConfirmation();
    this.removeError.set(null);
  }
  handleRemoveDialogCancel(event) {
    event.preventDefault();
    this.cancelRemoveConfirmation();
  }
  confirmGuestRemoval() {
    const participant = this.pendingRemoval();
    const groupOrder = this.groupOrder();
    if (!participant || !groupOrder || participant.type !== "Guest" || this.isRemoving()) {
      return;
    }
    this.isRemoving.set(true);
    this.removeError.set(null);
    this.groupOrdersService.deleteGuestSession$(groupOrder.invite.GroupReservationId, participant.id).subscribe({
      next: (snapshot) => {
        this.groupOrder.set(this.withRemovedGuest(groupOrder, snapshot));
        this.removeSuccess.set(`${participant.name} was removed from the group.`);
        this.closeRemoveConfirmation();
      },
      error: (error) => {
        this.removeError.set(this.toRemoveErrorMessage(error));
        this.isRemoving.set(false);
      },
      complete: () => this.isRemoving.set(false)
    });
  }
  confirmGroupOrderSubmission() {
    const groupOrder = this.groupOrder();
    const reservationId = this.route.snapshot.paramMap.get("reservationId");
    if (!groupOrder || !reservationId || !this.canSubmit()) {
      return;
    }
    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.groupOrdersService.submitGroupOrder$(reservationId, groupOrder.invite.GroupReservationId).subscribe({
      next: (result) => {
        this.groupOrder.set(this.withSubmittedOrder(groupOrder, result));
        this.submitSuccess.set(true);
        this.closeSubmitConfirmation();
      },
      error: (error) => {
        this.submitError.set(this.toSubmitErrorMessage(error));
        this.isSubmitting.set(false);
      },
      complete: () => this.isSubmitting.set(false)
    });
  }
  closeSubmitConfirmation() {
    if (this.submitDialogElement?.open) {
      this.submitDialogElement.close();
    }
    this.isSubmitConfirmationOpen.set(false);
  }
  closeRemoveConfirmation() {
    if (this.removeDialogElement?.open) {
      this.removeDialogElement.close();
    }
    this.pendingRemoval.set(null);
  }
  withRemovedGuest(groupOrder, snapshot) {
    const owner = groupOrder.sessions.participants.find((participant) => participant.type === "Owner");
    const ownerTotal = owner?.total ?? 0;
    const participants = [
      ...owner ? [owner] : [],
      ...snapshot.participants.filter((participant) => participant.type === "Guest")
    ];
    return __spreadProps(__spreadValues({}, groupOrder), {
      sessions: {
        participants,
        total: groupOrder.status === "Submitted" ? ownerTotal : ownerTotal + snapshot.total
      },
      currentParticipants: Math.max(1, groupOrder.currentParticipants - 1)
    });
  }
  withSubmittedOrder(groupOrder, result) {
    const dishById = new Map(groupOrder.sessions.participants.flatMap((participant) => participant.items.map((item) => [item.dish.id, item.dish])));
    const consolidatedItems = result.finalOrder ? result.finalOrder.orderItems.map(({ dish, quantity }) => ({ dish, quantity })) : result.submittedDishes.flatMap(({ dishId, quantity }) => {
      const dish = dishById.get(dishId);
      return dish ? [{ dish, quantity }] : [];
    });
    const consolidatedTotal = consolidatedItems.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    const participants = groupOrder.sessions.participants.map((participant) => participant.type === "Owner" ? __spreadProps(__spreadValues({}, participant), {
      items: consolidatedItems,
      total: consolidatedTotal,
      isSubmitted: true
    }) : participant);
    return __spreadProps(__spreadValues({}, groupOrder), {
      status: "Submitted",
      sessions: { participants, total: consolidatedTotal }
    });
  }
  toSubmitErrorMessage(error) {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error;
      if (error.status === 400) {
        if (apiError?.errorCode === "GroupReservationSubmitted") {
          return "This group pre-order has already been submitted.";
        }
        if (apiError?.errorCode === "GroupReservationExpired") {
          return "This group reservation has expired and cannot be submitted.";
        }
        return apiError?.message ?? "No submitted guest dishes are ready to send, or this reservation has no owner pre-order.";
      }
      if (error.status === 401) {
        return "Your session expired. Sign in again to submit this group pre-order.";
      }
      if (error.status === 403) {
        return "Only the reservation owner can submit this group pre-order.";
      }
      if (error.status === 404) {
        return apiError?.error ?? "The reservation or group pre-order could not be found.";
      }
      if (error.status === 409) {
        return "This group pre-order has already been submitted.";
      }
    }
    return "Unable to submit this group pre-order. Please try again.";
  }
  toRemoveErrorMessage(error) {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error;
      if (error.status === 400) {
        return apiError?.message ?? "This guest session does not belong to this group.";
      }
      if (error.status === 401) {
        return "Your session expired. Sign in again to remove this guest.";
      }
      if (error.status === 403) {
        return "Only the reservation owner can remove a guest from this group.";
      }
      if (error.status === 404) {
        return apiError?.error ?? "This guest session could not be found. Reload the group and try again.";
      }
    }
    return "Unable to remove this guest. Please try again.";
  }
  toLoadErrorMessage(error) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return "Please sign in as the reservation owner to view this group pre-order.";
    }
    if (error instanceof HttpErrorResponse && error.status === 403) {
      return "Only the reservation owner can view this group pre-order.";
    }
    return "Unable to load this group pre-order. Please try again.";
  }
  static \u0275fac = function GroupOrderPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupOrderPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupOrderPageComponent, selectors: [["app-group-order-page"]], viewQuery: function GroupOrderPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.submitDialog = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.removeDialog = _t.first);
    }
  }, decls: 16, vars: 5, consts: [["submitDialog", ""], ["removeDialog", ""], [1, "group-order-backdrop"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "group-order-title", 1, "group-order-panel"], [1, "panel-header"], [1, "title-row"], [1, "title-with-status"], ["id", "group-order-title"], [1, "order-status"], ["routerLink", "/reservations", "aria-label", "Close group pre-order", 1, "close-link"], ["src", "assets/svg/close.svg", "alt", "", "aria-hidden", "true"], [1, "reservation-details"], ["role", "status", "aria-live", "polite", 1, "load-state"], ["role", "alert", 1, "load-state", "load-state--error"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "submit-confirmation-title", "aria-describedby", "submit-confirmation-description", 1, "submit-confirmation"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "remove-confirmation-title", "aria-describedby", "remove-confirmation-description", 1, "submit-confirmation"], [1, "detail-item"], [1, "visually-hidden"], ["aria-hidden", "true", 1, "detail-icon"], ["src", "assets/svg/location-green.svg", "alt", "", 1, "detail-icon--large"], ["src", "assets/svg/calendar-green.svg", "alt", ""], ["src", "assets/svg/clock-green.svg", "alt", ""], ["src", "assets/svg/people-green.svg", "alt", "", 1, "detail-icon--large"], ["type", "button", 1, "retry-button", 3, "click"], ["aria-label", "Participants", 1, "participants-section"], [1, "participants"], [1, "participant-item"], ["role", "status", "aria-live", "polite", 1, "remove-success"], [1, "panel-footer"], [1, "grand-total"], ["role", "status", 1, "submit-success"], [3, "removeRequested", "participant", "canRemove"], [1, "submit-hint"], ["type", "button", 1, "submit-button", 3, "click", "disabled"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "submit-confirmation-title", "aria-describedby", "submit-confirmation-description", 1, "submit-confirmation", 3, "cancel"], ["id", "submit-confirmation-title"], ["id", "submit-confirmation-description"], ["role", "alert", 1, "submit-error"], [1, "confirmation-actions"], ["type", "button", "autofocus", "", 1, "retry-button", 3, "click", "disabled"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "remove-confirmation-title", "aria-describedby", "remove-confirmation-description", 1, "submit-confirmation", 3, "cancel"], ["id", "remove-confirmation-title"], ["id", "remove-confirmation-description"]], template: function GroupOrderPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 2)(1, "section", 3)(2, "header", 4)(3, "div", 5)(4, "div", 6)(5, "h1", 7);
      \u0275\u0275text(6, "Group Pre-Order");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, GroupOrderPageComponent_Conditional_7_Template, 2, 1, "span", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 9);
      \u0275\u0275element(9, "img", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, GroupOrderPageComponent_Conditional_10_Template, 32, 14, "dl", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, GroupOrderPageComponent_Conditional_11_Template, 2, 0, "section", 12)(12, GroupOrderPageComponent_Conditional_12_Template, 5, 1, "section", 13)(13, GroupOrderPageComponent_Conditional_13_Template, 15, 8);
      \u0275\u0275conditionalCreate(14, GroupOrderPageComponent_Conditional_14_Template, 12, 6, "dialog", 14);
      \u0275\u0275conditionalCreate(15, GroupOrderPageComponent_Conditional_15_Template, 13, 7, "dialog", 15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_4_0;
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.groupOrder() ? 7 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_1_0 = ctx.groupOrder()) ? 10 : -1, tmp_1_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 11 : ctx.loadError() ? 12 : (tmp_2_0 = ctx.groupOrder()) ? 13 : -1, tmp_2_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isSubmitConfirmationOpen() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_4_0 = ctx.pendingRemoval()) ? 15 : -1, tmp_4_0);
    }
  }, dependencies: [ParticipantCardComponent, RouterLink, CurrencyPipe, DatePipe], styles: ["\n.group-order-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1100;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  box-sizing: border-box;\n  overflow-y: auto;\n  padding: 1.5rem;\n  background-color: rgba(35, 35, 35, 0.65);\n}\n.group-order-panel[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(100%, 52.2rem);\n  height: min(47.5rem, 100vh - 3rem);\n  height: min(47.5rem, 100dvh - 3rem);\n  overflow: hidden;\n  background-color: #f7f7f7;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 0.3125rem rgba(218, 218, 218, 0.7);\n}\n.panel-header[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 2.5rem 2.5rem 0;\n}\n.title-row[_ngcontent-%COMP%], \n.title-with-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.title-row[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: 1rem;\n}\n.title-with-status[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.title-row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.625rem;\n  font-weight: 500;\n  line-height: 2.5rem;\n}\n.order-status[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 0.25rem 0.75rem;\n  color: #232323;\n  background-color: #fff2d4;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.close-link[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  padding: 0.5rem;\n  border-radius: 50%;\n}\n.close-link[_ngcontent-%COMP%]:hover, \n.close-link[_ngcontent-%COMP%]:focus-visible {\n  background-color: #dadada;\n}\n.close-link[_ngcontent-%COMP%]:focus-visible, \n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #0F7A37;\n  outline-offset: 2px;\n}\n.close-link[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n}\n.reservation-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem 1rem;\n  margin: 0;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #D6E5D5;\n}\n.detail-item[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  white-space: nowrap;\n}\n.detail-icon[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 1rem;\n  place-items: center;\n  width: 1rem;\n  height: 1rem;\n}\n.detail-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n}\n.detail-icon[_ngcontent-%COMP%]   .detail-icon--large[_ngcontent-%COMP%] {\n  transform: scale(0.6667);\n}\n.visually-hidden[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  clip-path: inset(50%);\n}\n.participants-section[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 0.875rem 2.5rem 0.5rem;\n  scrollbar-width: thin;\n}\n.load-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  min-height: 10rem;\n  padding: 1.5rem 2.5rem;\n  text-align: center;\n}\n.load-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.retry-button[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n  padding: 0 1.25rem;\n  color: #0B5B29;\n  background: #ffffff;\n  border: 1px solid #0B5B29;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-weight: 500;\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #0F7A37;\n  outline-offset: 2px;\n}\n.participants[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.participant-item[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.panel-footer[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin: 0 2.5rem 2.5rem;\n  padding-top: 1rem;\n  background-color: #f7f7f7;\n  border-top: 1px solid #D6E5D5;\n}\n.grand-total[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 0 0 1rem;\n  font-size: 1.625rem;\n  font-weight: 500;\n  line-height: 2.5rem;\n}\n.grand-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: #0B5B29;\n}\n.submit-button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 3.5rem;\n  padding: 0 1.5rem;\n  color: #ffffff;\n  background-color: #0B5B29;\n  border: 0;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-weight: 600;\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  background-color: #898989;\n}\n.submit-confirmation[_ngcontent-%COMP%] {\n  width: min(100%, 31rem);\n  max-height: calc(100dvh - 2rem);\n  box-sizing: border-box;\n  overflow-y: auto;\n  margin: auto;\n  padding: 1.5rem;\n  color: #232323;\n  background-color: #f7f7f7;\n  border: 0;\n  border-radius: 1rem;\n}\n.submit-confirmation[_ngcontent-%COMP%]::backdrop {\n  background-color: rgba(35, 35, 35, 0.5);\n}\n.submit-confirmation[_ngcontent-%COMP%]   .submit-error[_ngcontent-%COMP%] {\n  color: #B70B0B;\n}\n.confirmation-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n@media (max-width: 600px) {\n  .group-order-backdrop[_ngcontent-%COMP%] {\n    align-items: stretch;\n    padding: 0.5rem;\n  }\n  .group-order-panel[_ngcontent-%COMP%] {\n    width: 100%;\n    height: calc(100vh - 1rem);\n    height: calc(100dvh - 1rem);\n    border-radius: 1rem;\n  }\n  .panel-header[_ngcontent-%COMP%] {\n    padding: 3rem 1rem 0;\n  }\n  .title-row[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .title-with-status[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n  .title-row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.375rem;\n    line-height: 2rem;\n  }\n  .reservation-details[_ngcontent-%COMP%] {\n    gap: 0.5rem 0.875rem;\n  }\n  .detail-item[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .participants-section[_ngcontent-%COMP%] {\n    padding: 0.875rem 1rem 0.5rem;\n  }\n  .load-state[_ngcontent-%COMP%] {\n    padding-right: 1rem;\n    padding-left: 1rem;\n  }\n  .panel-footer[_ngcontent-%COMP%] {\n    margin: 0 1rem 1rem;\n    padding-top: 0.75rem;\n  }\n  .grand-total[_ngcontent-%COMP%] {\n    font-size: 1.375rem;\n    line-height: 2rem;\n  }\n}\n/*# sourceMappingURL=group-order-page.component.css.map */"], changeDetection: 1 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupOrderPageComponent, [{
    type: Component,
    args: [{ selector: "app-group-order-page", standalone: true, imports: [CurrencyPipe, DatePipe, ParticipantCardComponent, RouterLink], changeDetection: ChangeDetectionStrategy.Eager, template: `<main class="group-order-backdrop">
  <section
    class="group-order-panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="group-order-title"
  >
    <header class="panel-header">
      <div class="title-row">
        <div class="title-with-status">
          <h1 id="group-order-title">Group Pre-Order</h1>
          @if (groupOrder()) {
            <span class="order-status">{{ orderStatusLabel() }}</span>
          }
        </div>
        <a class="close-link" routerLink="/reservations" aria-label="Close group pre-order">
          <img src="assets/svg/close.svg" alt="" aria-hidden="true" />
        </a>
      </div>

      @if (groupOrder(); as data) {
        <dl class="reservation-details">
          <div class="detail-item">
            <dt class="visually-hidden">Location</dt>
            <dd>
              <span class="detail-icon" aria-hidden="true">
                <img class="detail-icon--large" src="assets/svg/location-green.svg" alt="" />
              </span>
              {{ data.invite.LocationAddress }}
            </dd>
          </div>

          <div class="detail-item">
            <dt class="visually-hidden">Date</dt>
            <dd>
              <span class="detail-icon" aria-hidden="true">
                <img src="assets/svg/calendar-green.svg" alt="" />
              </span>
              {{ data.invite.StartTime | date: 'mediumDate' }}
            </dd>
          </div>

          <div class="detail-item">
            <dt class="visually-hidden">Time</dt>
            <dd>
              <span class="detail-icon" aria-hidden="true">
                <img src="assets/svg/clock-green.svg" alt="" />
              </span>
              {{ data.invite.StartTime | date: 'HH:mm' }} -
              {{ data.invite.EndTime | date: 'HH:mm' }}
            </dd>
          </div>

          <div class="detail-item">
            <dt class="visually-hidden">Guests</dt>
            <dd>
              <span class="detail-icon" aria-hidden="true">
                <img class="detail-icon--large" src="assets/svg/people-green.svg" alt="" />
              </span>
              {{ guestCountLabel() }}
            </dd>
          </div>
        </dl>
      }
    </header>

    @if (isLoading()) {
      <section class="load-state" role="status" aria-live="polite">
        Loading group pre-order...
      </section>
    } @else if (loadError()) {
      <section class="load-state load-state--error" role="alert">
        <p>{{ loadError() }}</p>
        <button class="retry-button" type="button" (click)="loadGroupOrder()">Try again</button>
      </section>
    } @else if (groupOrder(); as data) {
      <section class="participants-section" aria-label="Participants">
        <ul class="participants">
          @for (participant of participants(); track participant.id) {
            <li class="participant-item">
              <app-participant-card
                [participant]="participant"
                [canRemove]="participant.type === 'Guest' && !isRemoving()"
                (removeRequested)="openRemoveConfirmation($event)"
              />
            </li>
          }
        </ul>
        @if (removeSuccess()) {
          <p class="remove-success" role="status" aria-live="polite">{{ removeSuccess() }}</p>
        }
      </section>

      <footer class="panel-footer">
        <p class="grand-total">
          <span>Grand Total</span>
          <span>{{ data.sessions.total | currency: 'USD' : 'symbol' : '1.0-2' }}</span>
        </p>
        @if (submitSuccess()) {
          <p class="submit-success" role="status">Group pre-order sent to the restaurant.</p>
        } @else if (data.status === 'Open') {
          @if (submitReadinessMessage(); as message) {
            <p class="submit-hint">{{ message }}</p>
          }
          <button
            class="submit-button"
            type="button"
            [disabled]="!canSubmit()"
            (click)="openSubmitConfirmation()"
          >
            Submit Pre-Order
          </button>
        } @else {
          <p class="submit-success" role="status">This group pre-order has been submitted.</p>
        }
      </footer>
    }

    @if (isSubmitConfirmationOpen()) {
      <dialog
        #submitDialog
        class="submit-confirmation"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="submit-confirmation-title"
        aria-describedby="submit-confirmation-description"
        (cancel)="handleSubmitDialogCancel($event)"
      >
        <h2 id="submit-confirmation-title">Submit group pre-order?</h2>
        <p id="submit-confirmation-description">
          This sends {{ submittedGuestCount() }} submitted guest
          {{ submittedGuestCount() === 1 ? 'order' : 'orders' }} to the restaurant. Unsubmitted
          guest carts will not be included, and the reservation order will be replaced with the
          submitted guest dishes.
        </p>
        @if (submitError()) {
          <p class="submit-error" role="alert">{{ submitError() }}</p>
        }
        <div class="confirmation-actions">
          <button
            class="retry-button"
            type="button"
            autofocus
            [disabled]="isSubmitting()"
            (click)="cancelSubmitConfirmation()"
          >
            Cancel
          </button>
          <button
            class="submit-button"
            type="button"
            [disabled]="isSubmitting()"
            (click)="confirmGroupOrderSubmission()"
          >
            {{ isSubmitting() ? 'Sending...' : 'Confirm & Send' }}
          </button>
        </div>
      </dialog>
    }

    @if (pendingRemoval(); as guest) {
      <dialog
        #removeDialog
        class="submit-confirmation"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-confirmation-title"
        aria-describedby="remove-confirmation-description"
        (cancel)="handleRemoveDialogCancel($event)"
      >
        <h2 id="remove-confirmation-title">Remove {{ guest.name }} from the group?</h2>
        <p id="remove-confirmation-description">
          This permanently removes {{ guest.name }} and their guest session from this group.
          @if (groupOrder()?.status === 'Submitted') {
            The order already sent to the restaurant will remain unchanged.
          }
        </p>
        @if (removeError()) {
          <p class="submit-error" role="alert">{{ removeError() }}</p>
        }
        <div class="confirmation-actions">
          <button
            class="retry-button"
            type="button"
            autofocus
            [disabled]="isRemoving()"
            (click)="cancelRemoveConfirmation()"
          >
            Cancel
          </button>
          <button
            class="submit-button"
            type="button"
            [disabled]="isRemoving()"
            (click)="confirmGuestRemoval()"
          >
            {{ isRemoving() ? 'Removing...' : 'Remove Guest' }}
          </button>
        </div>
      </dialog>
    }
  </section>
</main>
`, styles: ["/* src/app/pages/group-order-page/group-order-page.component.scss */\n.group-order-backdrop {\n  position: fixed;\n  z-index: 1100;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  box-sizing: border-box;\n  overflow-y: auto;\n  padding: 1.5rem;\n  background-color: rgba(35, 35, 35, 0.65);\n}\n.group-order-panel {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: min(100%, 52.2rem);\n  height: min(47.5rem, 100vh - 3rem);\n  height: min(47.5rem, 100dvh - 3rem);\n  overflow: hidden;\n  background-color: #f7f7f7;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 0.3125rem rgba(218, 218, 218, 0.7);\n}\n.panel-header {\n  flex: 0 0 auto;\n  padding: 2.5rem 2.5rem 0;\n}\n.title-row,\n.title-with-status {\n  display: flex;\n  align-items: center;\n}\n.title-row {\n  justify-content: space-between;\n  gap: 1rem;\n}\n.title-with-status {\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.title-row h1 {\n  margin: 0;\n  font-size: 1.625rem;\n  font-weight: 500;\n  line-height: 2.5rem;\n}\n.order-status {\n  flex: 0 0 auto;\n  padding: 0.25rem 0.75rem;\n  color: #232323;\n  background-color: #fff2d4;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.close-link {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  padding: 0.5rem;\n  border-radius: 50%;\n}\n.close-link:hover,\n.close-link:focus-visible {\n  background-color: #dadada;\n}\n.close-link:focus-visible,\n.submit-button:focus-visible {\n  outline: 3px solid #0F7A37;\n  outline-offset: 2px;\n}\n.close-link img {\n  display: block;\n}\n.reservation-details {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem 1rem;\n  margin: 0;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #D6E5D5;\n}\n.detail-item dd {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  white-space: nowrap;\n}\n.detail-icon {\n  display: grid;\n  flex: 0 0 1rem;\n  place-items: center;\n  width: 1rem;\n  height: 1rem;\n}\n.detail-icon img {\n  display: block;\n}\n.detail-icon .detail-icon--large {\n  transform: scale(0.6667);\n}\n.visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  clip-path: inset(50%);\n}\n.participants-section {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 0.875rem 2.5rem 0.5rem;\n  scrollbar-width: thin;\n}\n.load-state {\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  min-height: 10rem;\n  padding: 1.5rem 2.5rem;\n  text-align: center;\n}\n.load-state p {\n  margin: 0;\n}\n.retry-button {\n  min-height: 2.75rem;\n  padding: 0 1.25rem;\n  color: #0B5B29;\n  background: #ffffff;\n  border: 1px solid #0B5B29;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-weight: 500;\n}\n.retry-button:focus-visible {\n  outline: 3px solid #0F7A37;\n  outline-offset: 2px;\n}\n.participants {\n  display: grid;\n  gap: 1.5rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.participant-item {\n  min-width: 0;\n}\n.panel-footer {\n  flex: 0 0 auto;\n  margin: 0 2.5rem 2.5rem;\n  padding-top: 1rem;\n  background-color: #f7f7f7;\n  border-top: 1px solid #D6E5D5;\n}\n.grand-total {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 0 0 1rem;\n  font-size: 1.625rem;\n  font-weight: 500;\n  line-height: 2.5rem;\n}\n.grand-total span:last-child {\n  color: #0B5B29;\n}\n.submit-button {\n  width: 100%;\n  min-height: 3.5rem;\n  padding: 0 1.5rem;\n  color: #ffffff;\n  background-color: #0B5B29;\n  border: 0;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-weight: 600;\n}\n.submit-button:disabled {\n  cursor: not-allowed;\n  background-color: #898989;\n}\n.submit-confirmation {\n  width: min(100%, 31rem);\n  max-height: calc(100dvh - 2rem);\n  box-sizing: border-box;\n  overflow-y: auto;\n  margin: auto;\n  padding: 1.5rem;\n  color: #232323;\n  background-color: #f7f7f7;\n  border: 0;\n  border-radius: 1rem;\n}\n.submit-confirmation::backdrop {\n  background-color: rgba(35, 35, 35, 0.5);\n}\n.submit-confirmation .submit-error {\n  color: #B70B0B;\n}\n.confirmation-actions {\n  display: grid;\n  gap: 0.75rem;\n}\n@media (max-width: 600px) {\n  .group-order-backdrop {\n    align-items: stretch;\n    padding: 0.5rem;\n  }\n  .group-order-panel {\n    width: 100%;\n    height: calc(100vh - 1rem);\n    height: calc(100dvh - 1rem);\n    border-radius: 1rem;\n  }\n  .panel-header {\n    padding: 3rem 1rem 0;\n  }\n  .title-row {\n    align-items: flex-start;\n  }\n  .title-with-status {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n  .title-row h1 {\n    font-size: 1.375rem;\n    line-height: 2rem;\n  }\n  .reservation-details {\n    gap: 0.5rem 0.875rem;\n  }\n  .detail-item dd {\n    font-size: 0.75rem;\n  }\n  .participants-section {\n    padding: 0.875rem 1rem 0.5rem;\n  }\n  .load-state {\n    padding-right: 1rem;\n    padding-left: 1rem;\n  }\n  .panel-footer {\n    margin: 0 1rem 1rem;\n    padding-top: 0.75rem;\n  }\n  .grand-total {\n    font-size: 1.375rem;\n    line-height: 2rem;\n  }\n}\n/*# sourceMappingURL=group-order-page.component.css.map */\n"] }]
  }], null, { submitDialog: [{
    type: ViewChild,
    args: ["submitDialog"]
  }], removeDialog: [{
    type: ViewChild,
    args: ["removeDialog"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupOrderPageComponent, { className: "GroupOrderPageComponent", filePath: "app/pages/group-order-page/group-order-page.component.ts", lineNumber: 32 });
})();
export {
  GroupOrderPageComponent
};
//# debugId=bbc8547a-27da-5438-9719-e83cead93fd8
//# sourceMappingURL=chunk-CLMODXHH.js.map
