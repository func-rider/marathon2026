# Restaurant Frontend Homework Level 1 Implementation Plan

> **For agentic workers:** Execute inline in this session. Implement Level 1 only, then stop for the user's review. Do not begin Level 2 or Level 3 until the user approves this checkpoint.

**Goal:** Add the Owner Review screen for group pre-orders, loading real data from the restaurant backend REST API and matching the supplied screenshot within Homework Level 1.

**Architecture:** Render a reusable participant card and standalone authenticated page. Load reservation, owner order, invitation, participant sessions, and group status through the existing backend REST API. The owner participant-session request sends the Cognito ID token explicitly because the frontend interceptor skips `/guest/` URLs.

**Tech Stack:** Angular 22 standalone components, strict TypeScript, signals, SCSS, Karma, and Jasmine.

## Global Constraints

- Work only on `frontend/restaurant-frontend-app` for application code.
- Use backend REST data at runtime; do not use mock or preview data.
- Keep this checkpoint read-only: no submission, guest removal, polling, or demo authentication.
- Use one `<main>`, one `<h1>`, a participant `<ul>`/`<li>`, and an `<article>` per participant card.
- Show cart status with text as well as color; source colors through `@use 'app/shared/styles/abstracts/colors' as color`.
- Keep the screen usable at a 375px viewport.
- Do not add dependencies, stage, commit, branch, or push.
- The user supplied the corrected Figma copy URL. Its Owner Flow contains `Group Pre-order - sent - Modal` (`112080:122874`); use that frame together with `frontend/restaurant-frontend-app/01-owner-review.png` as the design references.
- Do not run test suites unless requested. Use app/spec TypeScript checks and a production build for verification.

---

## File Map

- Create `src/app/models/group-orders/participant.model.ts` for participant, dish, and item types.
- Create `src/app/models/group-orders/group-order-preview.model.ts` for invitation metadata and the page response view model.
- Do not add runtime mock data.
- Create `src/app/services/group-orders/group-orders.service.ts` to load the owner review data from the REST API.
- Create `src/app/components/group-orders/participant-card/participant-card.component.ts`, `.html`, `.scss`, and `.spec.ts` for one accessible participant card.
- Create `src/app/pages/group-order-page/group-order-page.component.ts`, `.html`, `.scss`, and `.spec.ts` for the responsive Owner Review screen.
- Modify `src/app/app.routes.ts` to register `reservations/:reservationId/group-order` under the authenticated main layout.

## Task 1: Owner Review with real API data

### Acceptance criteria

- The route loads reservation and group information from the backend; the guest list and guest total come from `GET /guest/groups/{groupReservationId}/sessions`.
- The header renders location, date, time, and participant count against `MaxGuestCount`.
- The API-provided participants and the owner order render names, item names, quantities, prices, textual submission state, and subtotals.
- Grand Total renders the live owner order total plus the API-provided guest total with `CurrencyPipe`.
- The screen meets the required semantic structure and adapts to 375px width without horizontal overflow.
- The owner session ID and group submit endpoints remain deferred to Level 2.

### Execution

- [x] Write card and page specs first. The initial run reported the missing feature modules and was also blocked by sandbox path resolution.
- [x] Add typed participant and page response models; remove runtime static preview data.
- [x] Implement the participant card using standalone imports, signal input, computed title, `CurrencyPipe`, and text cart status.
- [x] Implement the page with `DatePipe`, `CurrencyPipe`, semantic lists, responsive SCSS, and loading/error states for API responses.
- [x] Register the authenticated lazy route without changing existing reservation routes.
- [x] Refine the screen against the corrected Figma Owner Flow modal: header status, reservation details, API order rows with notes/quantities/prices, owner/guest cards, subtotals, and fixed grand-total footer.
- [x] App/spec TypeScript checks pass; production build passes with existing bundle-size, stylesheet-budget, and CommonJS warnings.
- [x] Confirm the frontend no longer reads runtime preview/mock data. No authenticated live reservation was available for an end-to-end API request.
- [x] Report Task 1 for the user's review and wait. Do not start Task 2 until the user approves the checkpoint.

### Backend API limitation

The current owner flow resolves `groupReservationId` through the invite token. The backend rejects invite-token lookup for submitted groups, and invite details lookup rejects a full group. As a result, this page can load open groups that have remaining capacity, but cannot reload submitted or full groups through the current API. Fixing that requires a backend lookup by reservation ID and is outside this Level 1 checkpoint.

## Deferred until user approval

- Level 2: owner session lookup and consolidated submission.
- Level 3: guest removal and group refresh/polling.
