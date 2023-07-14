# iOS Project Setup
## Git
Create new repository based on native-ios-repo-template

## Apple Developer
The Developer Certiciate and Provisioning Profile are required for code signing and distribution.  

[Apple Developer Portal](https://developer.apple.com/account/resources/)

1. Load the NanoGiants GmbH Developer Certificate, and add it into your Keychain.
2. add identifiers for the different environments.
3. add provisioning profiles for the different environments.

## Xcode
### Create an empty base project in Xcode.
Configure signing & capabilities for different environments.

1. Debug
2. Development
3. Staging
4. Production
   
### Configure analytics, crash reporting, and static file analysis tools.

1. Integrate Sentry for error tracking.
2. Use SonarCloud for code quality analysis.
3. Configure Android Lint for static code analysis.
4. Set up Detekt for Kotlin code analysis.

## CI/CD

### AppCenter
1. Log into AppCenter account and create a new project  
**Make sure that you create the project under the NanoGiants GmbH group**

2. Configure the necessary build and distribution settings in AppCenter.
3. Set up distribution group for iOS and add the collaborators group.

**Naming:**  
Project: `"PROJECT-App-BUILDTYPE"` (e.g. NanoGiants-App-Develop)  
DistributionGroup: `"PROJECT-PLATFORM"` (e.g. NanoGiants-iOS)  

### Bitrise
1. Create a Bitrise project for continuous integration and deployment.
2. Copy and adjust the base .yaml file into the Bitrise project.  
**TODO**: create base .yaml  
3. Configure code signing and files in the Bitrise project.
    1. Upload the `provisioning profiles`
    2. Upload the `code signing certificates`
    3. Upload the AppStore AuthKey .p8 file (this)
    4. if needed, upload the `.xcconfig`-files for every environment.  
    **TODO**: link and upload shell script into the repository
4. Manage secrets in Bitrise to securely store sensitive information.
    1. AppCenter Token
    2. GitHub Access Token
    3. Danger API Token
    4. SonarToken
    5. Appstore API IssuerID