# Sentry


### What is Sentry?
Sentry is an open-source software platform that specializes in error monitoring and crash reporting for applications.  
It helps us to track, identify, and resolve issues that occur within our software applications in real-time.  
By capturing and analyzing errors, exceptions, and crashes, Sentry provides valuable insights into the health and stability of our applications, allowing us to proactively address issues and improve overall software quality.

### What do we track
As the first iteration of implementing Sentry in our products we only track crashes and no further tracing.
Crashes can be handled (like in try/catch) and unhandled (like complete server crash).  
Sentry also tracks console logs (log, info, warning, error) by default and therefore kind serves as log rotation tool.

### What are sourcemaps?
Source maps in TypeScript are files that provide a mapping between the generated JavaScript code and the original TypeScript code. When TypeScript code is compiled into JavaScript for deployment, source maps allow developers to debug and trace issues in the original TypeScript source code rather than the generated JavaScript code. They enable the browser's developer tools to display and link errors, breakpoints, and console logs back to the corresponding lines and files in the TypeScript source code, making it easier to identify and fix bugs during development. Sentry needs sourcemaps to point to the correct stacktraces when an error is captured.

> We must never provide a production build without having sourcemaps in place as it makes it harder for us to track errors and thus compromises the whole premise of using sentry in the first place

The detailed framework sections will show how to do that.  

### How do we track?
These documents describe how to implement the sentry SDKs in our common frameworks:

* [React Native](./react-native.md)
* [Nestjs](./nestjs.md)