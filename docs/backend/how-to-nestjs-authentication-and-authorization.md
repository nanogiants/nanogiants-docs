# Implementation of Authentication and Authorization with NestJS

## Table of Contents

- [Introduction](#introduction)
- [Implementation Steps](#implementation-steps)
  - [Setting Up Dependencies](#step-1-setting-up-dependencies)
  - [Implementing Authentication](#step-2-implementing-authentication)
    - [Authentication Strategy (Local Strategy)](#authentication-strategy-local-strategy)
    - [Authentication Strategy (JWT)](#authentication-strategy-jwt)
  - [Implementing Authorization](#step-3-implementing-authorization)
    - [RBAC (Role-Based Access Control)](#rbac-role-based-access-control)
    - [Claims-Based Authorization](#claims-based-authorization)
    - [CASL (Centralized Access Control List)](#casl-centralized-access-control-list)
    - [Comparison of Authorization Approaches](#comparison-of-authorization-approaches)
- [Conclusion](#conclusion)

## Introduction

[Authentication](https://docs.nestjs.com/security/authentication) and [authorization](https://docs.nestjs.com/security/authorization) are essential aspects of backend development to ensure secure access to resources. In this guide, we'll cover how to implement these features using NestJS.

**[back to top](#table-of-contents)**

## Implementation Steps

### Step 1: Setting Up Dependencies

First, install required packages for authentication and authorization:

```bash
npm install @nestjs/passport passport passport-local passport-jwt bcrypt
npm install @nestjs/jwt
```

**[back to top](#table-of-contents)**

### Step 2: Implementing Authentication

(see: [NestJS Docs](https://docs.nestjs.com/security/authentication))

#### Authentication Strategy (Local Strategy)

1. **Create an Auth Module:**

   Create an authentication module (`auth.module.ts`) where authentication strategies and services will be defined.

   ```typescript
   // auth.module.ts
   import { Module } from '@nestjs/common';
   import { AuthService } from './auth.service';
   import { LocalStrategy } from './local.strategy';

   @Module({
     providers: [AuthService, LocalStrategy],
     exports: [AuthService], // Export AuthService for use in other modules
   })
   export class AuthModule {}
   ```

2. **Implement Local Strategy:**

   Create a local strategy (`local.strategy.ts`) for authenticating users based on username and password.

   ```typescript
   // local.strategy.ts
   import { Strategy } from 'passport-local';
   import { PassportStrategy } from '@nestjs/passport';
   import { Injectable, UnauthorizedException } from '@nestjs/common';
   import { AuthService } from './auth.service';

   @Injectable()
   export class LocalStrategy extends PassportStrategy(Strategy) {
     constructor(private readonly authService: AuthService) {
       super();
     }

     async validate(username: string, password: string): Promise<any> {
       const user = await this.authService.validateUser(username, password);
       if (!user) {
         throw new UnauthorizedException();
       }
       return user;
     }
   }
   ```

3. **Create Auth Service:**

   Implement an authentication service (`auth.service.ts`) where user validation and token generation are handled.

   ```typescript
   // auth.service.ts
   import { Injectable } from '@nestjs/common';
   import { JwtService } from '@nestjs/jwt';
   import { UserService } from '../user/user.service';
   import { User } from '../user/user.entity';
   import bcrypt from 'bcrypt';

   @Injectable()
   export class AuthService {
     constructor(
       private readonly userService: UserService,
       private readonly jwtService: JwtService
     ) {}

     async validateUser(username: string, password: string): Promise<any> {
       const user = await this.userService.findByUsername(username);
       if (user && bcrypt.compareSync(password, user.password)) {
         const { password, ...result } = user;
         return result;
       }
       return null;
     }

     async login(user: User) {
       const payload = { username: user.username, sub: user.userId };
       return {
         access_token: this.jwtService.sign(payload),
       };
     }
   }
   ```

4. **Integration with Controllers:**

   Integrate authentication with your controllers to handle login requests and issue JWT tokens.

   ```typescript
   // auth.controller.ts
   import { Controller, Request, Post, UseGuards } from '@nestjs/common';
   import { AuthGuard } from '@nestjs/passport';
   import { AuthService } from './auth.service';
   import { LocalAuthGuard } from './local-auth.guard';

   @Controller('auth')
   export class AuthController {
     constructor(private readonly authService: AuthService) {}

     @UseGuards(LocalAuthGuard)
     @Post('login')
     async login(@Request() req) {
       return this.authService.login(req.user);
     }
   }
   ```

**[back to top](#table-of-contents)**

#### Authentication Strategy (JWT)

If you also want to implement JWT (JSON Web Token) strategy, add the following:

1. **JWT Strategy:**

   Implement JWT strategy (`jwt.strategy.ts`) for token validation and user extraction.

   ```typescript
   // jwt.strategy.ts
   import { Strategy, ExtractJwt } from 'passport-jwt';
   import { PassportStrategy } from '@nestjs/passport';
   import { Injectable } from '@nestjs/common';
   import { configService } from './constants';
   import { UserService } from '../user/user.service';

   @Injectable()
   export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(
       private readonly userService: UserService,
       private readonly configService: ConfigService
     ) {
       super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get('JWT_SECRET'),
       });
     }

     async validate(payload: any) {
       return this.userService.findById(payload.sub);
     }
   }
   ```

2. **JWT Secret:**

   For JWT (JSON Web Token) implementation, you need a secret key to sign and verify tokens. This secret should be securely stored and managed. Here’s how you can manage the JWT Secret in your NestJS application:

   #### Create a Configuration Service

   First, create a configuration service (`config.service.ts`) to manage environment variables and configuration values. This service will fetch the JWT secret from your environment variables or configuration files.

   ```typescript
   // config.service.ts
   import { Injectable } from '@nestjs/common';

   @Injectable()
   export class ConfigService {
     private readonly envConfig: Record<string, string>;

     constructor() {
       this.envConfig = {
         JWT_SECRET: process.env.JWT_SECRET, // Set this in your environment variables
       };
     }

     get(key: string): string {
       return this.envConfig[key];
     }
   }
   ```

   #### Set JWT_SECRET in Environment Variables

   Ensure you set the `JWT_SECRET` environment variable in your deployment environment or local development environment. This secret is crucial for securing your JWT tokens.

   For example in your `.env` file:

   ```
   JWT_SECRET=my_secret_key
   ```

   #### Accessing JWT Secret in JwtStrategy

   Modify your `jwt.strategy.ts` to use the `ConfigService` to fetch the JWT secret:

   ```typescript
   // jwt.strategy.ts
   import { Strategy, ExtractJwt } from 'passport-jwt';
   import { PassportStrategy } from '@nestjs/passport';
   import { Injectable } from '@nestjs/common';
   import { ConfigService } from './config.service'; // Adjust the import based on your actual file structure
   import { UserService } from '../user/user.service';

   @Injectable()
   export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(
       private readonly userService: UserService,
       private readonly configService: ConfigService
     ) {
       super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get('JWT_SECRET'), // Fetch JWT_SECRET from ConfigService
       });
     }

     async validate(payload: any) {
       return this.userService.findById(payload.sub);
     }
   }
   ```

   #### Usage in Module

   Ensure you provide the `ConfigService` and `JwtStrategy` in your module:

   ```typescript
   // app.module.ts
   import { Module } from '@nestjs/common';
   import { JwtModule } from '@nestjs/jwt';
   import { ConfigModule } from './config.module'; // Adjust the import based on your actual file structure
   import { UserService } from '../user/user.service';
   import { JwtStrategy } from './jwt.strategy';

   @Module({
     imports: [
       ConfigModule, // Import your ConfigModule that provides ConfigService
       JwtModule.register({
         secret: process.env.JWT_SECRET, // Optional: Directly provide secret here for JwtModule if needed
       }),
     ],
     providers: [UserService, JwtStrategy],
     exports: [UserService, JwtStrategy], // Export JwtStrategy to be used in other modules
   })
   export class AppModule {}
   ```

   #### Summary

   - **JWT Secret** is a crucial part of JWT security. It should be securely managed and stored.
   - Use a `ConfigService` to fetch the JWT secret from environment variables or configuration files.
   - Ensure the `JwtStrategy` uses the `ConfigService` to fetch the JWT secret for token verification.

**[back to top](#table-of-contents)**

### Step 3: Implementing Authorization

(see: [NestJS Docs](https://docs.nestjs.com/security/authorization))

#### RBAC (Role-Based Access Control)

RBAC is a widely-used approach to access control where permissions are assigned to roles, and roles are assigned to users. It simplifies management and ensures consistency in access control policies.

1. **Extend User Entity:**

   Modify your user entity (`user.entity.ts`) to include a role field.

   ```typescript
   // user.entity.ts
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ unique: true })
     username: string;

     @Column()
     password: string;

     @Column()
     role: string; // Role field for RBAC
   }
   ```

2. **Authorization Guard:**

   Implement an authorization guard (`roles.guard.ts`) to restrict access based on roles.

   ```typescript
   // roles.guard.ts
   import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
   import { Reflector } from '@nestjs/core';
   import { UserService } from '../user/user.service';

   @Injectable()
   export class RolesGuard implements CanActivate {
     constructor(
       private reflector: Reflector,
       private userService: UserService
     ) {}

     async canActivate(context: ExecutionContext): Promise<boolean> {
       const roles = this.reflector.get<string[]>(
         'roles',
         context.getHandler()
       );

       if (!roles) {
         return true; // No specific roles required, allow access
       }

       const request = context.switchToHttp().getRequest();
       const user = await this.userService.findById(request.user.userId);

       const hasRole = () => roles.includes(user.role);

       return user && user.role && hasRole();
     }
   }
   ```

3. **Roles Decorator:**

   Create a roles decorator (`roles.decorator.ts`) to define roles for endpoints.

   ```typescript
   // roles.decorator.ts
   import { SetMetadata } from '@nestjs/common';

   export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
   ```

4. **Applying Roles Guard:**

   Apply the roles guard to your controller endpoints using the roles decorator.

   ```typescript
   // roles.controller.ts
   import { Controller, Get, UseGuards } from '@nestjs/common';
   import { RolesGuard } from './roles.guard';
   import { Roles } from './roles.decorator';

   @Controller('roles')
   @UseGuards(RolesGuard)
   export class RolesController {
     @Get()
     @Roles('admin')
     async adminRoute() {
       // Only accessible to users with 'admin' role
       return { message: 'Access Granted!' };
     }
   }
   ```

**[back to top](#table-of-contents)**

#### Claims-Based Authorization

Claims-based authorization allows defining specific claims (attributes or properties) associated with a user and making access decisions based on these claims. It offers flexibility but requires careful management of claims.

1. **Extend User Entity:**

   Ensure your user entity (`user.entity.ts`) includes fields for additional claims.

   ```typescript
   // user.entity.ts
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ unique: true })
     username: string;

     @Column()
     password: string;

     @Column('simple-json', { nullable: true })
     claims: { [key: string]: any }; // Claims field for additional attributes
   }
   ```

2. **Authorization Guard:**

   Implement an authorization guard (`claims.guard.ts`) to check for specific claims in the JWT payload or user entity and grant/deny access accordingly.

   ```typescript
   // claims.guard.ts
   import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
   import { Reflector } from '@nestjs/core';
   import { UserService } from '../user/user.service';

   @Injectable()
   export class ClaimsGuard implements CanActivate {
     constructor(
       private reflector: Reflector,
       private userService: UserService
     ) {}

     async canActivate(context: ExecutionContext): Promise<boolean> {
       const requiredClaims = this.reflector.get<string[]>(
         'requiredClaims',
         context.getHandler()
       );

       if (!requiredClaims) {
         return true; // No specific claims required, allow access
       }

       const request = context.switchToHttp().getRequest();
       const user = await this.userService.findById(request.user.userId);

       if (!user || !user.claims) {
         return false; // No user or claims available
       }

       const hasRequiredClaims = requiredClaims.every((claim) =>
         user.claims.hasOwnProperty(claim)
       );

       return hasRequiredClaims;
     }
   }
   ```

3. **Claims Decorator:**

   Create a decorator (`claims.decorator.ts`) to specify required claims for endpoints.

   ```typescript
   // claims.decorator.ts
   import { SetMetadata } from '@nestjs/common';

   export const Claims = (...claims: string[]) =>
     SetMetadata('requiredClaims', claims);
   ```

4. **Applying Claims Guard:**

   Apply the claims guard to controller endpoints using the claims decorator.

   ```typescript
   // claims.controller.ts
   import { Controller, Get, UseGuards } from '@nestjs/common';
   import { ClaimsGuard } from './claims.guard';
   import { Claims } from './claims.decorator';

   @Controller('claims')
   @UseGuards(ClaimsGuard)
   export class ClaimsController {
     @Get()
     @Claims('canViewProfile')
     async getProfile() {
       // Only accessible to users with 'canViewProfile' claim
       return { message: 'Access Granted!' };
     }
   }
   ```

**[back to top](#table-of-contents)**

#### CASL (Centralized Access Control List)

CASL provides a way to manage and check permissions in a more granular and expressive manner based on attributes and conditions. It can complement RBAC and claims-based approaches by offering dynamic access control rules.

1. **Integrating CASL:**

   Install CASL and set up permissions based on roles and attributes in your application.

   ```bash
   npm install @casl/ability
   ```

2. **CASL Service/Helper:**

   Implement a CASL service/helper (`casl-ability.helper.ts`) to define and check permissions based on user roles and attributes.

   ```typescript
   // casl-ability.helper.ts
   import { AbilityBuilder, Ability } from '@casl/ability';
   import { Injectable } from '@nestjs/common';
   import { User } from '../user/user.entity';

   @Injectable()
   export class CaslAbilityHelper {
     createForUser(user: User): Ability {
       const { can, cannot, build } = new AbilityBuilder(Ability);

       if (user.role === 'admin') {
         can('manage', 'all'); // Admins can manage all resources
       } else {
         can('read', 'publicResources'); // Regular users can read public resources
       }

       return build();
     }
   }
   ```

3. **Using CASL in Guards:**

   Integrate CASL in your guards or middleware to check permissions based on user roles and attributes.

   ```typescript
   // casl.guard.ts
   import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
   import { Reflector } from '@nestjs/core';
   import { CaslAbilityHelper } from './casl-ability.helper';
   import { User } from '../user/user.entity';

   @Injectable()
   export class CaslGuard implements CanActivate {
     constructor(
       private reflector: Reflector,
       private caslAbilityHelper: CaslAbilityHelper
     ) {}

     async canActivate(context: ExecutionContext): Promise<boolean> {
       const requiredPermissions = this.reflector.get<string[]>(
         'requiredPermissions',
         context.getHandler()
       );

       if (!requiredPermissions) {
         return true; // No specific permissions required, allow access
       }

       const request = context.switchToHttp().getRequest();
       const user: User = request.user; // Assuming user is authenticated and available

       const ability = this.caslAbilityHelper.createForUser(user);
       const hasPermission = requiredPermissions.every((permission) =>
         ability.can(permission, 'someResource')
       );

       return hasPermission;
     }
   }
   ```

4. **CASL Decorator:**

   Create a decorator (`casl.decorator.ts`) to specify required permissions for endpoints.

   ```typescript
   // casl.decorator.ts
   import { SetMetadata } from '@nestjs/common';

   export const CaslPermissions = (...permissions: string[]) =>
     SetMetadata('requiredPermissions', permissions);
   ```

5. **Applying CASL Guard:**

   Apply the CASL guard to controller endpoints using the CASL decorator.

   ```typescript
   // casl.controller.ts
   import { Controller, Get, UseGuards } from '@nestjs/common';
   import { CaslGuard } from './casl.guard';
   import { CaslPermissions } from './casl.decorator';

   @Controller('casl')
   @UseGuards(CaslGuard)
   export class CaslController {
     @Get()
     @CaslPermissions('read', 'someResource')
     async readSomeResource() {
       // Access granted if user has 'read' permission on 'someResource'
       return { message: 'Access Granted!' };
     }
   }
   ```

**[back to top](#table-of-contents)**

#### Comparison of Authorization Approaches

Here's a comparative summary of RBAC, claims-based authorization, and CASL:

- **RBAC:**

  - **Advantages:** Simple to manage, well-suited for applications with clearly defined roles (admin, user, etc.), promotes consistency in access control policies.
  - **Disadvantages:** May not provide enough granularity for complex access control needs, roles can become bloated if not managed properly.

- **Claims-Based Authorization:**

  - **Advantages:** Offers flexibility by allowing fine-grained access control based on specific claims or attributes associated with users.
  - **Disadvantages:** Requires careful management of claims to avoid security vulnerabilities, may become complex as the number of claims grows.

- **CASL (Centralized Access Control List):**
  - **Advantages:** Provides dynamic and expressive access control rules based on user attributes and roles, allows for complex permissions without bloating role definitions.
  - **Disadvantages:** Introduces additional complexity to manage and maintain authorization rules, requires integration with application logic.

Choosing the right authorization approach (RBAC, claims-based, or CASL) depends on your application's complexity, security requirements, and management preferences. RBAC is straightforward and effective for many applications but may lack the flexibility needed in dynamic environments. Claims-based authorization offers more flexibility but requires careful management. CASL provides powerful capabilities for fine-grained access control but introduces additional complexity. Consider your application's specific needs and security considerations when selecting and implementing an authorization strategy.

**[back to top](#table-of-contents)**

## Conclusion

By following these steps, you can implement authentication and authorization in your NestJS backend application.

For advanced features like OAuth2, additional strategies and configurations may be required, but the basic principles remain consistent. Always ensure to follow security best practices and keep your authentication and authorization mechanisms updated.

**[back to top](#table-of-contents)**
