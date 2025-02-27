# Contribution guide

Thanks for wanting to contribute! This document describes some points about the contribution process for pug-lint.

1.  [Maintainers](#maintainers)
2.  [Pull requests](#pull-requests)

*   [Before submitting a PR](#before-submitting-a-pr)
*   [Why did you close my PR or Issue?](#why-did-you-close-my-pull-request-or-issue)
*   [PR/Issue closing criteria](#prissue-closing-criteria)

1.  [Filing bugs](#filing-bugs)
2.  [Proposing features](#proposing-features)
3.  [Implementing features](#implementing-features)
4.  [Setting up your environment](#setting-up-your-environment)
5.  [Commit message format](#commit-message-format)

## Maintainers

The maintainers of the project are:

*   Ben Edwards (@benedfit)

The project is being developed by the community. Maintainers merge pull-requests and fix critical bugs. All other features and patches are welcomed to be implemented by community members.

## Pull-requests

If you fixed or added something useful to the project, you can send a pull-request. It will be reviewed by a maintainer and accepted, or commented for rework, or declined.

### Before submitting a PR

1.  Please review our suggested [commit message format](#commit-message-format).
2.  Make sure you have tests for your modifications (we use [Mocha](http://mochajs.org/) and [Assert](https://nodejs.org/api/assert.html)).
3.  Run `npm test` locally to catch any JSHint and JSCS errors, and to confirm that 100% code coverage has been maintained.

### Why did you close my pull request or issue?

Nothing is worse than a project with hundreds of stale issues. To keep things orderly, the maintainers try to close/resolve issues as quickly as possible.

### PR/Issue closing criteria

We'll close your PR or issue if:

1.  It's a duplicate of an existing issue
2.  Outside of the style-driven scope of the project
3.  You are unresponsive after a few days
4.  The bug is not reproducible
5.  The feature request introduces too much complexity (or too many edge cases) to the tool

*   We weigh a request's complexity with the value it brings to the community.

Please do not take offence if your ticket is closed. We're only trying to keep the number of issues manageable.

## Filing bugs

If you found an error, typo, or any other flaw in the project, please report it using [GitHub Issues](https://github.com/benedfit/pug-lint/issues). Try searching the issues to see if there is an existing report of your bug or feature request.

When it comes to bugs, the more details you provide, the easier it is to reproduce the issue and the faster it could be fixed.

Some helpful points to provide (if you can):

1.  A failing test would be amazing
2.  Code snippets that make pug-lint exhibit the issue
3.  The version of pug-lint that you're using
4.  Your operating system (Windows, Mac, or Linux)
5.  Screen-shots

Unfortunately, sometimes a bug can only be reproduced in your project or in your environment, so the maintainers cannot reproduce it. In this case we welcome you to try fixing the bug; we'll be more than happy to take a look at (and possibly incorporate) the fix.

## Proposing features

If you've got an idea for a new feature, file an issue providing some details on your idea.

## Implementing features

It's likely that you'll have to implement feature requests or enhancements on your own. To do that, you'll need to be comfortable with JavaScript, Node.js, and familiar with [Pugs' abstract syntax tree format](https://github.com/pugjs/pug-parser).

To understand how pug-lint works, the best place to start is in the `lib/` directory: starting with `lib/cli.js` (to see the processing flow when `pug-lint` is invoked in the terminal) then going to `lib/linter.js` for understanding how pug-lint checks files.

If you cannot implement the feature, but you feel that it would be helpful to others, you can create an issue on GitHub. If the maintainers feel that the issue satisfies our [criteria for closing issues](#prissue-closing-criteria), your issue will be closed with a genuine thank you and an explanation for the closure.

## Setting up your environment

1.  Fork the repository
2.  Clone your fork to your local machine
3.  Run `npm install` in your local fork
4.  Create a new branch for your fix:

*   For bug fixes: `git checkout -b bug/my-fix-branch master`
*   For feature requests:  `git checkout -b feature/my-feature-branch master`

1.  Implement your bug fix or feature request
2.  Implement the tests for your fix or feature
3.  Run `npm test` frequently to find stylistic errors, and to ensure 100% code coverage is maintained, before issuing a PR
4.  Add any appropriate documentation to `README.md`
5.  Commit your code with a commit message that follows our [commit message format](#commit-message-format)

*   If you don't feel comfortable with that format, no worries, we'll fix up your commit after merging your PR.

## Commit message format

We adhere to the [jQuery commit message](http://contribute.jquery.org/commits-and-pull-requests/#commit-guidelines) guidelines.

This format can be achieved via:

*   `git commit` to open your editor to create a multi-line commit message

<!---->

    Short message
    <emptyline>
    Long description (if useful)
    <emptyline>
    Closes gh-<pullRequestNumber>
    Fixes #<issueNumber>

Example:

    Output errors regardless of verbose flag

    Closes gh-31 - pull request
    Fixes #26 - issue
