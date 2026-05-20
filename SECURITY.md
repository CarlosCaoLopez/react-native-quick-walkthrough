# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.** We use coordinated disclosure.

### Option 1 — GitHub Private Security Advisory (preferred)

Use GitHub's built-in private reporting:
[https://github.com/CarlosCaoLopez/react-native-quick-walkthrough/security/advisories/new](https://github.com/CarlosCaoLopez/react-native-quick-walkthrough/security/advisories/new)

### Option 2 — Email

Send a report to **caolopezcarlos@gmail.com** with:

- A description of the vulnerability
- Steps to reproduce (minimal reproduction preferred)
- Potential impact assessment
- Any suggested fixes (optional)

## Response SLA

| Milestone                                      | Target                                 |
| ---------------------------------------------- | -------------------------------------- |
| Acknowledge receipt                            | ≤ 72 hours                             |
| Status update (triaged / confirmed / rejected) | ≤ 14 days                              |
| Patch available (if confirmed)                 | Best effort; coordinated with reporter |

## Disclosure Policy

We follow **coordinated disclosure**:

1. Reporter submits privately
2. We triage and confirm the issue
3. We develop and test a patch
4. We release the patch and publish a GitHub Security Advisory simultaneously
5. Reporter may publish their own write-up after the advisory is public

We will not take legal action against researchers acting in good faith under this policy.

## Known Limitations

`react-native-quick-walkthrough` is a pure UI library. It:

- Does not handle authentication or authorization
- Does not store or transmit user data
- Does not perform network requests
- Does not process sensitive input

The attack surface is limited to rendering logic (Skia canvas, Reanimated animations) and the navigation adapter integration. The most plausible security concerns are denial-of-service through malformed tour definitions or overlay rendering bugs.

## CRA / Non-Commercial Declaration

This software is provided free of charge and is developed as a non-commercial open source project. Under the EU Cyber Resilience Act (CRA), free and open source software developed outside a commercial activity is exempt from manufacturer obligations. This declaration does not waive our commitment to responsible security practices.

## Software Warranty Disclaimer

This software is provided "AS IS", without warranty of any kind. See the full [MIT License](./LICENSE) for details.
