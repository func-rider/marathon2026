import {
  API_BASE_URL,
  HttpClient,
  HttpContext,
  HttpContextToken
} from "./chunk-SEN52NIG.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  switchMap,
  ɵɵdefineInjectable
} from "./chunk-BAQCAAG6.js";

// src/app/auth/skip-error-toast.context.ts
var SKIP_ERROR_TOAST = new HttpContextToken(() => false);

// src/app/services/pre-orders/pre-orders.service.ts
var PreOrdersService = class _PreOrdersService {
  baseUrl = inject(API_BASE_URL);
  http = inject(HttpClient);
  getPreOrders() {
    return this.http.get(`${this.baseUrl}/orders`);
  }
  getByReservationId(reservationId, skipErrorToast = false) {
    return this.http.get(`${this.baseUrl}/orders/${reservationId}`, {
      context: new HttpContext().set(SKIP_ERROR_TOAST, skipErrorToast)
    });
  }
  addDishToPreOrderByReservationId(reservationId, dish, quantity) {
    return this.getPreOrders().pipe(map((orders) => {
      const order = orders.find((o) => o.reservationId === reservationId);
      if (!order) {
        return order;
      }
      const existingItem = order.orderItems.find((item) => item.dish.id === dish.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        order.orderItems.push({ dish, quantity, state: 0 });
      }
      return order;
    }), switchMap((order) => {
      if (!order) {
        const orderCreateRequest = {
          reservationId,
          orderItems: [{ dish, quantity, state: 0 }]
        };
        return this.createPreOrder(orderCreateRequest);
      }
      return this.editPreOrderByReservationId(reservationId, order);
    }));
  }
  createPreOrder(order) {
    const createOrderRequest = {
      reservationId: order.reservationId,
      orderItems: order.orderItems.map((item) => ({
        dishId: item.dish.id,
        quantity: item.quantity
      }))
    };
    return this.http.post(`${this.baseUrl}/orders`, createOrderRequest);
  }
  editPreOrderByReservationId(reservationId, order) {
    const orderItems = order.orderItems.map((item) => ({
      dishId: item.dish.id,
      quantity: item.quantity
    }));
    if (orderItems.length === 0) {
      return this.cancelPreOrderByReservationId(reservationId);
    }
    return this.http.put(`${this.baseUrl}/orders/${reservationId}`, { orderItems });
  }
  cancelPreOrderByReservationId(reservationId) {
    return this.http.delete(`${this.baseUrl}/orders/${reservationId}`);
  }
  submitPreOrderByReservationId(reservationId) {
    return this.http.post(`${this.baseUrl}/orders/${reservationId}/submit`, {});
  }
  unsubmitPreOrderByReservationId(reservationId) {
    return this.http.post(`${this.baseUrl}/orders/${reservationId}/unsubmit`, {});
  }
  confirmDishInOrder(reservationId, dishId) {
    return this.http.patch(`${this.baseUrl}/reservations/${reservationId}/order/confirmations/${dishId}`, {});
  }
  rejectDishInOrder(reservationId, dishId) {
    return this.http.patch(`${this.baseUrl}/reservations/${reservationId}/order/cancellations/${dishId}`, {});
  }
  static \u0275fac = function PreOrdersService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PreOrdersService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PreOrdersService, factory: _PreOrdersService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreOrdersService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  SKIP_ERROR_TOAST,
  PreOrdersService
};
//# debugId=e53b142c-3e99-5860-92c7-7680cd047f6d
//# sourceMappingURL=chunk-ISCNJM3D.js.map
