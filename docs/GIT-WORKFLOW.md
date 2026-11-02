# Git Workflow

This project uses Git and GitHub to make parallel development safe and easy to
review.

## Git and GitHub

Git records changes to files on your computer. It lets you create commits,
compare versions, and work on separate lines of development. GitHub stores the
shared repository online so the team can exchange branches and review changes.

## Branches

A branch is a named line of development. This project uses:

- `main`: the integrated, verified project.
- `frontend`: frontend implementation work.
- `backend`: backend implementation work.

Agents should do feature work on their assigned branch, not directly on `main`.

## Worktrees

A Git worktree is another folder connected to the same local repository. Each
worktree can have a different branch checked out, without making extra clones.
The configured folders are:

```text
D:\arc-team-practice                 main
D:\arc-team-worktrees\frontend       frontend
D:\arc-team-worktrees\backend        backend
```

Open the workspaces in VS Code:

```powershell
code D:\arc-team-practice
code D:\arc-team-worktrees\frontend
code D:\arc-team-worktrees\backend
```

Open each folder in a separate VS Code window if both agents work at the same
time.

## Frontend workflow

Use the frontend worktree:

```powershell
cd D:\arc-team-worktrees\frontend
git status
git switch frontend
# make and test frontend changes
git add apps\web docs\api-contracts.md
git commit -m "feat(web): describe the change"
git push origin frontend
```

Only stage files that belong to the change. Do not modify backend
implementation files from this workspace.

## Backend workflow

Use the backend worktree:

```powershell
cd D:\arc-team-worktrees\backend
git status
git switch backend
# make and test backend changes
git add apps\api docs\api-contracts.md
git commit -m "feat(api): describe the change"
git push origin backend
```

Only stage files that belong to the change. Do not modify frontend
implementation files from this workspace.

## Pulling the latest `main`

Fetch the latest remote references first:

```powershell
git fetch origin
```

To update the local `main` branch, use the main worktree:

```powershell
cd D:\arc-team-practice
git switch main
git pull --ff-only origin main
```

To bring those updates into a feature branch, run the following in that
branch's worktree:

```powershell
git fetch origin
git merge origin/main
```

Resolve any conflicts before continuing.

## Merging branches into `main`

Feature branches should be reviewed and tested before merging. A local merge
can be performed from the main worktree:

```powershell
cd D:\arc-team-practice
git switch main
git pull --ff-only origin main
git merge --no-ff origin/frontend
git merge --no-ff origin/backend
# run the full project checks
git push origin main
```

If the team uses a GitHub pull request instead, open one from `frontend` or
`backend` into `main`, review it, run checks, and merge it on GitHub. Do not
push feature work directly into `main`.

## Resolving merge conflicts

1. Run `git status` to see the conflicted files.
2. Open each file and choose the correct parts. Conflict markers look like
   `<<<<<<<`, `=======`, and `>>>>>>>`.
3. Remove the markers and test the result.
4. Stage each resolved file:

   ```powershell
   git add path\to\resolved-file
   ```

5. Finish the merge:

   ```powershell
   git commit
   ```

To cancel an unfinished merge without keeping its changes:

```powershell
git merge --abort
```

Ask the other developer before resolving conflicts that change the API
contract.

## Verify the current branch

Run these commands from any worktree:

```powershell
git branch --show-current
git status --short --branch
git worktree list
```

The branch shown by `git branch --show-current` must match the workspace you
intend to edit.

## Common commands

| Command | Purpose |
| --- | --- |
| `git status` | Show changed files and the current branch |
| `git log --oneline -5` | Show the five newest commits |
| `git diff` | Review unstaged changes |
| `git diff --cached` | Review staged changes |
| `git add path\to\file` | Stage a specific file |
| `git commit -m "fix(api): validate task input"` | Create a commit |
| `git fetch origin` | Download remote branch updates |
| `git pull --ff-only` | Update without creating an accidental merge |
| `git push origin frontend` | Push the frontend branch |
| `git push origin backend` | Push the backend branch |
| `git switch branch-name` | Switch branches when that branch is not in another worktree |
| `git restore path\to\file` | Discard an unstaged file change; use carefully |

Frontend agents must not modify backend implementation files. Backend agents
must not modify frontend implementation files. Both agents must respect
[`docs/api-contracts.md`](api-contracts.md).
