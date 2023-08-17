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
        with:
          input-example: example
        secrets:
          secret-example: ${{ secrets.example }}
```

4. Push this `.github/workflows/build.yml` file to the `main` branch of your project repository.

Now, every time you push changes to the `main` branch of your project repository, the `build.yml` workflow will be triggered. It will call the `basic-build.yml` reusable workflow from the central repository. This way, you've reused a standardized build process across different projects in our organization.

For more information see: https://docs.github.com/en/actions/using-workflows/reusing-workflows#calling-a-reusable-workflow

## Conclusion

Using reusable workflows in GitHub allows our projects to benefit from consistent and efficient automation. The central workflow repository streamlines the maintenance and updating of workflows across our entire organization. By creating "Caller Workflow" files, you can seamlessly integrate these reusable workflows into your projects and reap the benefits of a shared approach.
