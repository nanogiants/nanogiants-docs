# NanoGiants Docs - Developmnent 
<!-- section: Introduction -->
<!-- Describe what this document refers to. At what target audience is it aimed? -->

This section describes how we develop software at NanoGiants

## Table of contents
<!-- section: Table of contents -->
<!-- This shows what sections are covered in this document and gives the reader the possibility to jump to a specific section. It is highly recommended to use a TOC. -->
<!-- This has two items called first and second respectively. Remove them and use your own -->
- [NanoGiants Docs - Developmnent](#nanogiants-docs---developmnent)
  - [Table of contents](#table-of-contents)
  - [Git commit messages?](#git-commit-messages)
    - [What is our git philosophy?](#what-is-our-git-philosophy)
    - [Tooling](#tooling)
  - [Pull Requests](#pull-requests)
    - [Creation of the pull request](#creation-of-the-pull-request)
    - [Basic configuration](#basic-configuration)
    - [Configuration of bots / checks](#configuration-of-bots--checks)
    - [Reviewing and Merging](#reviewing-and-merging)
    - [Best practises by NanoGiants teams](#best-practises-by-nanogiants-teams)
  - [Versioning](#versioning)
  - [Licensing](#licensing)
  - [Documentation](#documentation)
  - [Guiding Principles](#guiding-principles)
  - [CI/CD](#cicd)
  - [Quality Metrics (SonarCloud)](#quality-metrics-sonarcloud)


<!-- section: Content -->
<!-- This the actual content. -->

## Git commit messages?
Git commit messages are a crucial yet underestimated part of software development. They describe the evolution of a project 
in small and tracable steps. They can be a powerful tool if used right. One of the most important aspects are semantics of a
git commit message. For this we use conventional commits to enforce a proper syntax that adds meaning to a commit message. 
The syntax is as follows:

    <type>[(optional scope)]: <description>

The `<type>` denotes the type of the changes that are applied to the code when the commit was introduced. The following types are allowed:

| Name       | Description                                                                                                                           |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `feat`     | A new feature visible to the user                                                                                                     |
| `fix`      | A fix of a behavior that is not a new feature (i.e. bug)                                                                              |
| `docs`     | Changes to documentation or anything related to documentation                                                                         |
| `style`    | Changes that do not affect the meaning of the code (i.e. remove whitespaces, formatting). This does not include changes to css styles |
| `refactor` | Changes to code that do not fix bugs or add features                                                                                  |
| `test`     | Changes to test files or anything related to tests                                                                                    |
| `chore`    | Anything else that does not fall into one of the other categories                                                                     |

The `[optional scope]` is optional and describes that section or area where this commit applies to. We give examples later in this document. And finally `<description>` is the actual description of the commit.

With that syntax we add semantics to the commit, which can be used to better understand what kind of changes are introduced
and where they apply. We even may use this for generating changelogs. However, we opted for another direction by 
utilizing pull requests.

Here are some examples: 
- feat: users are able to change their basic account information
- docs(changelog): correct spelling of CHANGELOG
- fix(toast): fix bug where toast position was incorrect on mobile devices

### What is our git philosophy?
The goal behind your git history directly affects the way you write commit messages. Therefore we want to outline this 
goal and subsequently give some advice on how to write commit messages.

A git history should communicate the changes that are introduced by a certain commit in a clear and precise manner. This
improves maintainability from a meta perspective. Git has many tools to work with code that we use from time to time 
(i.e. `bisect`, `blame`, `revert`, `cherry-pick`) and greatly benefit from a unified standard on how to write commit messages.
Also it improves overall readability when appliying the same style to every commit message on every project.

Here are the rules on how to write commit messages at NanoGiants:

- Separate subject from body with a blank line
- Limit the subject line to 100 characters
- Use the conventional commit message style described above
- Decapitalize the `<description>`
- Do not end the subject line with a period
- Use the imperative mood in the subject line
- Use the body to explain what and why vs. how

Note that these are modified rules of the 7 golden commit rules originally published by `cbeams`. For more context see
`https://cbea.ms/git-commit/`.

Avoid squashing commits as they alter the git history and possibly obscure reality. It is oke to 
squash WIP commits to summarize them as a feature.

### Tooling
We use [commitlint](https://github.com/conventional-changelog/commitlint) in combination with [husky](https://github.com/typicode/husky) to ensure that commit messages are consistent with our guidelines. Obviously this only applies to structure and not semantics. You can find a config file here that holds the configuration for our guide [here](../files/development/git/commitlint.config.js).

**[back to top](#table-of-contents)**

## Pull Requests
Pull requests are a fundamental element to ensure quality of code especially for larger teams as well as larger projects. 
The idea is that every pull request is reviewed by another person before eventually merging it into the base branch (i.e. 
`develop`, `master`). The reviewer may give feedback and is able to request changes, so that the developer that
created the pull request incorporates the changes suggested by the reviewer (or argues against them). We at NanoGiants
also work with pull requests (on Github). The workflow consists of 4 simple steps, that are described later in this 
document. We want to emphasize that every team of the NanoGiants has to adhere to the basic structure (i.e. 4 simple steps).
However, teams are free to choose how they want to do it in regards to the details. We also want to provide best practises
that are maintained by the respective teams, so that you have a set of rules that you might want to follow, when building 
a new team pro project. 

### Creation of the pull request
Pull requests can be easily created and this section does not cover on how to do this on Github. We just want to give
some restrictions what the outcome of this step is. When creating a pull request you have to provide a name as well as 
a description. Both are mandatory (not by Github but by us). 

| Name        | Description                         | Must                                                | Should                                                                                         | Could                         |
| :---------- | :---------------------------------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :---------------------------- |
| Name        | The name of the pull request        | Describe what the PR does                           | -                                                                                              | Reference to an issue in Jira |
| Description | The description of the pull request | Describe what the PR does in a more detailed manner | Hold relevant information (i.e. what was tested, Definition of Done, link to Jira issue, ... ) | -                             |

### Basic configuration
Here are many options available. See [best practises](#best-practises-by-nanogiants-teams) to get some ideas what you may
configure. There is only one thing every team has to adhere to and this is the reviewers section. Every pull request has 
to be reviewed by at least one other person to ensure quality of code. Therefore suggest at least one reviewer. Also every
repository has to be configured in a way that merging is blocked (even for administrators) when there were no reviews.

### Configuration of bots / checks
Usage of bots is a great help for pull requests as they run checks that you had to yourself (i.e. runnings tests, linting).
You have to use the sonarcloud bot that, sends changes introduced by the commit to sonarcloud.io in order to run some checks.
This means that there has to be a sonarcloud project. For information on how to create this refer to the respective section.
Other useful bots are Danger for Swift projects or the Travis CI Bot. See [best practises](#best-practises-by-nanogiants-teams) to got some ideas what you may configure.

### Reviewing and Merging
Reviewing a pull request is no easy task especially with bigger pull requests. So take your time and be as extensive and 
specific as you see fit. The goal is not to bash / blame another developer but to ensure that code adheres to a certain 
standard of quality. For some pull requests it is a good idea to checkout the relevant branch and run it locally as some 
changes may be open to race conditions are behave differently on different environments. It is better to see this at a
reviewing stage instead on a production environment. When merging a PR do not opt for the squash option unless there is 
a valid reason for it (i.e. many WiP commits). Even then let this be the exception and not be the rule.


### Best practises by NanoGiants teams

- [Amprio (former We1U Team)](bestPractises/pullRequest-amprio.md)
- [Proxima Team](bestPractises/pullRequest-proxima.md)
- [Moshpit Team](bestPractises/pullRequest-moshpit.md)
- [Appengers Team](bestPractises/pullRequest-appengers.md)

## Versioning

## Licensing

## Documentation

## Guiding Principles

## CI/CD

## Quality Metrics (SonarCloud)

**[back to top](#table-of-contents)**
