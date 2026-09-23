# GitHub Workflow

> How **ANDYY-S-SITE** is version-controlled and maintained on GitHub, grounded in the repository history, `AGENTS.md`, and the remote branches already observed.

---

## 1. Repository

| Item | Detail |
|---|---|
| **Repository** | `andyydz/andyy-s-site` |
| **Visibility** | Public |
| **Primary branch** | `main` |
| **License** | MIT |
| **Contributors** | `andyydz` (the author) and `lovable-dev[bot]` (automated commits from the Lovable editor) |

---

## 2. Branching

- **`main`** is the deployed branch. Vercel builds and serves from it.
- Additional branches exist on the remote for specific integrations (for example, branches proposing Vercel Speed Insights and Vercel Web Analytics installs). These are **not merged into `main`**, and correspond to open pull requests on the repository.
- No branching model (e.g. GitFlow) is documented in the repository. Work happens directly on `main`, supplemented by occasional feature branches tied to specific pull requests.

---

## 3. Commit History

- Commits come from two sources: the author (`andyydz`) working directly or through an editor, and `lovable-dev[bot]`, which commits automatically when changes are made through the Lovable editor.
- **`AGENTS.md` explicitly asks that published Git history not be rewritten**, because the repository remains connected to the Lovable platform, which relies on a consistent commit history to stay in sync. This rules out force-pushes, history rebasing, or squash-rewriting of already-pushed commits.

---

## 4. Pull Requests

The repository has an active pull request workflow: at the time of documentation, **2 open pull requests** existed, corresponding to the unmerged Vercel integration branches. Pull requests are used to propose and review changes such as third-party service installs before they reach `main`.

---

## 5. Continuous Integration / Continuous Deployment

- **No GitHub Actions workflows** are defined in the repository (no `.github/` directory).
- **No `vercel.json`** exists to declare custom build behavior for Vercel.
- Deployment is triggered by Vercel's own GitHub integration: pushes to `main` build and publish to production, and other branches can produce preview deployments. This is configured on Vercel's side, not in repository code.
- There is no separate lint/test CI gate; `npm run lint` and `npm run format` are available as local developer commands only.

---

## 6. Working with the Repository

Recommended flow for making a change:

1. Clone or open the repository (directly, or through the Lovable editor).
2. Make changes on `main` or a feature branch.
3. Run `npm run lint` and `npm run format` locally before committing.
4. Commit with a descriptive message. Avoid amending or rebasing commits that have already been pushed, per `AGENTS.md`.
5. Push to GitHub. If working on a feature branch, open a pull request against `main`.
6. Vercel automatically builds the pushed branch; `main` deploys to production, other branches can produce a preview deployment.

---

## 7. Coexistence with Lovable

Because the project was initially built in Lovable and remains connected to it, some care applies:

- Edits made through the Lovable editor push commits authored by `lovable-dev[bot]` directly to the connected branch.
- Edits made outside Lovable (local development, another editor) should avoid destructive Git operations that could desynchronize the Lovable project state from GitHub.
- The `.lovable/` directory (including its `project.json` and `plan/` notes) is version-controlled alongside the application code and should not be deleted casually, as Lovable uses it to track project state.

---

## 8. Summary

The workflow is a **lightweight, GitHub-hosted, Vercel-deployed** setup: a public repository on `main`, contributions from both the author and the Lovable bot, pull requests for larger or third-party integrations, and no custom CI/CD pipeline beyond Vercel's own Git integration. The one hard rule, driven by the Lovable connection, is to avoid rewriting published history.
