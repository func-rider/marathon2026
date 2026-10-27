import {
  PreOrdersService
} from "./chunk-ISCNJM3D.js";
import {
  CustomButtonComponent,
  DishCardComponent
} from "./chunk-DT5WR34X.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-SEN52NIG.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  __spreadProps,
  __spreadValues,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4
} from "./chunk-BAQCAAG6.js";

// src/app/pages/waiter-pre-order-page/waiter-pre-order-page.component.ts
var _forTrack0 = ($index, $item) => $item.dish.id;
function WaiterPreOrderPageComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-dish-card", 7);
    \u0275\u0275listener("remove", function WaiterPreOrderPageComponent_For_11_Template_app_dish_card_remove_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRemove(item_r2.dish.id));
    });
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "app-custom-button", 11);
    \u0275\u0275listener("click", function WaiterPreOrderPageComponent_For_11_Template_app_custom_button_click_5_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.rejectDish(item_r2.dish.id));
    });
    \u0275\u0275text(6, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "app-custom-button", 12);
    \u0275\u0275listener("click", function WaiterPreOrderPageComponent_For_11_Template_app_custom_button_click_7_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDish(item_r2.dish.id));
    });
    \u0275\u0275text(8, " Confirm ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275property("dish", item_r2.dish);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Quantity: ", item_r2.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", item_r2.state === 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", item_r2.state === 1);
  }
}
var WaiterPreOrderPageComponent = class _WaiterPreOrderPageComponent {
  reservationLabel = "";
  orderItems = [];
  reservationId = "";
  createdByName = "";
  createdByRole = "";
  tableName = "";
  reservationTime = "";
  customClass = "";
  route = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  preOrdersService = inject(PreOrdersService);
  ngOnInit() {
    const navState = this.router.getCurrentNavigation()?.extras.state;
    let data = navState;
    if (!data?.reservationId) {
      const stored = sessionStorage.getItem("waiterPreOrderData");
      if (stored) {
        data = JSON.parse(stored);
        console.log("data", data);
      }
    }
    if (!data?.reservationId) {
      console.warn("Reservation ID not found");
      return;
    }
    this.createdByName = data.createdByName;
    this.createdByRole = data.createdByRole;
    this.tableName = data.tableName;
    this.reservationId = data.reservationId;
    firstValueFrom(this.preOrdersService.getByReservationId(data.reservationId)).then((order) => {
      console.log("order", order);
      console.log("ORDER FROM SERVER:", JSON.stringify(order, null, 2));
      this.orderItems = order.orderItems ?? [];
      this.reservationTime = order.reservationTime || "";
    }).catch((err) => {
      console.error("Error loading order:", err);
    });
  }
  onRemove(dishId) {
    this.orderItems = this.orderItems.filter((item) => item.dish.id !== dishId);
  }
  confirmDish(dishId) {
    this.preOrdersService.confirmDishInOrder(this.reservationId, dishId).subscribe({
      next: () => {
        const index = this.orderItems.findIndex((i) => i.dish.id === dishId);
        if (index !== -1) {
          const item = this.orderItems[index];
          const updatedItem = __spreadProps(__spreadValues({}, item), {
            dish: __spreadProps(__spreadValues({}, item.dish), {
              status: "Confirmed"
            }),
            state: 1
            // Update state to 'Confirmed'
          });
          this.orderItems.splice(index, 1, updatedItem);
          this.orderItems = [...this.orderItems];
          this.cdr.detectChanges();
          console.log("Updated orderItems:", this.orderItems);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  rejectDish(dishId) {
    this.preOrdersService.rejectDishInOrder(this.reservationId, dishId).subscribe({
      next: () => {
        const index = this.orderItems.findIndex((i) => i.dish.id === dishId);
        if (index !== -1) {
          const item = this.orderItems[index];
          const updatedItem = __spreadProps(__spreadValues({}, item), {
            dish: __spreadProps(__spreadValues({}, item.dish), {
              status: "Rejected"
            }),
            state: 2
            // Update state to 'Rejected'
          });
          this.orderItems.splice(index, 1, updatedItem);
          this.orderItems = [...this.orderItems];
          this.cdr.detectChanges();
          console.log("Dish rejected and updated locally:", updatedItem);
          console.log("Updated orderItems:", this.orderItems);
        }
      },
      error: (err) => {
        console.error("Failed to reject dish:", err);
      }
    });
  }
  static \u0275fac = function WaiterPreOrderPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WaiterPreOrderPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WaiterPreOrderPageComponent, selectors: [["app-waiter-pre-order-page"]], inputs: { customClass: "customClass" }, decls: 12, vars: 4, consts: [[1, "breadcrumb"], ["routerLink", "/waiter-reservations", 1, "breadcrumb-link"], [1, "breadcrumb-separator"], [1, "breadcrumb-current"], [1, "title"], [1, "preorder-list"], [1, "pre-order-dish", 3, "dish"], [1, "pre-order-dish", 3, "remove", "dish"], ["dish-footer", "", 1, "pre-order-footer"], [1, "pre-order-quantity"], [1, "preorder-actions"], [1, "btn-cancel", 3, "click", "disabled"], [1, "btn-confirm", 3, "click", "disabled"]], template: function WaiterPreOrderPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0)(1, "a", 1);
      \u0275\u0275text(2, "Reservations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "span", 2);
      \u0275\u0275text(4, "\u203A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "Pre-order");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "h2", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 5);
      \u0275\u0275repeaterCreate(10, WaiterPreOrderPageComponent_For_11_Template, 9, 4, "app-dish-card", 6, _forTrack0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate4(" Pre-order of ", ctx.createdByRole.toLowerCase(), " ", ctx.createdByName, ", Table ", ctx.tableName, " (", ctx.reservationTime, ")\n");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.orderItems);
    }
  }, dependencies: [DishCardComponent, RouterLink, CustomButtonComponent], styles: ["\n.preorder-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding: 1rem 2.5rem;\n  gap: 1.5rem;\n}\n@media (max-width: 780px) {\n  .preorder-list[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n.pre-order-dish[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 2rem;\n  padding: 1rem 2.5rem;\n  color: #575757;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 24px;\n  margin-left: 2.5rem;\n  color: #575757;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.breadcrumb-link[_ngcontent-%COMP%] {\n  color: #575757;\n  text-decoration: none;\n  transition: color 0.2s ease;\n  cursor: pointer;\n}\n.breadcrumb-link[_ngcontent-%COMP%]:hover {\n  color: #232323;\n  text-decoration: underline;\n}\n.breadcrumb-separator[_ngcontent-%COMP%] {\n  color: #575757;\n  font-size: 1.5rem;\n}\n.breadcrumb-current[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #232323;\n}\n.preorder-actions[_ngcontent-%COMP%] {\n  width: 90%;\n  height: 2.5rem;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 0 1rem;\n  gap: 1rem;\n  justify-content: center;\n}\n.btn-cancel[_ngcontent-%COMP%], \n.btn-confirm[_ngcontent-%COMP%] {\n  width: 126px;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  border: 1px solid #0F7A37;\n  border-radius: 0.5rem;\n  height: 2.5rem;\n  font-weight: 600;\n  line-height: 1.5rem;\n  font-size: 0.875rem;\n  color: #0F7A37;\n  text-align: center;\n  cursor: pointer;\n}\n  .preorder-list app-dish-card [dish-footer] app-custom-button   button {\n  height: 2.5rem;\n}\n.pre-order-footer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n  app-custom-button.btn-cancel > .custom-button {\n  background-color: #ffffff;\n  color: #0F7A37;\n  border: 1px solid #0F7A37;\n  align-self: flex-start;\n  border-radius: 0.5rem;\n  height: 2.5rem;\n  font-weight: 600;\n  line-height: 1.5rem;\n  font-size: 0.875rem;\n  text-align: center;\n  cursor: pointer;\n}\n  app-custom-button.btn-cancel > .custom-button:disabled {\n  color: #ffffff;\n  cursor: not-allowed;\n  border: 1px solid #dadada;\n}\n  .preorder-list app-dish-card a .dish-info .dish-meta {\n  width: 90%;\n  background-color: aqua;\n}\n.pre-order-quantity[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=waiter-pre-order-page.component.css.map */"], changeDetection: 1 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WaiterPreOrderPageComponent, [{
    type: Component,
    args: [{ selector: "app-waiter-pre-order-page", imports: [DishCardComponent, RouterLink, CustomButtonComponent], changeDetection: ChangeDetectionStrategy.Eager, template: '<nav class="breadcrumb">\r\n  <a class="breadcrumb-link" routerLink="/waiter-reservations">Reservations</a>\r\n  <span class="breadcrumb-separator">\u203A</span>\r\n  <span class="breadcrumb-current">Pre-order</span>\r\n</nav>\r\n\r\n<h2 class="title">\r\n  Pre-order of {{ createdByRole.toLowerCase() }} {{ createdByName }}, Table {{ tableName }} ({{\r\n    reservationTime\r\n  }})\r\n</h2>\r\n<div class="preorder-list">\r\n  @for (item of orderItems; track item.dish.id) {\r\n    <app-dish-card\r\n      [dish]="item.dish"\r\n      (remove)="onRemove(item.dish.id)"\r\n      class="pre-order-dish"\r\n    >\r\n      <div dish-footer class="pre-order-footer">\r\n        <div class="pre-order-quantity">Quantity: {{ item.quantity }}</div>\r\n        <div class="preorder-actions">\r\n          <app-custom-button\r\n            class="btn-cancel"\r\n            (click)="rejectDish(item.dish.id)"\r\n            [disabled]="item.state === 2"\r\n          >\r\n            Cancel\r\n          </app-custom-button>\r\n          <app-custom-button\r\n            class="btn-confirm"\r\n            (click)="confirmDish(item.dish.id)"\r\n            [disabled]="item.state === 1"\r\n          >\r\n            Confirm\r\n          </app-custom-button>\r\n        </div>\r\n      </div>\r\n    </app-dish-card>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/pages/waiter-pre-order-page/waiter-pre-order-page.component.scss */\n.preorder-list {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding: 1rem 2.5rem;\n  gap: 1.5rem;\n}\n@media (max-width: 780px) {\n  .preorder-list {\n    justify-content: center;\n  }\n}\n.pre-order-dish {\n  display: flex;\n  flex-direction: column;\n}\n.title {\n  font-size: 18px;\n  line-height: 2rem;\n  padding: 1rem 2.5rem;\n  color: #575757;\n}\n.breadcrumb {\n  font-size: 14px;\n  line-height: 24px;\n  margin-left: 2.5rem;\n  color: #575757;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.breadcrumb-link {\n  color: #575757;\n  text-decoration: none;\n  transition: color 0.2s ease;\n  cursor: pointer;\n}\n.breadcrumb-link:hover {\n  color: #232323;\n  text-decoration: underline;\n}\n.breadcrumb-separator {\n  color: #575757;\n  font-size: 1.5rem;\n}\n.breadcrumb-current {\n  font-weight: 600;\n  color: #232323;\n}\n.preorder-actions {\n  width: 90%;\n  height: 2.5rem;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 0 1rem;\n  gap: 1rem;\n  justify-content: center;\n}\n.btn-cancel,\n.btn-confirm {\n  width: 126px;\n}\n.btn-cancel {\n  align-self: flex-start;\n  border: 1px solid #0F7A37;\n  border-radius: 0.5rem;\n  height: 2.5rem;\n  font-weight: 600;\n  line-height: 1.5rem;\n  font-size: 0.875rem;\n  color: #0F7A37;\n  text-align: center;\n  cursor: pointer;\n}\n::ng-deep .preorder-list app-dish-card [dish-footer] app-custom-button ::ng-deep button {\n  height: 2.5rem;\n}\n.pre-order-footer {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n::ng-deep app-custom-button.btn-cancel > .custom-button {\n  background-color: #ffffff;\n  color: #0F7A37;\n  border: 1px solid #0F7A37;\n  align-self: flex-start;\n  border-radius: 0.5rem;\n  height: 2.5rem;\n  font-weight: 600;\n  line-height: 1.5rem;\n  font-size: 0.875rem;\n  text-align: center;\n  cursor: pointer;\n}\n::ng-deep app-custom-button.btn-cancel > .custom-button:disabled {\n  color: #ffffff;\n  cursor: not-allowed;\n  border: 1px solid #dadada;\n}\n::ng-deep .preorder-list app-dish-card a .dish-info .dish-meta {\n  width: 90%;\n  background-color: aqua;\n}\n.pre-order-quantity {\n  position: relative;\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=waiter-pre-order-page.component.css.map */\n"] }]
  }], null, { customClass: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WaiterPreOrderPageComponent, { className: "WaiterPreOrderPageComponent", filePath: "app/pages/waiter-pre-order-page/waiter-pre-order-page.component.ts", lineNumber: 24 });
})();
export {
  WaiterPreOrderPageComponent
};
//# debugId=2d98de39-1f47-558b-8178-d875500fadac
//# sourceMappingURL=chunk-5CN2F4YO.js.map
