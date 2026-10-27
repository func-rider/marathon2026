# Owner Group Pre-order Endpoints Implementation Plan

## Goal and scope

Implement the Owner-facing endpoint to retrieve the Owner's guest-session ID for a reservation and the endpoint to submit the consolidated group pre-order. Keep changes within `backend/restaurant-backend-app`, including the API handler, service behavior, routing, and matching Swagger documentation.

Non-goals: deploying to AWS, new guest cart APIs, unrelated reservation/order changes, commits, and pushes. API Gateway route configuration is included so the requested endpoints are exposed when the application is deployed.

## Acceptance criteria

- `GET /reservations/{reservationId}/guest-session-id` requires an authenticated identity and verifies that the caller owns the reservation.
- The GET response is `{ "guestSessionId": "..." }`. A missing reservation or associated group reservation returns 404; a missing identity returns 401; a non-owner returns 403.
- The GET endpoint returns an existing owner session or creates one associated with the reservation's group and owner when none exists. This is needed because `CreateGroupOwnerSessionAsync` currently has no call sites.
- Creating an owner-session row must preserve guest-capacity and participant behavior: guest counts exclude the owner row where existing logic adds the owner separately, and the existing participant-list response must not classify the owner as a Guest.
- API Gateway must expose both requested routes with Cognito authorization so their Lambda handlers receive the caller's `sub` claim.
- Existing participant deletion must not delete an Owner-session row.
- `POST /group-reservations/{groupReservationId}/submit` requires an authenticated identity, a JSON `reservationId`, and a reservation ID that matches the path group's parent reservation. The caller must own the reservation.
- Submission considers only sessions with `IsSubmitted == true`, including a submitted owner session as confirmed by the user. It aggregates all session dishes by `DishId` and sums quantities.
- No submitted sessions and no dishes among submitted sessions return 400. A missing order returns 400. A missing group or reservation returns 404. An unauthenticated caller returns 401; a non-owner returns 403.
- Persist the consolidated dishes to the order, set its status to `SubmittedByCustomer`, then set the group reservation status to `Submitted`.
- The POST response is a JSON array of `{ "dishId": "...", "quantity": n }` objects.
- Register the exact requested POST route and align the Swagger path/schema with the runtime route.
- Preserve the existing guest cart and order behavior outside the requested group submission path.

## Repository findings

- The root guidance references `RTK.md`, but no `RTK.md` exists in the workspace.
- `homework-backend.md` contains this exact requirement in its Level 2 section.
- `dnapp/lambdas/api-handler/Services/GuestSessions/GuestSessionService.cs` owns session access, has `ValidateReservationOwnerAsync`, and has `CreateGroupOwnerSessionAsync`; the latter is not exposed by `IGuestSessionService` and has no call site.
- `dnapp/lambdas/api-handler/Repositories/GuestSessions/IGuestSessionRepository.cs` provides `GetAllByGroupReservationIdAsync`, allowing the implementation to find the `IsOwnerSession` record and aggregate all submitted sessions.
- `dnapp/lambdas/api-handler/Services/GroupReservations/GroupReservationService.cs` owns group reservation lookup and status updates; it already depends on guest-session and reservation repositories.
- `dnapp/lambdas/api-handler/Services/Orders/OrderService.cs` has existing owner authorization, active-order lookup, dish validation, order replacement, and `SubmittedByCustomer` transition in `EditPreOrderAsync` and `SubmitPreOrderAsync`. `OrderRepository` returns the active order and persists it.
- `dnapp/lambdas/api-handler/Routing/RouteRegistry.cs` registers current reservation/order routes and guest/group routes. It already registers `GET /reservations/{reservationId}/invite-token` in the guest/group route block.
- `dnapp/lambdas/api-handler/Handlers/GuestSessions/GetGroupSessionsHandler.cs` shows the existing API handler pattern for reading Cognito `sub` and mapping owner/not-found/validation exceptions.
- `swagger_src/swagger-ui/swagger-endpoints.yaml` already documents the Owner session ID endpoint but documents submit under `/guest/groups/{groupReservationId}/submit`; its `SubmitGroupPreOrderRequest` schema already contains a reservation ID.
- `deployment_resources.json` explicitly configures API Gateway resources/methods. Reviewer found neither new path registered; existing guest cart routes use `authorization_type: NONE`.
- Tests reside in `Tests/Services` and `Tests/APIHandler.Tests.csproj`. Tests will not be added or run under the active higher-priority instruction.
- Owner sessions have no session-token hash, while existing guest cart handlers use guest-token authorization and API Gateway `authorization_type: NONE`. The Owner cannot use the current guest cart routes with a Cognito token; editing/submitting the Owner cart requires a separate auth/API contract and is out of scope here.

## Assumptions and open questions

- The Owner is identified by Cognito `sub` matching `Reservation.CustomerId`, consistent with the existing owner-only group-session endpoint.
- The body `reservationId` must match the reservation referenced by `groupReservationId`; mismatches are invalid input and return 400.
- Owner-session lookup creates the record on demand when absent, so existing reservations without an owner-session row can use the endpoint.
- The user clarified that a submitted Owner session is included alongside submitted guest sessions; unsubmitted sessions remain excluded.
- The two requested Owner-facing routes use Cognito authorization in API Gateway. Do not modify current guest cart routes or add a fallback that depends on Cognito claims they do not receive.
- Existing guest-capacity logic treats the Owner as an implicit participant, so any new owner-session row must be excluded from guest counts and from the existing participants array.
- Concurrent GET requests must not create duplicate Owner sessions.
- No blocking product ambiguity remains.

## Execution order

1. [x] **Production implementation — `restaurant_lambda_implementer`.** Added the requested handlers/models, service operations, Lambda route registration, Swagger alignment, Cognito-protected API Gateway entries, conditional Owner-session creation with stable IDs and winner reload, and an Owner-session deletion guard. Removed the ineffective guest-cart Cognito fallback. Existing 6-argument `GroupReservationService` construction remains supported by an overload while production DI resolves the 7-argument constructor with `IOrderService`.
2. [x] **API handler tests — skipped.** The active developer instruction prohibits adding or running tests unless the user asks for testing or verification.
3. [x] **Service tests — skipped.** The active developer instruction prohibits adding or running tests unless the user asks for testing or verification.
4. [x] **Code review — `restaurant_backend_code_reviewer`, read-only.** The fresh review confirmed the route, concurrency, deletion, owner-count/list, and unsupported-fallback findings were resolved. One medium limitation remains: order edits/submission and group status are saved sequentially, so a failed final group save can leave the order submitted while the group is open. The parent accepted this as a documented persistence limitation; no other actionable findings remain.

## Verification

- Build command: `dotnet build backend/restaurant-backend-app/dnapp/lambdas/api-handler/APIHandler.csproj --no-restore`.
- Diff formatting command: `git diff HEAD --check` (includes staged and unstaged changes).
- Do not run test commands or add test files.
- Review evidence must cover API Gateway and Lambda route registration, Cognito identity propagation, group/reservation relationship validation, owner-session retrieval/creation and concurrency, guest-only capacity counts, exclusion of the Owner from the existing Guest participant list and guest deletion, inclusion of all submitted sessions (including submitted Owner), exclusion of unsubmitted sessions, aggregate quantities by `DishId`, order and group status transitions, and 400/401/403/404 mappings.
- Initial and post-repair API handler builds exited 0 with 0 errors and 29 warnings. Post-repair `git diff HEAD --check` exited 0. No tests were added or run.
- Implementation note: order contents/status and group status are persisted sequentially, not transactionally; a persistence failure between writes can leave partial state.
- Fresh reviewer confirmed the API Gateway routes use Cognito authorization; Owner-session creation is conditional/idempotent; Owner sessions cannot be deleted via participant deletion; guest capacity/list behavior remains guest-only; group submission still includes only submitted sessions. No tests were run.

## Completion criteria

- Both requested routes are implemented and registered with the specified request/response contracts.
- Ownership and not-found/validation conditions match the acceptance criteria.
- Aggregation and order/group status updates are implemented and reviewed. The sequential-write risk is recorded as the remaining accepted limitation.
- Build and diff-check outcomes are recorded; no test pass is claimed.
- The Owner-cart editing limitation is reported clearly; no unsupported Cognito fallback is left in guest routes without claims.
- Review repair status: API Gateway routes, conditional Owner-session creation, and Owner deletion protection are implemented; the unsupported cart fallback was removed. Fresh read-only review is complete with the sequential-write risk documented.
