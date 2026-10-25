# Security Policy

## Supported versions

Wireflow is under active development and has not yet reached a stable 1.0 release. Security fixes are applied to the latest code on `main` and released as soon as practical.

| Version | Supported |
| --- | --- |
| `main` (latest) | ✅ |
| Older commits / forks | ❌ |

Once tagged releases exist, this table will list which release lines receive security updates.

## Reporting a vulnerability

**Please do not report security vulnerabilities through public issues, pull requests, or discussions.**

Report them privately using GitHub's private vulnerability reporting:

👉 **[Report a vulnerability](https://github.com/Thejus26/wireflow/security/advisories/new)**

(Repository → **Security** tab → **Report a vulnerability**.)

Please include as much of the following as you can:

- A description of the vulnerability and its potential impact
- Steps to reproduce, ideally with a minimal proof of concept (for example, a crafted chip/netlist JSON or YAML file)
- The affected version, commit, browser, and OS
- Any suggested fix or mitigation

## What to expect

This is a maintainer-run project, so these are targets rather than guarantees:

| Step | Target |
| --- | --- |
| Acknowledge your report | within 3 business days |
| Initial assessment and severity triage | within 7 days |
| Fix or mitigation plan | shared as soon as the issue is confirmed |
| Public disclosure | after a fix is available, coordinated with you |

We'll keep you updated as the report moves through triage and fixing, and will credit you in the advisory and release notes if you'd like (let us know how you'd like to be credited, or if you prefer to stay anonymous).

## Scope

Wireflow runs in the browser and processes user-supplied diagram data, so issues of particular interest include:

- Cross-site scripting (XSS) or script injection via imported JSON/YAML definitions, labels, or pin names
- Injection or unsafe content in exported files (SVG, PDF, SPICE netlists, JSON)
- Prototype pollution or unsafe deserialization in file/DSL parsers
- Denial of service from crafted input (for example, pathological files that hang the router or parser)
- Vulnerable or malicious dependencies, or supply-chain issues in the build/release pipeline
- Leaking of sensitive data via the app, logs, or CI configuration

Out of scope:

- Findings that require a compromised browser, device, or user account
- Social engineering, physical attacks, or attacks on GitHub itself
- Missing security headers or best-practice suggestions with no demonstrable impact
- Automated scanner output without a working proof of concept
- Vulnerabilities in third-party dependencies that don't affect Wireflow — please report those upstream

## Safe harbor

We support good-faith security research. If you follow this policy, make a good-faith effort to avoid privacy violations, data destruction, and service disruption, and give us reasonable time to respond before any public disclosure, we will not pursue or support legal action against you.

## Dependency vulnerabilities

If you notice a known vulnerability in one of Wireflow's dependencies (for example from `npm audit` or Dependabot), a regular issue or pull request that bumps the dependency is fine, provided exploiting it against Wireflow isn't practical. If it is, please use the private reporting link above.
