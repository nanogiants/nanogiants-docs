# Sentry React Native


### Getting Started
Install all needed dependencies:
* [@sentry/react-native](https://www.npmjs.com/package/@sentry/react-native)

```bash
npm i @sentry/react-native
#or
yarn add @sentry/react-native
```

Run the Sentry wizard to automatically patch native files. (Hint: The wizard doesn't support React Native versions 0.68 and older)  
**Remember to work on a clean workspace and commit current changes. So in case of failure you don't mess up your code.**
```bash
npx @sentry/wizard@latest -s -i reactNative
```

The wizard creates two sentry.properties files. One in the android and one in the ios native directories.  
Add `sentry.properties` to `.gitignore` as it contains the secret access token for your CI.  
You can copy the contents of this file as base64 and add it as a secret in your workflow.
```bash
# This copies the file to your clipboard
cat ios/sentry.properties | openssl base64 | tr -d '\n' | pbcopy
```
Add the base64 string as a secret to your github repository like `SENTRY_PROPERTIES_FILE_BASE64` with the content of your clipboard  
In your CI you can use something like this to recreate the file
```yaml
- name: Add sentry.properties files
  run: |
    echo "$SENTRY_PROPERTIES_FILE_BASE64" | base64 --decode > ios/sentry.properties
    echo "$SENTRY_PROPERTIES_FILE_BASE64" | base64 --decode > android/sentry.properties
```

For monorepos or when your react-native application is not present in your repository root you have to make a slight change to your ios `project.pbxproj` file.  
Search for the `Bundle React Native code and images` task and add `export PROJECT_ROOT=".."` to the top of the shellScript command. Right before the `export SENTRY_PROPERTIES...`


### Setting up the SDK
The previous steps should have set the stage to actually use the sentry sdk.  

First you need to initialize the SDK like so:

```ts
// you could write a wrapperservice like a trackingservice which handles this for you.
Sentry.init({
  // you don't need to make your dsn string a secret.
  dsn: 'your_dsn_string',
  tracesSampleRate: 1.0,
  environment: ENVIRONMENT,
  // to disable the tracking rerun init with enabled: false
  enabled: true
});
```

> **Important:** Do NOT add `release` or `dist` to your Sentry.init config.

Sentry automatically does this for you in the following pattern:  
`release=bundleId@bundleVersion+BuildNumber` - for example: `com.nanogiants.appname.develop@1.0.0+1`  
`dist=BuildNumber` - for example: `1`  
This needs to stay on the defaults because the sourcemap generation in the build process also uploads the artifacts with these parameters. If you rename one of them the stacktraces in the sentry.io dashboard will not resolve correctly.
This way all of your environment builds can have separate sourcemaps on sentry.io

Lastly wrap your app with
```ts
Sentry.wrap(App)
```
to have automatic error captures.

### Using the SDK
You could make a dedicated trackingservice which abstacts some logic for you.
But to capture a handled error you simply could do

```ts
const someTaskThatCouldFail = () => {
    try{
        throw Error()
    } catch (e) {
        Sentry.captureError(e)
    }
}
```

