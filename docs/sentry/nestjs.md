# Sentry Nestjs


### Getting Started
Install all needed dependencies:
* [@sentry/node](https://www.npmjs.com/package/@sentry/node)
* [@sentry/integrations](https://www.npmjs.com/package/@sentry/integrations)

```bash
npm i @sentry/node @sentry/integrations
#or
yarn add @sentry/node @sentry/integrations
```

Add the following to your tsconfig
```json
"sourceMap": true,
"inlineSources": true,
"sourceRoot": "/",
```

### Setting up the SDK
You need to create some Filters and Modules to have automatic capturing enabled. Create the following files:

---
`src/SentryExceptionFilter.ts`
```ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    Sentry.captureException(exception);
    super.catch(exception, host);
  }
}
```
---
`src/ngsentry/ngsentry.interceptor.ts`
```ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { catchError, finalize, Observable, throwError } from 'rxjs';

import { NgSentryService } from './ngsentry.service';

/**
 * We must be in Request scope as we inject SentryService
 */
@Injectable({ scope: Scope.REQUEST })
export class NgSentryInterceptor implements NestInterceptor {
  constructor(private sentryService: NgSentryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // start a child span for performance tracing
    const span = this.sentryService.startChild({ op: `route handler` });

    return next.handle().pipe(
      catchError(error => {
        Sentry.captureException(
          error,
          this.sentryService.transaction.getTraceContext(),
        );

        return throwError(() => error);
      }),
      finalize(() => {
        span.finish();
        this.sentryService.transaction.finish();
      }),
    );
  }
}
```
---
`src/ngsentry/ngsentry.module.ts`
```ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { NgSentryInterceptor } from './ngsentry.interceptor';
import { NgSentryService } from './ngsentry.service';

@Module({})
export class NgSentryModule {
  static forRoot(options: Sentry.NodeOptions) {
    // initialization of Sentry, this is where Sentry will create a Hub
    Sentry.init(options);

    return {
      module: NgSentryModule,
      global: true,
      providers: [
        NgSentryService,
        {
          provide: APP_INTERCEPTOR,
          useClass: NgSentryInterceptor,
        },
      ],
      exports: [NgSentryService],
    };
  }
}
```
---
`src/ngsentry/ngsentry.service.ts`
```ts
import { Scope } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { Transaction, SpanContext } from '@sentry/types';
import { Request } from 'express';

/**
 * Because we inject REQUEST we need to set the service as request scoped
 */
@Injectable({ scope: Scope.REQUEST })
export class NgSentryService {
  transaction: Transaction;

  constructor(@Inject(REQUEST) private request: Request) {
    const { method, headers, url, body } = this.request;

    // this transaction gets finished in the interceptor
    // this class is only for having a service which can get used in other services to start and finish spans
    this.transaction = Sentry.startTransaction({
      name: `Route: ${method} ${url}`,
      op: 'transaction',
    });
    this.transaction.setContext('http', {
      method,
      url,
      headers,
      body,
    });
  }

  startChild(spanContext: SpanContext) {
    return this.transaction.startChild(spanContext);
  }
}
```
---
Adjust your `app.module.ts` like so:

```ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';

@Module({
  imports: [
    NgSentryModule.forRoot({
      // this does not have to be a secret
      dsn: 'your_dsn_string',
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      release: process.env.npm_package_version,
      dist: process.env.NODE_ENV,
      integrations: [
        new ExtraErrorData({ depth: 10 }),
        new RewriteFrames({
          iteratee: frame => {
            if (!frame.filename) return frame;
            frame.filename = 'app://' + frame.filename;
            return frame;
          },
        }),
      ],
    }),
// ...
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
```

This should be all to capture errors automatically. Here is a gist that contains the relevant files needed for implementation. Use them as starting point and adjust as needed: https://gist.github.com/nanogiantsgmbh/838fc2e724b328b15502b8b4d0f6b365

### Handling source maps
To get correct stacktraces on sentry.io you need to upload sourcemaps in your CI pipeline.
This can be done with the following:
```yaml
  source-maps:
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 18
      - name: get-npm-version
        id: package-version
        uses: martinbeentjes/npm-get-version-action@v1.3.1
      - name: install deps
        run: npm i
      - name: build
        run: npm run build
      - name: inject sentry source maps
        run: npx @sentry/cli@2.19.1 sourcemaps inject ./dist
      - name: upload sentry source maps
        run: npx @sentry/cli@2.19.1 sourcemaps upload --release=${{ steps.package-version.outputs.current-version}} --dist=production ./dist
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
  build:
    needs: [source-maps]
    ...
```

Keep in mind to adjust the `--dist` target according to your current build environment and add the secrets to your git repository. The `dist` and `version` **must** match the values in the `Sentry.init` call