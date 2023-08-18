# Reusable Workflows Guide

Discover how to use GitHub's reusable workflows for our projects. Learn about the reusable workflow concept, the central repository, and invoking workflows in your projects.

## Concept of Reusable Workflows

Reusable workflows are an approach in GitHub Actions to define shared workflow steps or actions in a central repository. These can then be referenced and invoked by various projects. This enables consistent practices, efficient maintenance, and easy updates across all projects utilizing these reusable workflows.

## Central Workflow Repository

Our organization has a central repository specifically created for reusable workflows (see: https://github.com/nanogiants/nanogiants-reusable-actions). This repository contains predefined workflow steps, actions, and templates that can be utilized by various projects. These reusable workflows are maintained in this repository and regularly updated to reflect best practices and improvements.

## Access to the Central Workflow Repository

All repositories within the nanogiants organization have access to the central workflow repository. This means that the reusable workflows can be easily utilized by any project within our organization.

## Using Reusable Workflows

When you want to create a new project, you can leverage the reusable workflows from the central repository. Here's how it's done:

1. In your project repository, create the `.github/workflows/` directory if it doesn't exist already.

2. Inside the `.github/workflows/` directory, create a new YAML file, let's name it `build.yml`. This will be your "Caller Workflow" file. These files define the steps specific to your project and invoke the reusable workflows from the central repository.

3. In `build.yml`, reference and use the reusable workflow from the central repository:

```yaml
name: Build Workflow

on:
  push:
    branches:
      - main

jobs:
  basic-build:
    name: Basic Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Use Reusable Workflow
        uses: nanogiants/nanogiants-reusable-actions/.github/workflows/basic-build.yml
```

4. Push this `.github/workflows/build.yml` file to the `main` branch of your project repository.

Now, every time you push changes to the `main` branch of your project repository, the `build.yml` workflow will be triggered. It will call the `basic-build.yml` reusable workflow from the central repository. This way, you've reused a standardized build process across different projects in our organization.

For more information see: https://docs.github.com/en/actions/using-workflows/reusing-workflows#calling-a-reusable-workflow

## Using Parameters and Secrets in Reusable Workflows

When working with reusable workflows in GitHub Actions, it's crucial to follow the correct approach for passing both regular parameters and sensitive secrets. Always begin by checking the specific reusable workflow itself to determine which parameters and secrets need to be passed.

### Passing Normal Parameters via `with`

For passing regular parameters like configuration values, variables, or options to a reusable workflow, utilize the `with` keyword. This allows you to tailor the workflow's behavior to the specific requirements of your project. Always consult the documentation or comments within the reusable workflow to identify the parameters it expects.

Example of passing a regular parameter:

```yaml
jobs:
  basic-build:
    name: Basic Build
    runs-on: ubuntu-latest

    steps:
      - name: Use Reusable Workflow with Parameters
        uses: nanogiants/nanogiants-reusable-actions/.github/workflows/basic-build.yml
        with:
          parameter_name: value
```

### Passing Secrets via `secrets`

When sensitive information, like API tokens or passwords, needs to be used within the reusable workflow, employ the `secrets` keyword. This ensures secure storage of sensitive data and prevents its exposure in the workflow definition file. Always review the documentation or comments within the reusable workflow to identify the secrets it requires.

Example of passing a secret:

```yaml
jobs:
  basic-build:
    name: Basic Build
    runs-on: ubuntu-latest

    steps:
      - name: Use Reusable Workflow with Secret
        uses: nanogiants/nanogiants-reusable-actions/.github/workflows/basic-build.yml
        secrets:
          api_token: ${{ secrets.API_TOKEN }}
```

By checking the specific reusable workflow for the expected parameters and secrets and using the appropriate keywords (`with` for parameters and `secrets` for sensitive data), you ensure seamless integration of reusable workflows while maintaining security and customization in your projects.
