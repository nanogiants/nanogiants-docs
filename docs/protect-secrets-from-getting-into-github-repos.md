# Protecting Secrets from getting into Git repositories

This documentation provides guidance on safeguarding sensitive information and preventing it from being inadvertently committed to Git repositories. We will achieve this through the use of the pre-commit framework in conjunction with the detect-secrets pre-commit hook.

### Tools Used

1. [pre-commit framework](https://pre-commit.com/): A framework for managing and maintaining multi-language pre-commit hooks.
2. [detect-secrets](https://github.com/Yelp/detect-secrets): A command-line tool for identifying secrets (such as API keys and passwords) in various file formats, helping prevent the unintentional exposure of sensitive information.

## Installation Steps

### 1. Installing pre-commit

Make sure you have Homebrew installed, then open your terminal and run the following command to install the pre-commit framework:

```bash
brew install pre-commit
```

### 2. Setting up pre-commit in your project

Navigate to your Git repository and create a `.pre-commit-config.yaml` file in the root directory. This file will define the pre-commit hooks to be used. For more information on how to add a pre-commit configuration, you can visit the [pre-commit documentation](https://pre-commit.com/#2-add-a-pre-commit-configuration).

### 3. Adding detect-secrets Hook

Add the detect-secrets pre-commit hook to your `.pre-commit-config.yaml` file:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

### 4. Installing detect-secrets and initializing Secrets Baseline

Install detect-secrets

```bash
brew install detect-secrets
```

Before using detect-secrets, it's essential to initialize a baseline. Run the following command in your terminal within the root project directory:

```bash
detect-secrets scan > .secrets.baseline
```

This command initializes the baseline for detect-secrets. The baseline is a snapshot of existing secrets in the codebase, allowing detect-secrets to identify new additions. For more information on detect-secrets commands, you can visit the [detect-secrets GitHub repository](https://github.com/Yelp/detect-secrets).

### 5. Installing Git Hook Script

After configuring pre-commit and detect-secrets, run the following command to install the Git hooks script:

```bash
pre-commit install
```

This command sets up the Git pre-commit hook to automatically run the specified hooks before each commit.

### 6. Running pre-commit Manually

To manually trigger the pre-commit hooks for testing purposes, use the following command:

```bash
pre-commit run --all-files
```

This command runs all configured pre-commit hooks on all files, allowing you to verify that the detect-secrets hook is working correctly.

### 7. Committing Changes

When you attempt to commit changes, pre-commit will run the specified hooks, including detect-secrets. If any secrets are detected, the commit will be rejected, allowing you to address and remove the sensitive information before committing again.
