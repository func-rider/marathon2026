# Owner Group Session List API Implementation Plan

## Goal and scope

Implement `GET /guest/groups/{groupReservationId}/sessions` so the authenticated owner of the reservation can see the guest sessions in its group reservation, each guest's dishes and total, submission state, and the group total.

Scope is limited to `backend/restaurant-backend-app` and the requested GET endpoint. Non-goals are changes to session creation, guest cart editing, session deletion, group submission, or owner-session creation.

## Acceptance criteria

- Register the GET route `/guest/groups/{groupReservationId}/sessions`.
- Require an authenticated caller identity (`sub`) and verify that the group reservation's parent reservation belongs to that user. Return 401 when identity is missing and 403 for a non-owner.
- Return 404 when the group reservation or its parent reservation is not found.
- Return a JSON object with `participants` and `total`. Each guest participant contains `id`, `type` (`Guest`), `name`, `items` containing dish `id`, `name`, `price`, and `quantity`, participant `total`, and `isSubmitted`.
- Include submitted and unsubmitted guest sessions; an empty group returns an empty participants array and total zero.
- Calculate each total as the sum of dish price times quantity, and the group total as the sum of participant totals.
- Preserve existing guest-session and deletion endpoint behavior.

## Repository findings

- `homework-backend.md` Level 1 describes this exact endpoint and response. Its Level 2 and Level 3 requirements concern other endpoints and are out of scope.
- No `RTK.md` was found in the workspace despite the root guidance reference.
- `dnapp/lambdas/api-handler/Routing/RouteRegistry.cs` registers guest-session and group routes. It already registers `DELETE /guest/groups/{groupReservationId}/sessions/{guestSessionId}` but not the requested GET.
- `swagger_src/swagger-ui/swagger-endpoints.yaml` already documents the requested GET path and points its 200 response at `GetAllSessionsResponse`; runtime route and handler behavior remain absent.
- `dnapp/lambdas/api-handler/Services/GuestSessions/IGuestSessionService.cs` exposes guest-session operations and currently has no group-session snapshot method.
- `dnapp/lambdas/api-handler/Services/GuestSessions/GuestSessionService.cs` already implements owner validation in `ValidateReservationOwnerAsync`, loads all group sessions for deletion snapshots, maps dishes through `DishMapper.ToDishResponse`, and computes item and group totals.
- `dnapp/lambdas/api-handler/Repositories/GuestSessions/IGuestSessionRepository.cs` and `GuestSessionRepository.cs` expose `GetAllByGroupReservationIdAsync` using the group-reservation secondary index.
- `dnapp/lambdas/api-handler/Models/GuestSessions/GetAllResponse.cs` defines `GetAllSessionsResponse`, `Participant`, and string-serialized `ParticipantType`; these match the requested response shape.
- `dnapp/lambdas/api-handler/Handlers/GuestSessions/DeleteGuestSessionHandler.cs` demonstrates extracting `sub` from Cognito claims, owner-service invocation, and error mapping. `GuestSessionNotFoundException`, `GroupReservationNotFoundException`, `ReservationNotFoundException`, `ActionForbiddenException`, and `ValidationException` exist.
- `dnapp/lambdas/api-handler/Entities/GuestSession.cs` distinguishes owner sessions from guest sessions, but `CreateGroupOwnerSessionAsync` has no production call site. The requested sample and language describe joined guest participants, so the response will include guest sessions only.
- Existing tests are under `Tests/Services`, but no tests will be added or run under the active instruction for this task.

## Assumptions and open questions

- Authorization is based on the caller's Cognito `sub` matching the parent reservation's `CustomerId`, following the existing owner-only delete behavior.
- Participants means guest sessions. The example contains guest participants only; owner sessions are not currently created by a production call site.
- The response includes all guest sessions regardless of `IsSubmitted`, matching the requirement to show which participants joined and each participant's `isSubmitted` state.
- No blocking ambiguity remains.

## Execution order

1. [x] **Production implementation — `restaurant_lambda_implementer`.** Added the owner-protected GET handler and route, added the service contract/method, and extracted the existing deletion snapshot mapping into a shared read helper. The API handler project build succeeded with existing dependency and compiler warnings.
2. [x] **API handler tests — skipped.** The higher-priority active instruction prohibits adding or running tests unless the user asks for testing or verification.
3. [x] **Service tests — skipped.** The higher-priority active instruction prohibits adding or running tests unless the user asks for testing or verification.
4. [x] **Code review — read-only.** Initial review found that the handler's generic exception response exposed `ex.Message`. The handler now returns the generic `Internal Server Error` and logs the exception. Focused re-review confirmed the finding is resolved with no remaining actionable issues.

## Verification

- Inspect the implementation diff and verify route registration, owner identity propagation, ownership check, not-found mapping, and snapshot calculations by code review.
- `dotnet build backend/restaurant-backend-app/dnapp/lambdas/api-handler/APIHandler.csproj --no-restore` — exit code 0; 0 errors and 29 warnings (including existing package vulnerability and compiler warnings). Re-run after the 500-response fix with the same result. `git diff --check` exited 0. No test commands were run and no tests were added.
- Required test coverage to add if testing is later requested: route/method, missing identity, owner versus non-owner, missing group/parent reservation, empty group, multiple participants with mixed submission states, dish DTO prices and quantities, and totals.

## Completion criteria

- Every acceptance criterion is implemented and reviewed with no actionable findings.
- Build evidence is recorded: API handler project build succeeded with 0 errors.
- Test phases remain explicitly marked as skipped under the active instruction; no test pass is claimed.
- This plan records the final agent handoffs and any remaining limitation.
