# Restaurant Frontend Implementation Orchestration Plan

**Goal:** Turn each user-approved frontend request into a traceable task plan, implement it in the Angular app, and verify it through focused requirements and code reviews.

**Architecture:** The orchestrator captures acceptance criteria, inspects current behavior, and writes a task-specific plan before delegating. The frontend implementer owns production and test changes. The homework reviewer checks assignment fidelity when applicable, followed by the read-only frontend code reviewer. The orchestrator records evidence and routes actionable findings through a serial repair loop.

**Tech Stack:** Codex custom agents (`.codex/agents/*.toml`), Angular 22, strict TypeScript, SCSS, Karma, and Jasmine.

## Global constraints

- The user's current request controls scope; homework documents describe product requirements but do not override it.
- Application changes stay within `frontend/restaurant-frontend-app` unless the user specifies otherwise.
- Read and follow the app's `CLAUDE.md`; do not apply target-state migrations outside their owning task.
- Do not add dependencies without explicit approval. Do not commit, push, deploy, use cloud credentials, or make external changes unless explicitly requested.
- Delegate serially to named roles. Review agents are read-only.

## Per-request plan

Before delegation, create `.codex/plans/YYYY-MM-DD-<requirement-slug>-implementation-plan.md` unless the user chooses another path. Include:

1. Goal, scope, and non-goals.
2. Observable acceptance criteria and which homework requirements apply.
3. Relevant app and API files/symbols found, separating existing behavior from gaps.
4. Applicable design references, including the linked Figma frame when the requested UI corresponds to it.
5. Assumptions and material open questions.
6. Delegation phases and handoff evidence.
7. Required verification commands and completion criteria.

Use discovered paths and concrete steps. Do not leave placeholders. Update task checkboxes and outcomes after each phase.

## Delegation sequence

### Phase 1 — Frontend implementation

Delegate to `restaurant_frontend_implementer` with the plan and acceptance criteria. Ask it to inspect current behavior first, implement only the requested gap, add or update focused tests, and return changed files and observed verification results.

### Phase 2 — Homework accuracy review

When the request implements requirements from `homework-frontend.md`, delegate to `restaurant_frontend_homework_reviewer` after implementation. Pass the relevant assignment level, criteria, implementation handoff, and changed files. The reviewer checks the UI-to-API path and reports only actionable requirement gaps. If no homework requirements apply, record this phase as not applicable with a reason.

### Phase 3 — General code review

Delegate to `restaurant_frontend_code_reviewer` after the homework review or its documented skip. Pass the complete plan, acceptance criteria, implementation and homework-review handoffs, and changed-file set. The reviewer reports concrete correctness, accessibility, API, and regression findings without modifying files.

## Repair loop

- Route implementation or review defects to `restaurant_frontend_implementer` with exact evidence and request a focused fix.
- After a fix, repeat the homework review if its requirements apply, then request a fresh code review. Rerun affected verification after implementation changes.
- Record exact command output for verification. If an environment issue blocks a command, continue independent review where useful and report the limitation without claiming success.
- Stop for user input only when a material ambiguity, conflicting requirement, or unavailable named agent blocks safe continuation.

## Final handoff

Report the task-plan path, completed and remaining criteria, changed files, all phase results, exact verification commands and observed outcomes, review findings, assumptions, and blockers. Leave plan checkboxes accurate. Do not claim completion while required phases or actionable findings remain.
