import {
  API_BASE_URL,
  HttpClient
} from "./chunk-SEN52NIG.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-BAQCAAG6.js";

// src/app/services/reservation/guest-invite.service.ts
var GuestInviteService = class _GuestInviteService {
  baseUrl = inject(API_BASE_URL);
  http = inject(HttpClient);
  getInviteToken$(reservationId) {
    return this.http.get(`${this.baseUrl}/reservations/${encodeURIComponent(reservationId)}/invite-token`);
  }
  getInvite$(token) {
    return this.http.get(`${this.baseUrl}/guest/invites/${encodeURIComponent(token)}`);
  }
  static \u0275fac = function GuestInviteService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GuestInviteService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GuestInviteService, factory: _GuestInviteService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GuestInviteService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  GuestInviteService
};
//# debugId=9d44517d-5262-5fd4-9de5-f3ed2bee1c01
//# sourceMappingURL=chunk-4VXFMGC4.js.map
