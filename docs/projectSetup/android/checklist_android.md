# Android Project Setup
## Git
1. Create new repository based on [native-android-repo-template](https://github.com/nanogiants/native-android-repo-template)

## Android Studio
1. Create an empty base project in Android Studio.
    1. Configure build types for different environments.
        - TODO: List all build types (develop, staging, production) and add basic gradle snippets to template repo
    2. Create a signing keystore for release builds.
    3. Upload the necessary files and passwords to a secure password manager like 1Password.
2. Configure analytics, crash reporting, and static file analysis tools.
    - TODO: add details for each step
    1. Integrate Sentry for error tracking.
    2. Use SonarCloud for code quality analysis.
    3. Configure Android Lint for static code analysis.
    4. Set up Detekt for Kotlin code analysis.
    5. Implement NG Android Versioning for managing version codes.

## CI/CD

### AppCenter
1. Log into AppCenter account and create a new project.  
    **Make sure that you create the project under the NanoGiants GmbH group**
2. Configure the necessary build and distribution settings in AppCenter.
3. Set up distribution group for android and add the collaborators group.

#### Naming
Project: `"PROJECT-App-BUILDTYPE"` (e.g. NanoGiants-App-Develop)  
DistributionGroup: `"PROJECT-PLATFORM"` (e.g. NanoGiants-Android)

### Bitrise
1. Create a Bitrise project for continuous integration and deployment.
2. Adjust the base .yaml file from template Repo into the Bitrise project.
- TODO: test how bitrise handles .yaml stored in the app's GitHub repository
3. Configure code signing and files in the Bitrise project.
    1. Upload the signing keystore file and set passwords
    2. if needed, upload the property files for every deployment environment via this script
    - TODO: Create and link shellscript to automatically upload the files from the local machine
4. Manage secrets in Bitrise to securely store sensitive information.
    1. AppCenter Token
    2. GitHub Token
    3. SonarToken
    4. AccessToken

