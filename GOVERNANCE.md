# Governance

## Maintainers

| Name       | Role            | Contact                  |
| ---------- | --------------- | ------------------------ |
| Carlos Cao | Lead Maintainer | caolopezcarlos@gmail.com |

## Roles

**Lead Maintainer** — reviews and merges pull requests, cuts releases, manages GitHub repository settings, and sets project direction.

**Contributor** — anyone who opens issues, submits pull requests, or participates in discussions. Contributors do not have write access to the repository.

## Decision-Making

### Daily Decisions

Any single maintainer may act unilaterally on:

- Merging pull requests that pass CI and review
- Closing stale issues
- Dependency version bumps (non-breaking)
- Documentation fixes

### Significant Decisions

The following require agreement from at least **2 maintainers** (or unanimous agreement when there is only 1 active maintainer):

- Adding or removing a peer dependency
- Introducing a breaking API change
- Cutting a new release (any version)
- Changing the project license
- Modifying this governance document

When the project has a single maintainer, that maintainer acts as the quorum for significant decisions, but must document the rationale publicly (in the relevant issue, PR, or a CHANGELOG entry).

### Conflict Resolution

1. Discuss openly in the relevant GitHub issue or pull request
2. Seek consensus; allow at least 5 business days for input
3. If consensus cannot be reached, simple majority of active maintainers decides
4. Decisions are recorded in the relevant thread

## Adding Maintainers

A contributor may be invited to become a maintainer when:

- They have made sustained, high-quality contributions over time
- They understand the project architecture and goals
- Existing maintainers trust them to represent the project

Addition requires **unanimous agreement** from all current maintainers. The invitation is extended privately first; the new maintainer is announced publicly only after they accept.

## Removing Maintainers

A maintainer who is inactive for 12 months or who repeatedly acts against the project's best interests may be removed by unanimous vote of remaining maintainers. The affected maintainer is contacted privately before any public announcement.

## Communication

All project discussion happens in the open (GitHub Issues and Pull Requests) by default. Sensitive matters (security reports, code of conduct enforcement) are handled privately via email.
