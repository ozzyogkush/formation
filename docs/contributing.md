---
title: Formation - Contributing to Open Source Project
description: Contributing to the Formation form validation library open-source project
---

# Contributing to Formation

## Requirements for Development

- [`Git`](http://git-scm.com/) - for version control (I recommend using the [SourceTree](https://www.atlassian.com/software/sourcetree/overview) program by Atlassian, as it rules)
- [`NodeJS`](https://nodejs.org) - required for development and release builds (v6.3 or higher)
- [`yarn`](https://yarnpkg.com/) - a better package manager than npm
- [`Grunt`](http://gruntjs.com) - to run tests and create builds.

After installing NodeJS (and its package manager yarn), run `yarn install` to install dependencies.

## Workflow

This project uses the Github Flow. We will accept pull requests from branches (other than master) on your
own repository. All pull requests will be code reviewed. New features must include, at minimum, unit test cases. Unit
tests must also be updated for any changes to existing features.

1. Fork your own copy of the the [`Formation`](https://github.com/ozzyogkush/formation) repository to your GitHub account
1. Checkout the `master` branch in your fork and pull the latest changes from upstream [`master`](https://github.com/ozzyogkush/formation)
1. Create a new branch from master
1. Run `yarn install` to add all dependencies
1. Add your changes and unit tests
1. Update Documentation
1. Open a terminal to your project folder
1. Run automated tests with `grunt test` 
1. When ready, run `grunt build` to create distribution files
1. Commit changes and push your branch
1. Create a pull request of your _forked branch_ into the Formation [`master`](https://github.com/ozzyogkush/formation) branch

**Grunt tasks**:

- `dev` - JSHint and non-minified build
- `unitTests` - run all tests with code coverage
- `unitTests:mocha` - run all tests without code coverage
- `test` - JSHint, non-minified build, run all tests with code coverage
- `build` - JSHint, non-minified build, run all tests with code coverage, minified build

## Tools Used in Development and Testing

The below tools will be installed as dependencies:

- [`JSHint/JSLint`](https://www.npmjs.com/package/grunt-contrib-jshint) - used for ensuring JS files are syntactically correct
- [`Mocha`](https://mochajs.org/) - testing framework
- [`Chai`](http://chaijs.com/) - provides `assert`, `expect`, `should` functionality for Mocha
- [`Istanbul`](https://www.npmjs.com/package/grunt-mocha-istanbul) - works with Mocha to provides code coverage for testing results
- [`Sinon`](http://sinonjs.org/) - used for spies, stubs, mocks, etc. 
- [`Webpack`](https://webpack.github.io) - for building static assets in builds
