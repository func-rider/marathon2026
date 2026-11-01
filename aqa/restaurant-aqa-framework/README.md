# Restaurant AQA framework

End-to-end tests for the Green & Tasty restaurant application: Reqnroll (Gherkin) + TUnit + Playwright for .NET, with the Screenplay pattern.

Guidance for extending the suite (writing Gherkin, steps, Screenplay, test data, working with an AI assistant) is in [CLAUDE.md](CLAUDE.md).

## Current assignment coverage: Direction 1, Levels 1 and 2

[`Features/GroupPreOrder.feature`](Features/GroupPreOrder.feature) covers Owner review and confirmation of group pre-orders. Level 1 `@ui` scenarios check participant cards, dishes, quantities, cart states, subtotals, and the empty-group state; `@api` scenarios check participant totals, cart updates, empty groups, Owner-only access, and missing groups. Level 2 covers Owner UI confirmation, merging repeated submitted dishes, excluding unsubmitted carts, the order and group statuses, the waiter's API and UI view of the final order, and reachable submission errors. For the waiter UI case, the waiter creates the reservation on behalf of the Owner through the supported reservation flow so that the test waiter is assigned and can open the order from its reservation card. Group review requires a configured `WAITER_USERNAME` / `WAITER_PASSWORD` to seed and clean up its location, table, and dish.

The UI case where an unsubmitted cart should contribute to the group total is marked `@known-defect`: the current Owner page calculates its displayed total from submitted carts only. The framework deletes guest sessions, cancels the reservation, and removes the seeded location, table, and dish after each scenario. Cancellation closes the group reservation but does not delete its record. The API also has no delete operation for Cognito customer accounts or Owner sessions, so these remaining records use unique `AQA-Sample-` data and cannot currently be removed by the suite.

Level 2 creates an initial order through the supported customer order API only in scenarios that need a successful group submission, then cancels that order during cleanup. The `Order not found` case is covered by submitting a reservation-backed group before creating an order. Two requested failure states cannot be seeded through the public contract: an already-submitted empty cart (the guest submit endpoint rejects an empty cart with `The cart is empty`) and a missing parent reservation (public reservation cancellation retains the reservation and group records). Owner-added items are blocked: the Owner session has no guest-session token hash and the guest dish endpoint requires such a token. The Owner page fetches the Owner session ID but the group-session response omits Owner sessions, so it renders no Owner card or “Edit my Pre-Order” button; the button in the card template is disabled if an Owner card is ever supplied. Since the current page exposes no Owner card, AQA cannot robustly assert the edit affordance as a UI known-defect scenario. Group-not-found is covered because a non-existent group ID can be requested directly. No fabricated routes or authorization bypasses were added.

## Run the tests

```bash
cp .env.example .env        # then fill in your own values (see "Configuration")
dotnet build
dotnet run --no-build -- --report-trx                          # everything
dotnet run --no-build -- --treenode-filter "/*/*/*/*[Category=smoke]"   # by tag
dotnet run --no-build -- --treenode-filter "/*/*/*/*[Category=level-1]" # group pre-order Level 1
dotnet run --no-build -- --treenode-filter "/*/*/*/*[Category=level-2]" # group pre-order Level 2
dotnet run --no-build -- --treenode-filter "/*/*/*/*[Category=api]"     # API scenarios
dotnet run --no-build -- --treenode-filter "/*/*/*/*[Category=ui]"      # UI scenarios
```

Everything a run produces lands in `TestResults/`: the TUnit report and TRX, the Reqnroll report in `reqnroll/`, and Playwright traces in `traces/` (open one with `npx playwright show-trace <file>.zip`).

Some scenarios are expected to fail (`@known-defect`, bugs in the application) or are skipped (`@wip`, no admin account configured). That is intentional.

## Quality gates

| Where | What runs |
|---|---|
| Git hooks (local) | `pre-commit`: `dotnet format` check and Gherkin lint on staged files · `commit-msg`: Conventional Commits · `pre-push`: build with analyzers |
| `aqa-quality.yml` | on every push and pull request: no generated files tracked, format, build (warnings are errors), Gherkin lint, test discovery |
| `aqa-tests.yml` | the scenarios themselves, nightly and on demand (Actions → AQA Tests → Run workflow) |

Enable the hooks once per clone, from the repository root:

```bash
dotnet tool restore --tool-manifest aqa/restaurant-aqa-framework/.config/dotnet-tools.json
git config core.hooksPath aqa/restaurant-aqa-framework/.husky
```

The hooks only act on commits and pushes that touch `aqa/restaurant-aqa-framework`. Gherkin lint needs Node.js.

## Configuration

There is no shared environment and no committed `.env`: copy `.env.example` to `.env` and fill it in with the data of **your own** deployment (see "Testing your own deployment"). `.env` is git-ignored; never commit it.

Settings come from `.env` or real environment variables (variables win):

| Setting | Meaning |
|---|---|
| `UI_URL` | where the frontend is served |
| `API_URL` | base URL of the backend API, including the stage (for example `…/develop`) |
| `WAITER_USERNAME`, `WAITER_PASSWORD` | a waiter account that already exists in the environment under test |
| `TESTTABLE_ID`, `TESTTABLE_WAITER_*` | a table and the waiter assigned to it (only for scenarios that need them) |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | an admin account; without it the admin scenarios are skipped |

The full list, with defaults, is in `.env.example`.

## Testing your own deployment

### If you deployed the backend / frontend / DevOps homework

1. `cp .env.example .env` and set `UI_URL` and `API_URL` to your deployment (API URL includes the stage, for example `…/develop`).
2. Waiters cannot be created by signing up, so create a waiter (and, for the admin scenarios, an admin) in *your* environment and put its credentials in `WAITER_*` / `ADMIN_*`. Optionally add a table and its assigned waiter (`TESTTABLE_*`).
3. Run `dotnet build` and a small slice first (`--treenode-filter "/*/*/*/*[Category=smoke]"`).

### If you have not deployed your own homework

If you deployed the original application, test that: set `UI_URL` / `API_URL` as above. Otherwise point the framework at a comparable public site (Booking, Airbnb, OpenTable, …) and write all the layers for it yourself: Gherkin features, step definitions, Screenplay tasks and questions, page objects with locators, and API clients where the site has a usable API. Use only flows you are allowed to automate (no purchases, no real bookings, respect the site's terms), and set `UI_URL` to that site.

1. **Generate a skeleton with Playwright codegen** (see "Presetup instructions"): record one flow, for example search → open a result → check details. Save the generated code to a scratch file, it is only raw material.
2. **Split it across the layers**: locators and small actions go to `Ui/` page objects, the flow becomes a task in `Screenplay/Tasks/`, the read-backs become questions in `Screenplay/Questions/`, the business wording goes to `Features/` and thin glue to `StepDefinitions/`.
3. **Replace weak locators.** Codegen often emits positional or text-fragile selectors. Prefer role + accessible name, label, test id, then CSS (see [CLAUDE.md](CLAUDE.md)); check them in the Playwright inspector.
4. Tag scenarios `@ui` / `@api`, keep them independent, and run `npx gherkin-lint -c .gherkin-lintrc "Features/*.feature"`.

### CI on your own public repository

Publish your work in your own public Git repository (the link is the deliverable). Workflows are disabled in a fresh fork until you enable them. Add the same values under Settings → Secrets and variables → Actions:

- **Variables:** `AQA_UI_URL`, `AQA_API_URL`, `AQA_TESTTABLE_ID`
- **Secrets:** `AQA_WAITER_USERNAME`, `AQA_WAITER_PASSWORD`, `AQA_ADMIN_USERNAME`, `AQA_ADMIN_PASSWORD`, `AQA_TESTTABLE_WAITER_USERNAME`, `AQA_TESTTABLE_WAITER_PASSWORD`

`aqa-quality.yml` runs on every push and pull request; `aqa-tests.yml` (nightly and on demand) tests whatever those variables point at. Never put credentials in the repository, in `.env.example` or in test code.

## Presetup instructions

This framework contains PlaywriteInstaller script so you don't need to setup it manually.
For full BDD highlighting in your IDE you may need to install Reqnroll extension https://docs.reqnroll.net/latest/ide-integrations/index.html
To start the Playwright code generator open Powershell in the framework directory and enter the line:
```bash
bin/Debug/net10.0/playwright.ps1 codegen "<your UI_URL or the public site you test>"
```
Build first so `playwright.ps1` exists. The URL is optional.
