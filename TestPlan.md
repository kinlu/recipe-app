# Test Plan for recipe-app

## Overview

This is an angular app. There will be 3 levels of tests invovled: Unit test, Integratin test and End-to-end test

Aligning with the test pyramid model, the test plan will pursue more amount of unit tests to achieve quick feedback in engineering lifecycle.

## Implementation
### Unit test

Unit tests will be applied to those components with logics inside.

To achieve isolation, the dependent serice modules will be stubbed in unit tests.  The stubs are supported by [sinon](https://sinonjs.org/releases/latest/).

TestBed from angular is adopted to support the unit tests.

Unit tests are with "- unit test" suffix.

### Integration test

Integration tests for component use the real service modules instead of the stubbed one in unit test.

All routers are still stubbed for the test-friendly purpose.

All integration tests are executed with the unit test.

Unit tests are with "- integration test" suffix.

### End-to-end test

End-to-end test will be built from CodeceptJS and Puppeteer.  It is stored in different repo: [recipe-app-e2e](https://github.com/kinlu/recipe-app-e2e)

3 scenarios are provided in the end-to-end test as per available functionalities.
