**Project Secrets and Password Management**

_A documentation on secure management of secrets and passwords in projects_

---

**Table of Contents**

1. Introduction
2. 1Password Vault for Secrets and Passwords
   - 2.1 Vault Naming Conventions
   - 2.2 Essential Vault Guidelines
3. 1Password Service Accounts
   - 3.1 Requesting Service Account Access
   - 3.2 Storing Service Account Token
   - 3.3 Why Use Service Accounts?
   - 3.4 Important Considerations
4. Using 1Passwords GitHub Actions
   - 4.1 Integration
   - 4.2 Secrets Reference Syntax
5. Best Practices
   - 5.1 Use of Strong Passwords
   - 5.2 Reusable Workflow for getting .env File from 1Password Vault
6. Conclusion

---

## 1. Introduction

Ensuring the security of secrets and passwords in a project is of paramount importance to safeguard sensitive information from unauthorized access. This documentation outlines best practices for managing secrets and passwords in a project environment using 1Password and GitHub.

## 2. 1Password Vault for Secrets and Passwords

All secrets and passwords of a project must be managed within 1Password. A dedicated vault for each project within 1Password facilitates organized and centralized storage of sensitive information. Access to this vault should be limited to a trusted few, adhering to the principle of "as many as necessary, as few as possible." The use of 1Password ensures that data is encrypted and protected.

### 2.1 Vault Naming Conventions

To maintain consistency and clarity, we suggest to use the following naming convention for our project vaults: `client_project`. Here's what it means:

- `client`: The name of the client or the main entity associated with the project. (e.g. `haufe`)
- `project`: The name or identifier of the project itself. (e.g. `powerhelferapp`)

Using this naming convention, we can easily identify which project a vault is associated with.

### 2.2 Essential Vault Guidelines

To enhance security and streamline management, it's crucial to adhere to the following guidelines:

1. Activate Service Account Access:

   Activate `Service Account Access`, as it is essential for strengthening secure management practices, particularly for obtaining secrets through GitHub Actions.

2. Centralized Storage for Project Assets:

   Establish a centralized repository for all project-related assets, including passwords, secrets, dotenv files, certificates, etc. This vault serves as the ultimate **SOURCE OF TRUTH** for all sensitive project information.

By implementing these practices, we aim to create a well-organized and secure system for managing project assets while promoting accessibility for authorized personnel.

## 3. 1Password Service Accounts

Service Accounts play a crucial role in enhancing security and optimizing automated processes within our workflows. In the following we outline the process for requesting, storing, and utilizing Service Accounts, emphasizing the importance of maintaining a secure and controlled environment for sensitive information.

### 3.1 Requesting Service Account Access

To request Service Account access, reach out to CTO Stefan N with specific details about the vault requiring access. This request can be submitted through Fresh Service or directly via Slack.

### 3.2 Storing Service Account Token

- **Project Vault:** Store the Service Account Token securely in the designated project vault. This ensures centralized management and controlled access to sensitive credentials.
- **GitHub Repository:** Save the Service Account Token as a secret in the associated GitHub Repository. Reference the token in workflows to enable secure automation processes.

### 3.3 Why Use Service Accounts?

Service Accounts offer several advantages for secure secrets and password management:

- **Enhanced Security:**
  Service Accounts provide a secure means of accessing and managing sensitive information, ensuring that only authorized processes have the necessary credentials.

- **Streamlined Automation:**
  By using Service Accounts, workflows are streamlined, and automated processes can be executed efficiently, reducing manual intervention and potential human errors.

- **Clear Audit Trail:**
  Service Accounts facilitate a clear audit trail, documenting each access and action taken. This transparency is essential for monitoring and accountability.

### 3.4 Important Considerations

- **Rate Limits and Quotas:**
  Be mindful of [Rate Limits and Quotas](https://developer.1password.com/docs/service-accounts/rate-limits) to ensure proper usage and prevent potential service disruptions. Regularly monitor and adjust workflows to comply with service provider guidelines.
- **Shared Vault Restriction:**
  Service Accounts cannot be granted access to the default Shared vault. This restriction ensures a clear separation of access privileges and maintains a higher level of security.
- **Data Access:**
  We recommend that Service Accounts are permitted to read data from vaults but are restricted from making write operations. This precaution mitigates the risks associated with automated creation and storage of sensitive information.

Implementing Service Accounts in your projects not only enhances security but also contributes to the efficiency and reliability of automated processes. By following the outlined guidelines, you ensure a robust and secure foundation for managing secrets and passwords within your projects.

## 4. Using 1Passwords GitHub Actions

Now that we have successfully created the service account, we can leverage its token to access items from our project vault within our workflows. This process involves utilizing the official 1Password GitHub Actions, such as [load-secrets-from-1password](https://github.com/marketplace/actions/load-secrets-from-1password) or [1password-cli](https://github.com/marketplace/actions/1password-cli).

### 4.1 Integration

To seamlessly integrate 1Password into your GitHub Actions, consider using the following actions:

- [load-secrets-from-1password](https://github.com/marketplace/actions/load-secrets-from-1password): This action enables you to fetch secrets securely from your 1Password vault and use them within your GitHub Actions workflows.

- [1password-cli](https://github.com/marketplace/actions/1password-cli): This action provides a versatile interface to interact with 1Password using the command-line interface. It allows you to perform various operations, including retrieving secrets, in your GitHub Actions workflows.

### 4.2 Secrets Reference Syntax

When referencing items from your 1Password vault, it's crucial to follow the correct syntax. The [1Password Secrets Reference Syntax](https://developer.1password.com/docs/cli/secrets-reference-syntax/) documentation provides detailed information on how to structure references to ensure accurate retrieval of items.

By combining the generated token from the service account with these GitHub Actions and adhering to the Secrets Reference Syntax, you can seamlessly integrate 1Password into your workflows, enhancing the security and efficiency of your project's secret management.

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

## 6. Conclusion

Secure management of secrets and passwords is a critical aspect of any project. The use of a password manager like 1Password and the integration of there GitHub Actions into workflows contribute to safeguarding sensitive information and ensuring project security. By adhering to these recommendations, the confidentiality and integrity of data are protected, minimizing potential security risks.