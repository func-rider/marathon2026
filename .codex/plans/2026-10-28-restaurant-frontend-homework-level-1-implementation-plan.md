# Restaurant Frontend Homework Level 1 Implementation Plan

> **For agentic workers:** Implement only the current user-approved homework level, then stop for review before proceeding to the next level.

> **Progress update:** Levels 1 and 2 are complete. The user approved Level 3; implementation is complete and awaiting the user's review.

**Goal:** Add the Owner Review screen for group pre-orders, loading real data from the restaurant backend REST API and matching the supplied screenshot within Homework Level 1.

**Architecture:** Render a reusable participant card and standalone authenticated page. Load reservation, owner order, invitation, participant sessions, and group status through the existing backend REST API. The owner participant-session request sends the Cognito ID token explicitly because the frontend interceptor skips `/guest/` URLs.

**Tech Stack:** Angular 22 standalone components, strict TypeScript, signals, SCSS, Karma, and Jasmine.

## Global Constraints

- Work only on `frontend/restaurant-frontend-app` for application code.
- Use backend REST data at runtime; do not use mock or preview data.
- Level 2 adds submission; do not add guest removal, polling, or demo authentication.
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
- Level 2 adds owner session lookup and group submission as described below.

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

The current owner flow resolves `groupReservationId` through the invite token. The backend rejects invite-token lookup for submitted groups, and invite details lookup rejects a full group. After the page resolves an open group, it keeps the group ID in the URL so that same owner link can reload submitted data directly from the owner-protected sessions/status endpoints. A fresh link to a previously submitted or full group still needs a backend lookup by reservation ID.

## Task 2: Owner session and consolidated submission

### Acceptance criteria

- Read the owner `guestSessionId` from `GET /reservations/{reservationId}/guest-session-id` and use it for the Owner participant identity.
- Submit through `POST /group-reservations/{groupReservationId}/submit` with `{ reservationId }`.
- Preserve the resolved group ID in the owner page URL so the submitted page can reload without the invite lookup.
- Allow submission only when an owner order exists and at least one guest has submitted dishes.
- Confirm that only submitted guest sessions are sent and that the backend replaces the reservation order with their consolidated dishes.
- Show submitting, error, and success states; on success show the submitted consolidated order from the API response.
- Do not implement Level 3 guest removal or polling.

### Execution

- [x] Implement owner session ID retrieval and group submit API calls; refresh the final order from the backend after successful submit.
- [x] Keep the resolved group ID in the page URL and load existing group data directly on reload.
- [x] Add submit readiness checks, an accessible confirmation dialog, and success/error states.
- [x] App/spec TypeScript checks and production build pass. The build reports existing initial-bundle, stylesheet-budget, and CommonJS warnings; the new group-order stylesheet is within its budget.
- [x] Keep guest removal and polling out of scope. Report Task 2 for the user's review and wait before starting Task 3.

## Task 3: Owner removes a guest session

### Acceptance criteria

- Let the reservation owner remove a guest through `DELETE /guest/groups/{groupReservationId}/sessions/{guestSessionId}` using the Cognito ID token.
- Confirm the permanent removal and show clear errors for unauthorized, mismatched, and missing sessions.
- Replace the guest list and recompute the displayed total from the updated sessions snapshot returned by the API.
- Do not add polling.

### Execution

- [x] Add the authenticated API call and connect the Guest card action to the owner page.
- [x] Add a removal confirmation dialog, in-progress/error/success states, and apply the returned session snapshot and total.
- [x] App/spec TypeScript checks and formatting pass. Production build passes with the configured real backend URL; existing bundle and stylesheet budget/CommonJS warnings remain.
- [x] Report Task 3 for the user's review and wait before doing further homework tasks.

### Backend behavior

The backend allows the owner to delete a guest session even after the group has been submitted; deleting that session does not revise the order already sent to the restaurant. The confirmation explains this for submitted groups.

## Deferred

- Polling or automatic group refresh is not part of the requested homework tasks.
