Formation
=========

A JavaScript library for websites which use Twitter Bootstrap and jQuery, to make form validation easy.

Usage
=====

TODO

alpha version
-------------

**UNDER ACTIVE DEVELOPMENT**

Do not use this for a production project yet. Once this is stable we'll release a 1.0.0 version.

Dependencies:

Bootstrap 3
jQuery

License
=======

TODO

Contributing
============

This project uses a Git workflow. We will accept pull requests from feature or hotfix branches (not master) on your
own repository. All pull requests will be code reviewed. New features must include, at minimum, unit test cases. Unit
tests must also be updated for any changes to existing features.

Requirements for Development
----------------------------

- [`Git`](http://git-scm.com/) - for version control (I recommend using the [SourceTree](https://www.atlassian.com/software/sourcetree/overview) program by Atlassian, as it rules)
- [`NodeJS`](https://nodejs.org) - required for development and release builds (v6.3 or higher)
- [`Grunt`](http://gruntjs.com) - to run tests and create builds.

After installing NodeJS (and its package manager NPM), run `npm install` to install dependencies.

Tools Used in Development and Testing
-------------------------------------

The below tools will be installed as dependencies:

- JSHint/JSLint - used for ensuring JS files are syntactically correct
- Mocha - testing framework
- Chai - provides `assert`, `expect`, `should` functionality for Mocha
- Istanbul - works with Mocha to provides code coverage for testing results
- Sinon - used for spies, stubs, mocks, etc. 
- Webpack - used for generating builds
