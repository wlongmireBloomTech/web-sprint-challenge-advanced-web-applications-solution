# Codegrade Instructor Guide
[General Codegrade Setup Guide](https://www.notion.so/lambdaschool/Setting-up-an-assignment-via-Code-Grade-Step-by-step-walkthrough-for-instructors-e772dcf032f842deb47153cc619af83e#128ff615ea4c467f88d20be095da0e59)

[Additional Rubric Guide](https://www.notion.so/lambdaschool/Adding-Rubrics-to-CodeGrade-dd19fc8fc86844efa598a361cb5338a1)

## Setup

### Uploaded fixtures
These files must be re-uploaded to Codegrade whenever we make changes to them:

- `cg-react-scripts`
- `jest.config.js`
- `setup.bash`
- `setupTests.js`
- `codegrade_mvp.test.js`

### Global setup script to run

```bash
cg-react-scripts install
```

### Per-student setup script to run

```bash
npm i && setup.bash
```
---

## Rubrics
### Client MVP Rubic
> **Category Name:** Client MVP

> **Category Description:** Base tests for project client code.

> **Max Points:** 10

### Client Test Rubic
> **Category Name:** Test MVP

> **Category Description:** Base tests for project test code.

> **Max Points:** 10
---
## AutoGrade Levels
### Client MVP Level
> **Category Rubric:** Client MVP

> **Category Step:** Unit Test

> **Category Name:** Student Implementation MVP

> **Weight:** 1

> **Program To test:**
```bash
cg-react-scripts run src/codegrade/codegrade_mvp.test.js
```

### Client Test Level
> **Category Rubric:** Test MVP

> **Category Step:** Unit Test

> **Category Name:** Student Test MVP

> **Weight:** 1

> **Program To test:**
```bash
cg-react-scripts run src/components/BubblePage.test.js
```