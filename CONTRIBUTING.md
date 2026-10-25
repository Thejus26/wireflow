# Contributing to Wireflow

Thanks for your interest in improving Wireflow! Contributions from developers, hardware engineers, technical writers, educators, and designers are all welcome — you don't need to be an EDA expert to help.

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of contents

- [Ways to contribute](#ways-to-contribute)
- [Before you start](#before-you-start)
- [Development setup](#development-setup)
- [Making a change](#making-a-change)
- [Commit messages](#commit-messages)
- [Pull requests](#pull-requests)
- [Contributing components and footprints](#contributing-components-and-footprints)
- [Reporting bugs and requesting features](#reporting-bugs-and-requesting-features)
- [Security issues](#security-issues)
- [Licensing](#licensing)

## Ways to contribute

- Report bugs and document edge cases
- Add or refine IC packages, footprints, and pin definitions
- Improve routing, ERC (electrical rules check), and export behavior
- Polish the editor UX and accessibility
- Improve documentation, examples, and tutorials
- Review pull requests and help triage issues

Issues labeled `good first issue` or `help wanted` are good places to start.

## Before you start

1. Search the [open issues](https://github.com/Thejus26/wireflow/issues) and [pull requests](https://github.com/Thejus26/wireflow/pulls) to avoid duplicating work.
2. For anything larger than a small fix, open an issue (or comment on an existing one) **before** writing code, so the approach can be agreed on first. This saves everyone time.
3. Keep the scope tight. Small, focused changes are reviewed and merged much faster than large ones.

## Development setup

**Prerequisites:** [Node.js](https://nodejs.org/) 18 or later, and `npm`, `pnpm`, or `yarn`.

```bash
# Fork the repo on GitHub first, then:
git clone https://github.com/<your-username>/wireflow.git
cd wireflow
git remote add upstream https://github.com/Thejus26/wireflow.git

npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

Keep your fork current before starting new work:

```bash
git fetch upstream
git switch main
git merge --ff-only upstream/main
```

## Making a change

1. Create a branch from an up-to-date `main`. Use a short, descriptive name with a prefix:
   `feature/qfn-32-package`, `fix/router-diagonal-segments`, `docs/export-guide`.
2. Make your change, following the standards below.
3. Run the project's checks (lint, type-check, and tests — see the scripts in `package.json`) and confirm they pass.
4. Manually verify the behavior you changed in the browser. For canvas and editor changes, include before/after screenshots or a short recording in your PR.

### Coding standards

- Write readable, well-structured TypeScript and React. Avoid `any`; prefer precise types.
- Follow the existing naming, file layout, and component patterns.
- Keep geometry/routing logic separate from rendering and UI state.
- Add or update tests when behavior changes, especially for routing, ERC rules, and parsers.
- Comment the *why* for non-obvious logic; don't narrate the obvious.
- Don't mix unrelated refactors or formatting churn into a feature or fix.

### UI and accessibility

- Keep keyboard and pointer interactions working for new tools and controls.
- Maintain sufficient color contrast, and don't rely on color alone to convey pin types or ERC results.
- Avoid visual regressions on the canvas; check zoom, pan, and grid-snapping still behave.
- Keep new features understandable to people who aren't EDA experts.

### Documentation

- Update the README or relevant docs when behavior, setup, or file formats change.
- Add a short example for any new user-facing feature.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/) so history stays readable:

```
<type>(<optional scope>): <short summary in the imperative>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `chore`.

```
feat(packages): add QFN-32 footprint
fix(router): avoid overlapping wires on shared pins
docs: document the chip JSON schema
```

Keep the summary under ~72 characters and explain *why* in the body when it isn't obvious.

## Pull requests

1. Push your branch to your fork and open a PR against `main`.
2. Fill in the [pull request template](.github/pull_request_template.md) — link the related issue (`Closes #123`), explain the motivation, and describe how you tested.
3. Keep PRs small and self-contained. If a PR grows, consider splitting it.
4. Mark work-in-progress PRs as **Draft** until they're ready for review.
5. Respond to review feedback with follow-up commits; maintainers may squash on merge.

A PR is ready to merge when:

- [ ] It is scoped to one logical change
- [ ] Checks pass and new behavior is tested
- [ ] Documentation and examples are updated where relevant
- [ ] It includes no unrelated files, generated output, or secrets
- [ ] Review feedback has been addressed

Maintainers aim to give a first response within a few days. If you haven't heard back after a week, a polite ping on the PR is welcome.

## Contributing components and footprints

Chip and package definitions follow the format described in the README's [Component Definition Format](README.md#-component-definition-format). When adding one:

- Base pin names, numbers, and functions on the manufacturer's **official datasheet**, and link it in the PR.
- Use only the supported pin types (`input`, `output`, `power`, `ground`, `input_pullup`, `analog_input`, `open_collector`, and so on — check the schema for the current list).
- Double-check pin numbering and orientation; a wrong pinout is worse than a missing one.
- Don't copy copyrighted datasheet artwork or vendor symbol libraries. Describe the pinout in your own definition.

## Reporting bugs and requesting features

Use the [issue forms](https://github.com/Thejus26/wireflow/issues/new/choose):

- **Bug report** — include reproduction steps, expected vs. actual behavior, and your environment (OS, browser, Node version, app version or commit). A minimal chip/netlist JSON that triggers the problem is extremely helpful.
- **Feature request** — describe the problem you're solving, not just the solution you have in mind.
- **Component request** — name the part, package, and a datasheet link.

For general questions, see [SUPPORT.md](SUPPORT.md).

## Security issues

**Do not open public issues for security vulnerabilities.** Follow the private reporting process in [SECURITY.md](SECURITY.md).

## Licensing

Wireflow is released under the [MIT License](LICENSE). By submitting a contribution, you agree that it will be licensed under the same terms, and you confirm that you have the right to submit it.

---

Thank you for helping make Wireflow better. 💙
