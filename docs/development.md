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

<!-- section: Content -->
<!-- This the actual content. -->

## Git commit messages?
Git commit messages are a crucial yet underestimated part of software development. They describe the evolution of a project 
in small and tracable steps. They can be a powerful tool if used right. One of the most important aspects are semantics of a
git commit message. For this we use conventional commits to enforce a proper syntax that adds meaning to a commit message. 
The syntax is as follows:

    <type>[(optional scope)]: <description>

The `<type>` denotes the type of the changes that are applied to the code when the commit was introduced. The following types are allowed:

| Name | Description |
| :--- | :---------- |
| `feat` | A new feature visible to the user |
| `fix` | A fix of a behavior that is not a new feature (i.e. bug) | 
| `docs` | Changes to documentation or anything related to documentation |
| `style` | Changes that do not affect the meaning of the code (i.e. remove whitespaces, formatting). This does not include changes to css styles |
| `refactor` | Changes to code that do not fix bugs or add features |
| `test` | Changes to test files or anything related to tests |
| `chore` | Anything else that does not fall into one of the other categories |

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

**[back to top](#table-of-contents)**
