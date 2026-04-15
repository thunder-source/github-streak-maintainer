# GitHub Streak Maintainer

Minimal Node.js project that creates one normal commit per UTC day with GitHub Actions.

## How it works

- The workflow runs three times per day at off-hour minutes.
- The script creates `data/daily/YYYY-MM-DD.json` using the current UTC date.
- If that file already exists, the workflow exits without creating another commit.

## Files

- `scripts/streak.js`: creates the daily record for the current UTC day
- `.github/workflows/streak.yml`: scheduled workflow that commits and pushes changes

## Setup

1. Create a standalone GitHub repository and push this project to its default branch.
2. In the repository, add a repository variable named `STREAK_GIT_EMAIL`.
3. Set `STREAK_GIT_EMAIL` to an email linked to your GitHub account, or your GitHub `noreply` email.
4. Optionally add a repository variable named `STREAK_GIT_NAME` if you do not want to use the GitHub actor name.
5. Enable GitHub Actions for the repository.
6. Run the workflow once with `workflow_dispatch`.

## Notes

- GitHub contribution counting uses UTC dates, so this project uses UTC intentionally.
- Scheduled workflows can be delayed, so the workflow runs multiple times per day.
- Public repositories can have scheduled workflows disabled after 60 days of inactivity.
- Private repositories can contribute to your graph only if private contributions are enabled in your GitHub profile settings.

## Local run

```bash
npm run streak
```
