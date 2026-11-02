# Team Rules

These rules keep the frontend and backend agents independent while ensuring
that `main` remains usable.

1. Each developer works only in their assigned branch and worktree:
   `frontend` in `D:\arc-team-worktrees\frontend`, or `backend` in
   `D:\arc-team-worktrees\backend`.
2. Every meaningful feature or fix should have a separate, focused commit.
3. Commit messages should use Conventional Commits, for example
   `feat(web): add task list` or `fix(api): handle missing task`.
4. Developers must run the relevant tests and checks before pushing.
5. API contract changes must be communicated to the other developer before
   implementation begins. Update `docs/api-contracts.md` when the contract
   changes.
6. No developer should push feature work directly into `main`.
7. Pull requests or reviewed local merges should be used to integrate changes.
8. `main` should contain integrated and verified code only.
9. Frontend agents must not modify backend implementation files.
10. Backend agents must not modify frontend implementation files.
11. Both agents must respect `docs/api-contracts.md`.
