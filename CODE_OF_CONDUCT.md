# Contributing to Wireflow

Thanks for your interest in improving Wireflow. We welcome contributions from developers, hardware enthusiasts, technical writers, and designers.

This project is meant to stay approachable, maintainable, and friendly to contributors. Please help us keep that standard high by following the guidelines below.

## Ways to contribute

You can contribute by:

- reporting bugs and documenting edge cases
- improving documentation and examples
- designing or refining component packages and footprints
- enhancing routing logic and editor UX
- fixing issues and submitting pull requests
- reviewing pull requests and suggesting improvements

## Code of conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to creating a respectful, inclusive, and productive community.

## Before you start

1. Check the open issues and pull requests to avoid duplicating work.
2. If you want to work on a feature, open or comment on an issue first so the direction stays aligned with the project.
3. Keep scope focused. Small, well-tested changes are easier to review and merge.

## Development setup

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Local setup

```bash
git clone https://github.com/Thejus26/wireflow.git
cd wireflow
npm install
npm run dev
```

## Project expectations

### Coding standards

- Prefer readable, well-structured TypeScript and React code.
- Keep changes focused and avoid unrelated refactors in the same pull request.
- Add or update tests when behavior changes.
- Follow existing naming patterns and component architecture.
- Document non-obvious logic or design decisions when needed.

### UI and behavior

- Preserve keyboard and pointer accessibility where feasible.
- Keep interactions intuitive and predictable.
- Avoid introducing visual regressions in the canvas or editor UI.
- Ensure new features remain understandable for users who are not experts in EDA tools.

### Documentation

- Update README or relevant docs when behavior or setup changes.
- Add examples or concise notes for new features when necessary.

## Pull request workflow

1. Fork the repository and create a feature branch.
2. Make a focused change with clear commit messages.
3. Run local checks and verify the behavior you changed.
4. Open a pull request with a clear summary, motivation, and testing notes.
5. Be open to feedback and revise as needed.

### Pull request checklist

- The change is scoped and understandable.
- The description explains the problem and solution.
- Relevant documentation or examples were updated.
- The code follows the project conventions.
- No unrelated files or churn were included.

## Issue reporting

When reporting a bug, please include:

- a short, descriptive title
- reproduction steps
- expected behavior
- actual behavior
- screenshots or recordings when useful
- environment details such as browser, OS, and Node version

For feature ideas or roadmap discussions, open a feature request or start a discussion with clear context about the use case.

## Security concerns

Please do not open public issues for security vulnerabilities. Follow the instructions in [SECURITY.md](SECURITY.md).

## Recognition

Contributors are appreciated for the time and care they invest in improving the project. We value thoughtful changes, helpful review feedback, and constructive discussions.

Thank you for helping make Wireflow better.
