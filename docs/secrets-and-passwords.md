**Project Secrets and Password Management**

_A documentation on secure management of secrets and passwords in projects_

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [1Password Vault for Secrets and Passwords](#2-1password-vault-for-secrets-and-passwords)
   - [2.1 Vault Naming Conventions](#21-vault-naming-conventions)
   - [2.2 Essential Vault Guidelines](#22-essential-vault-guidelines)
3. [1Password Service Accounts](#3-1password-service-accounts)
   - [3.1 Requesting Service Account Access](#31-requesting-service-account-access)
   - [3.2 Storing Service Account Token](#32-storing-service-account-token)
   - [3.3 Why Use Service Accounts?](#33-why-use-service-accounts)
   - [3.4 Important Considerations](#34-important-considerations)
4. [Using 1Passwords GitHub Actions](#4-using-1passwords-github-actions)
   - [4.1 Integration](#41-integration)
   - [4.2 Secrets Reference Syntax](#42-secrets-reference-syntax)
5. [Best Practices](#5-best-practices)
   - [5.1 Use of Strong Passwords](#51-use-of-strong-passwords)
   - [5.2 Reusable Workflow for getting .env File from 1Password Vault](#52-reusable-workflow-for-getting-env-file-from-1password-vault)
6. [Handling Leaked Secrets](#6-handling-leaked-secrets)
7. [Organizational-Level Secrets Management](#7-organizational-level-secrets-management)
8. [Conclusion](#8-conclusion)

---

## 1. Introduction

Ensuring the security of secrets and passwords in a project is of paramount importance to safeguard sensitive information from unauthorized access. Our goal is to ensure the integrity of our security-relevant data. At the same time, we want to offer a frustration-free way to use this data within our development processes. This documentation outlines best practices for managing secrets and passwords in a project environment using 1Password and GitHub.

**[back to top](#table-of-contents)**

## 2. 1Password Vault for Secrets and Passwords

All secrets and passwords of a project must be managed within 1Password. A dedicated vault for each project within 1Password facilitates organized and centralized storage of sensitive information. Access to this vault should be limited to a trusted few, adhering to the principle of "as many as necessary, as few as possible." The use of 1Password ensures that data is encrypted and protected.

### 2.1 Vault Naming Conventions

To maintain consistency and clarity, we suggest to use the following naming convention for our project vaults: `client_project`. Here's what it means:

- `client`: The name of the client or the main entity associated with the project. (e.g. `haufe`)
- `project`: The name or identifier of the project itself. (e.g. `powerhelferapp`)

Only use Latin letters and no spaces, as only then can this secret be accessed programmatically by name. This improves readability. Using this naming convention, we can easily identify which project a vault is associated with.

### 2.2 Essential Vault Guidelines

To enhance security and streamline management, it's crucial to adhere to the following guidelines:

1. Activate Service Account Access:

   Activate `Service Account Access`, as it is essential for strengthening secure management practices, particularly for obtaining secrets through GitHub Actions.

2. Centralized Storage for Project Assets:

   Establish a centralized repository for all project-related assets, including passwords, secrets, dotenv files, certificates, etc. This vault serves as the ultimate **SOURCE OF TRUTH** for all sensitive project information.

By implementing these practices, we aim to create a well-organized and secure system for managing project assets while promoting accessibility for authorized personnel.

**[back to top](#table-of-contents)**

## 3. 1Password Service Accounts

Service Accounts play a crucial role in enhancing security and optimizing automated processes within our workflows. In the following we outline the process for requesting, storing, and utilizing Service Accounts, emphasizing the importance of maintaining a secure and controlled environment for sensitive information.

### 3.1 Requesting Service Account Access

To request Service Account access, reach out to CTO Stefan N with specific details about the vault requiring access. This request can be submitted through [Fresh Service](https://nanogiantsgmbh.freshservice.com/support/catalog/items/74) or directly via Slack.

### 3.2 Storing Service Account Token

- **Project Vault:** Store the Service Account Token securely in the designated project vault. This ensures centralized management and controlled access to sensitive credentials.
- **GitHub Repository:** Save the Service Account Token as a secret in the associated GitHub Repository. Reference the token in workflows to enable secure automation processes.

### 3.3 Why Use Service Accounts?

Service Accounts offer several advantages for secure secrets and password management:

- **Enhanced Security:**
  Service accounts can and always should be scoped to the project specific vault. They can only be used through a token, which withholds a normal login to our organization and can't suffer from a weak password.

- **Streamlined Automation:**
  Service accounts can programmatically access secrets. This enables us to keep a single source of truth and reduce human errors when managing secrets across our automated processes, e.g., in our CI / CD pipelines on GitHub.

- **Clear Audit Trail:**
  Service Accounts facilitate a clear audit trail, documenting each access and action taken. This transparency is essential for monitoring and accountability.

### 3.4 Important Considerations

- **Rate Limits and Quotas:**
  Be mindful of [Rate Limits and Quotas](https://developer.1password.com/docs/service-accounts/rate-limits) to ensure proper usage and prevent potential service disruptions. Regularly monitor and adjust workflows to comply with service provider guidelines. Tip: A stored `.env` file can be accessed with 1 single request, so all variables in there only contribute as one request to the rate limit.
- **Shared Vault Restriction:**
  Service Accounts cannot be granted access to the default Shared vault. This restriction ensures a clear separation of access privileges and maintains a higher level of security.
- **Data Access:**
  We currently require that all Service Accounts may only read data from vaults and are restricted from making write operations. This precaution mitigates the risks associated with the automated creation and storage of sensitive information.

Implementing Service Accounts in your projects not only enhances security but also contributes to the efficiency and reliability of automated processes. By following the outlined guidelines, you ensure a robust and secure foundation for managing secrets and passwords within your projects.

**[back to top](#table-of-contents)**

## 4. Using 1Passwords GitHub Actions

Now that we have successfully created the service account, we can leverage its token to access items from our project vault within our workflows. This process involves utilizing the official 1Password GitHub Actions, such as [load-secrets-from-1password](https://github.com/marketplace/actions/load-secrets-from-1password) or [1password-cli](https://github.com/marketplace/actions/1password-cli).

### 4.1 Integration

To seamlessly integrate 1Password into your GitHub Actions, consider using the following actions:

- [load-secrets-from-1password](https://github.com/marketplace/actions/load-secrets-from-1password): This action fetches secrets securely from your 1Password vault and provides them as [masked values](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#masking-a-value-in-a-log) within your GitHub Actions workflows. Note that while a masked value is blacked out in the logs, it cannot be used as output. Therefore, only the steps in the same job have access to the loaded secret. As a reusable workflow must always be a standalone job, this action may not be useful for you.

- [1password-cli](https://github.com/marketplace/actions/1password-cli): This action provides a versatile interface to interact with 1Password using the command-line interface. It allows you to perform various operations, including retrieving secrets, in your GitHub Actions workflows.

### 4.2 Secrets Reference Syntax

When referencing items from your 1Password vault, it's crucial to follow the correct syntax. The [1Password Secrets Reference Syntax](https://developer.1password.com/docs/cli/secrets-reference-syntax/) documentation provides detailed information on how to structure references to ensure accurate retrieval of items.

By combining the generated token from the service account with these GitHub Actions and adhering to the Secrets Reference Syntax, you can seamlessly integrate 1Password into your workflows, enhancing the security and efficiency of your project's secret management.

**[back to top](#table-of-contents)**

## 5. Best Practices

### 5.1 Use of Strong Passwords

When creating secrets and passwords, using strong, random character strings is crucial. Adequate password complexity ensures that unauthorized access due to weak passwords is avoided. The following recommendations apply:

- All passwords should have a minimum length of 16 characters to provide a high level of security.
- Upper and lower case letters
- Numbers
- Special characters (e.g., !, ?, +, #, %, etc.)

By combining these elements, password strength is significantly enhanced, reducing the risk of brute force or other attack methods.

### 5.2 Reusable Workflow for getting .env File from 1Password Vault

See [NanoGiants Reusable Workflow: Load Dotenv from 1Password](https://github.com/nanogiants/nanogiants-reusable-actions/blob/master/docs/_load_dotenv_from_1password.md)

### 5.3 Synchronizing your local .env File from 1Password Vault

You can use the 1Password CLI along with a template file to effectively download the currently stored version of the .env file. Just place `{{ op://VAULT_NAME/NAME_OF_THE_SECRET/FILE_NAME }}` inside a template file ending in `.tpl`. You can than generate the actual env file via:

```sh
op inject -i FILE.tpl -o FILE
```

For example, you have a project vault named `nanogiants_docs` and store the `.env.develop` and `.env.staging` as a secret called `env_files`. Set up the `.env.staging.tpl` file with `{{ op://nanogiants_docs/env_files/.env.staging }}` as the content. Then run `op inject -i .env.staging.tpl -o .env.staging` to get a current version of the env file.

**[back to top](#table-of-contents)**

## 6. Handling Leaked Secrets

In the event that a sensitive secret or password has been accidentally leaked into version control or other instances, it is crucial to take swift and effective action to mitigate potential security risks. As part of our robust security measures, every pull request undergoes a comprehensive check using SonarCloud. SonarCloud automatically scans and assesses each pull request, providing detailed information about potential issues, including the inadvertent inclusion of leaked secrets.
This section outlines the recommended steps to follow if such an incident occurs.

1. **Assessment of Impact:**

- Determine the sensitivity and potential impact of the leaked secret. Assess whether the compromised information poses a significant security risk to the project or its associated systems.

2. **Immediate Remediation:**

- Revoke and Rotate Credentials:
  - Immediately revoke and rotate the leaked information to prevent unauthorized access. This applies to any affected accounts, services, or systems.

3. **Communication:**

- Notify Relevant Parties:
  - Inform relevant team members, project stakeholders, or security personnel about the incident. Transparent communication is crucial for coordinated efforts to address the situation effectively.
- Update Documentation:
  - Document the incident in the project's documentation. Describe the nature of the leak, actions taken, and any lessons learned.

By following these steps, you can effectively address and remediate incidents involving leaked secrets in version control.

**[back to top](#table-of-contents)**

## 7. Organizational-Level Secrets Management

As part of our secrets management strategy, we have chosen not to utilize 1Password for organizational secrets. Instead, we rely on GitHub organization secrets due to several considerations:

- **Infrequent Changes:**

  - Organizational secrets often require changes less frequently than project-specific secrets. GitHub organization secrets provide a practical solution for managing such static information without the need for constant updates.

- **Deliberate Changes:**

  - Changes to organization secrets are deliberate and require thoughtful consideration. GitHub's centralized approach ensures that when modifications are necessary, they are made intentionally, reducing the likelihood of hasty or accidental changes that could impact all projects.

- **No Impact on 1Password's Rate Limits:**
  - By leveraging GitHub organization secrets, we avoid adding to the rate limits of 1Password. This ensures uninterrupted access to password management services for their primary use cases, without being impacted by infrequent changes to organizational secrets.

In summary, the use of GitHub organization secrets is a strategic choice aimed at improving efficiency, security, and collaboration across our projects. This approach aligns with our commitment to maintaining a robust and streamlined secrets management process at both the project and organizational levels.

**[back to top](#table-of-contents)**

## 8. Conclusion

Secure management of secrets and passwords is a critical aspect of any project. The use of a password manager like 1Password and the integration of their GitHub Actions into workflows contribute to safeguarding sensitive information and ensuring project security. By adhering to these recommendations, the confidentiality and integrity of data are protected, minimizing potential security risks.

**[back to top](#table-of-contents)**
