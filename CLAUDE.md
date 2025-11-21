# Project Instructions for Claude Code

## Release Process

**IMPORTANT:** Do NOT manually run `npm publish`.

Releases are handled automatically via GitHub Actions:

1. Commit and push changes to the main branch
2. Bump the version using `npm version [patch|minor|major]`
3. Push the version commit and tags: `git push && git push --tags`
4. Create a GitHub release from the tag (triggers the publish workflow)
5. GitHub Actions will automatically publish to npm with provenance

The `.github/workflows/publish.yml` workflow triggers on release creation and
handles npm publishing using OIDC authentication (no OTP needed).

## Development

This is a Backstage plugin using the new frontend system, designed for
compatibility with Spotify Portal for Backstage.
