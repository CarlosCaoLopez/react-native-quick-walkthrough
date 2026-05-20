# Contributing

Thank you so much for taking the time to read this. It genuinely means a lot that you are here considering contributing to `react-native-walkthrough`.

Before you start, please read our [Code of Conduct](./CODE_OF_CONDUCT.md). We want this space to be welcoming for everyone.

---

## Review Timeline

Fair warning: the maintainer is a student. Reviews may take **1–2 weeks**. If you open a pull request and do not hear back in 2 weeks, feel free to ping the thread — it helps.

---

## Setup

This project is a [Yarn workspaces](https://yarnpkg.com/features/workspaces) monorepo. It contains:

- The library in the root directory
- An example Expo app in `example/`

You need the Node version specified in [`.nvmrc`](./.nvmrc). With `nvm`:

```sh
nvm use
```

Install all dependencies:

```sh
yarn
```

The example app is wired to the library source via `react-native-monorepo-config`, so changes to `src/` are reflected immediately without a rebuild.

---

## Development Workflow

Start the Metro bundler for the example app:

```sh
yarn example start
```

Run the example on Android:

```sh
yarn example android
```

Run the example on iOS:

```sh
yarn example ios
```

Run the example on Web:

```sh
yarn example web
```

Type-check the library:

```sh
yarn typecheck
```

Lint and auto-fix:

```sh
yarn lint --fix
```

Run tests:

```sh
yarn test
```

Build the library (output goes to `lib/` — never edit `lib/` manually):

```sh
yarn prepare
```

---

## Coding Standards

- TypeScript strict mode is enforced
- ESLint + Prettier handle formatting — run `yarn lint --fix` before committing
- No `any` types without a comment explaining why
- No mutations of Zustand state outside store actions

---

## Tests

Add tests for any new behaviour. The test suite runs with Jest:

```sh
yarn test
yarn test --testPathPattern=<name>   # single file
```

Tests live in `src/engine/__tests__/`, `src/store/__tests__/`, and `src/__tests__/`.

---

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Pre-commit hooks (via lefthook + commitlint) enforce this automatically.

```
<type>(<optional scope>): <description>
```

**Types:**

| Type       | When to use                               |
| ---------- | ----------------------------------------- |
| `feat`     | New feature visible to consumers          |
| `fix`      | Bug fix                                   |
| `refactor` | Internal restructure, no behaviour change |
| `perf`     | Performance improvement                   |
| `style`    | Formatting/whitespace only                |
| `test`     | Add or fix tests                          |
| `docs`     | Documentation only                        |
| `build`    | Build system, deps, version bump          |
| `chore`    | Housekeeping (init, .gitignore, etc.)     |

**Rules:**

- Description: imperative present tense, lowercase first letter, no trailing period
- Breaking change: add `!` before `:` (e.g. `feat(api)!: remove step field`) AND `BREAKING CHANGE:` in the footer
- Scope: optional, lowercase (e.g. `engine`, `overlay`, `registry`, `adapters`)

**Examples:**

```
feat(engine): add timeout option to waitFor
fix(overlay): prevent spotlight flicker on Android rotation
docs: add React Navigation adapter usage example
```

---

## DCO Sign-Off

All commits must include a `Signed-off-by` line certifying that you have the right to submit the contribution under the project's license. See [DCO](./DCO) for the full text.

Add it automatically with:

```sh
git commit -s -m "feat: your message here"
```

Or configure Git to always add it:

```sh
git config --global format.signOff true
```

Pull requests without DCO sign-off will not be merged.

---

## Pull Request Process

1. Fork the repository and create a branch from `main` with a descriptive name:
   ```sh
   git checkout -b feat/multi-screen-tour
   ```
2. Make your changes. Keep pull requests focused — one concern per PR.
3. Ensure all checks pass locally (`yarn typecheck`, `yarn lint`, `yarn test`)
4. Open a pull request using the [PR template](./.github/pull_request_template.md)
5. At least **1 maintainer approval** is required before merging
6. For API changes or new features, open an issue to discuss before coding — saves everyone time

---

## Definition of Done

A pull request is ready to merge when:

- [ ] CI passes (lint, typecheck, test, build)
- [ ] At least 1 maintainer has approved
- [ ] All commits have a DCO sign-off
- [ ] The CHANGELOG entry is added (for `feat` and `fix` PRs)
- [ ] Public API changes are reflected in README.md
- [ ] No unresolved review comments

---

## Publishing to npm

Releases are cut by the maintainer using [release-it](https://github.com/release-it/release-it):

```sh
yarn release
```

This bumps the version, creates a Git tag, and publishes to npm.

---

## Scripts Reference

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `yarn`                 | Install all dependencies                   |
| `yarn typecheck`       | TypeScript strict check                    |
| `yarn lint`            | ESLint + Prettier check                    |
| `yarn lint --fix`      | ESLint + Prettier auto-fix                 |
| `yarn test`            | Jest unit tests                            |
| `yarn prepare`         | Build `lib/` with react-native-builder-bob |
| `yarn clean`           | Remove `lib/` build output                 |
| `yarn example start`   | Metro bundler for example app              |
| `yarn example android` | Run example on Android                     |
| `yarn example ios`     | Run example on iOS                         |
| `yarn example web`     | Run example on Web                         |
| `yarn release`         | Cut a new npm release                      |
