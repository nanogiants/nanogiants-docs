**Project Secrets and Password Management**

_A documentation on secure management of secrets and passwords in projects_

---

**Table of Contents**

1. Introduction
2. 1Password Vault for Secrets and Passwords
   - 2.1 Naming Conventions
3. Managing Secrets in GitHub
   - 3.1 Adding Secrets in GitHub
   - 3.2 Using Secrets in Workflows
4. Best Practices for Security
   - 4.1 Use of Strong Passwords
5. Conclusion

---

## 1. Introduction

Ensuring the security of secrets and passwords in a project is of paramount importance to safeguard sensitive information from unauthorized access. This documentation outlines best practices for managing secrets and passwords in a project environment using 1Password and GitHub.

## 2. 1Password Vault for Secrets and Passwords

All secrets and passwords of a project must be managed within 1Password. A dedicated vault for each project within 1Password facilitates organized and centralized storage of sensitive information. Access to this vault should be limited to a trusted few, adhering to the principle of "as many as necessary, as few as possible." The use of 1Password ensures that data is encrypted and protected.

### 2.1 Naming Conventions:

To maintain consistency and clarity, we suggest to use the following naming convention for our project vaults: `client-project`. Here's what it means:

- `client`: The name of the client or the main entity associated with the project. (e.g. `haufe`)
- `project`: The name or identifier of the project itself. (e.g. `powerhelferapp`)

Using this naming convention, we can easily identify which project a vault is associated with.

## 3. Managing Secrets in GitHub

To securely store secrets required by GitHub Actions or workflows, these should be stored in the GitHub repository settings.

### 3.1 Adding Secrets in GitHub

- Navigate to the desired repository on GitHub.
- Click on "Settings" and select "Secrets and variables" from the menu.
- Click on "Codespaces".
- At the top of the page, click "New repository secret".
- Save the secret.

### 3.2 Using Secrets in Workflows

In GitHub Actions or workflows, the defined secrets can be used to securely pass sensitive information. Secrets are utilized as environment variables in workflows to grant access to this information during execution.

For more information see: https://docs.github.com/en/actions/security-guides/encrypted-secrets

Example of using a secret in a workflow:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Use a secret
        run: echo ${{ secrets.API_KEY }}
```

## 4. Best Practices for Security

### 4.1 Use of Strong Passwords

When creating secrets and passwords, using strong, random character strings is crucial. Adequate password complexity ensures that unauthorized access due to weak passwords is avoided. The following recommendations apply:

- All passwords should have a minimum length of 16 characters to provide a high level of security.
- Upper and lower case letters
- Numbers
- Special characters (e.g., !, ?, +, #, %, etc.)

By combining these elements, password strength is significantly enhanced, reducing the risk of brute force or other attack methods.

## 5. Conclusion

Secure management of secrets and passwords is a critical aspect of any project. The use of a password manager like 1Password and the integration of GitHub Secrets into workflows contribute to safeguarding sensitive information and ensuring project security. By adhering to these recommendations, the confidentiality and integrity of data are protected, minimizing potential security risks.
