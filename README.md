# Convention Changelog Conventionalcommits Jira

This package wraps [conventional-changelog-conventionalcommits](https://www.npmjs.com/package/conventional-changelog-conventionalcommits) and configures the header to start with a Jira ticket prefix. The intended use case is with [@jscutlery/semver](https://www.npmjs.com/package/@jscutlery/semver) since that is currently the only way of updating the header pattern.

Correct messages according to this pattern are:

```
JIRA-1234 feat(package) some change
JIRA-1234 feat(package)!: breaking change
```

So the ticket number has to come first followed by the normal conventional commit pattern. With the one exception that the colon after the type is optional.

Append `!` before the colon to mark a breaking change (triggers a major version bump with `@jscutlery/semver`).
