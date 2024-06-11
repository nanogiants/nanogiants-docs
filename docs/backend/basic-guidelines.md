# Basic Guidelines for Backend Projects

## Table of Contents

- [Frameworks](#1-frameworks)
  - [NestJS](#nestjs)
- [Architecture](#2-architecture)
  - [Monolithic Architecture](#monolithic-architecture)
  - [Microservice Architecture](#microservice-architecture)
- [Design Principles of a REST API](#3-design-principles-of-a-rest-api)
  - [Resource-Based URLs](#1-resource-based-urls)
  - [HTTP Methods](#2-http-methods)
  - [Statelessness](#3-statelessness)
  - [Consistent and Meaningful Responses](#4-consistent-and-meaningful-responses)
  - [Versioning](#5-versioning)
  - [Pagination, Filtering and Sorting](#6-pagination-filtering-and-sorting)
  - [Security](#7-security)
  - [(Optional) HATEOAS (Hypermedia as the Engine of Application State)](#optional-8-hateoas-hypermedia-as-the-engine-of-application-state)
- [Documentation Guidelines](#4-documentation-guidelines)
  - [API Documentation](#api-documentation)
  - [Backend Documentation](#backend-documentation)
- [Testing Guidelines](#5-testing-guidelines)
  - [Unit Testing](#unit-testing)
  - [(Optional) Integration Testing](#optional-integration-testing)
  - [Best Practices](#best-practices)

## 1. Frameworks

### **NestJS:**

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and follows the modular architecture pattern.

**[back to top](#table-of-contents)**

## 2. Architecture

### **Monolithic Architecture:**

- **Definition:** A monolithic architecture is a unified model for designing software where all the components of the application are interconnected and interdependent. It usually includes the presentation layer, business logic layer, and data access layer in a single application.
- **Layers:**

  - Presentation Layer (Controllers)
  - Business Logic Layer (Services)
  - Data Access Layer (Repositories)
  - Database

- **Diagram:**

  ```mermaid
  graph TD
  A[Presentation Layer]
  A --> B[Business Logic Layer]
  B --> C[Data Access Layer]
  C --> D[Database]
  ```

- **Advantages:**
  - Simplicity in development and deployment.
  - Easier to manage and maintain in the initial stages.
- **Disadvantages:**
  - Scalability issues as the application grows.

### **Microservice Architecture:**

- **Definition:** A microservice architecture structures an application as a collection of loosely coupled, independently deployable services. Each service is self-contained and focuses on a single business capability.
- **Components:**

  - Multiple Microservices
  - API Gateway
  - Service Registry

- **Diagram:**

  ```mermaid
  graph TD
  A[API Gateway]
  A --> B1[Microservice 1]
  A --> B2[Microservice 2]
  A --> B3[Microservice 3]

  subgraph Service Registry
      SR[Service Registry]
  end

  B1 --> SR
  B2 --> SR
  B3 --> SR

  subgraph Microservice 1
      B1[Presentation Layer]
      B1 --> C1[Business Logic Layer]
      C1 --> D1[Data Access Layer]
      D1 --> E1[Database]
  end

  subgraph Microservice 2
      B2[Presentation Layer]
      B2 --> C2[Business Logic Layer]
      C2 --> D2[Data Access Layer]
      D2 --> E2[Database]
  end

  subgraph Microservice 3
      B3[Presentation Layer]
      B3 --> C3[Business Logic Layer]
      C3 --> D3[Data Access Layer]
      D3 --> E3[Database]
  end
  ```

  - **Explanation:**

    - **API Gateway:**

      - Acts as a single entry point for client requests, routing them to the appropriate microservice.
      - It can also handle cross-cutting concerns like authentication, logging, rate limiting, etc.

    - **Service Registry:**
      - **Role:** Manages the registration and discovery of microservices.
      - **Functionality:** Keeps track of all available microservices and their instances.

- **Advantages:**
  - Improved scalability and flexibility.
  - Each service can be developed, deployed, and scaled independently.
- **Disadvantages:**
  - Increased complexity in management.
  - Requires a robust infrastructure for inter-service communication and fault tolerance.

**[back to top](#table-of-contents)**

## 3. Design Principles of a REST API

When designing a REST API, it’s essential to follow certain principles to ensure that the API is robust, scalable, and easy to use. These principles provide a framework for building APIs that are consistent, intuitive, and maintainable.

### 1. **Resource-Based URLs**

- **Principle:** Use nouns to represent resources in URLs.
- **Example:** `/user`, `/order`, `/product`
- **Explanation:** Each URL should represent a specific resource, and actions on resources are determined by the HTTP methods used.

### 2. **HTTP Methods**

- **Principle:** Use appropriate HTTP methods for actions.
  - **GET:** Retrieve data from the server.
  - **POST:** Create a new resource on the server.
  - **PUT:** Update an existing resource on the server (replaces the entire resource).
  - **PATCH:** Update an existing resource on the server (modifies specific fields).
  - **DELETE:** Remove a resource from the server.
- **Explanation:** Using standard HTTP methods makes the API more intuitive and predictable.

### 3. **Statelessness**

- **Principle:** Each request from a client should contain all the information the server needs to fulfill that request.
- **Explanation:** The server should not store any state about the client session. This makes the API scalable and easier to maintain.

### 4. **Consistent and Meaningful Responses**

- **Principle:** Ensure that API responses are consistent and provide meaningful information.
  - **HTTP Status Codes:** Use appropriate status codes to indicate the result of the request.
    - **200 OK:** Successful GET, PUT, DELETE request.
    - **201 Created:** Successful POST request.
    - **204 No Content:** Successful request that does not return any content.
    - **400 Bad Request:** Invalid request parameters.
    - **401 Unauthorized:** Authentication required or failed.
    - **403 Forbidden:** Client authenticated but not authorized.
    - **404 Not Found:** Resource not found.
    - **500 Internal Server Error:** Server encountered an error.
    - ...
  - **Error Messages:** Provide clear and meaningful error messages.
  - **Data Format:** Use a consistent format for data, typically JSON.
- **Explanation:** Clear and consistent responses help clients handle different scenarios effectively.

### 5. **Versioning**

- **Principle:** Use versioning to manage changes in the API without disrupting existing clients.
- **Approaches:**
  - **URI Versioning:** Include the version in the URL (e.g., `/v1/user`).
  - **Header Versioning:** Use custom headers to specify the version (e.g., `X-API-Version: 1`).
- **Explanation:** Versioning ensures backward compatibility and allows for continuous improvement of the API.

### 6. **Pagination, Filtering and Sorting**

- **Principle:** Provide mechanisms to handle large sets of data.
  - **Pagination:** Split large data sets into pages (e.g., `GET /user?page=2&limit=50`).
  - **Filtering:** Allow clients to filter results based on criteria (e.g., `GET /user?role=admin`).
  - **Sorting:** Allow sorting of results (e.g., `GET /user?sort=name&order=asc`).
- **Explanation:** These features improve performance and provide flexibility to clients.

### 7. **Security**

- **Principle:** Ensure the API is secure to protect sensitive data and prevent unauthorized access.
  - **Authentication:** Verify the identity of users (e.g., OAuth, JWT).
  - **Authorization:** Control access to resources (e.g., roles and permissions).
  - **Data Encryption:** Use HTTPS to encrypt data in transit.
  - **Input Validation:** Validate and sanitize inputs to prevent attacks like SQL injection and XSS.
- **Explanation:** Security is critical to protect both the API and its users.

### (Optional) 8. **HATEOAS (Hypermedia as the Engine of Application State)**

- **Principle:** Include hyperlinks in responses to guide clients on possible actions.
- **Example:** A response for a user resource might include links to related resources like user orders.
- **Explanation:** HATEOAS enhances discoverability and navigability of the API.

By following these design principles, you can create REST APIs that are robust, scalable, and easy to use, meeting the needs of both developers and users.

**[back to top](#table-of-contents)**

## 4. Documentation Guidelines

Documentation is a critical aspect of backend development, ensuring that developers can understand and work with the code effectively.

### API Documentation

Comprehensive API documentation is essential for understanding and interacting with the API.

1. **API Specification**

   - **Principle:** Define the API using a standard specification like OpenAPI/Swagger.
   - **Explanation:** This helps in generating interactive API documentation and client libraries.

2. **Usage Examples**

   - **Principle:** Include examples of requests and responses for each endpoint.
   - **Explanation:** Examples make it easier for developers to understand how to interact with the API.

3. **Error Codes**

   - **Principle:** Document possible error codes and their meanings.
   - **Explanation:** Clear error documentation helps developers debug and handle errors appropriately.

4. **Authentication Details**
   - **Principle:** Explain how to authenticate and authorize requests.
   - **Explanation:** Clear authentication instructions ensure that developers can securely access the API.

### Backend Documentation

In addition to API documentation, comprehensive backend documentation covers various aspects of the backend development process.

1. **Architecture Overview**

   - **Principle:** Provide an overview of the backend architecture, including high-level components and their interactions.
   - **Explanation:** Understanding the architecture helps developers navigate the codebase and make informed design decisions.

2. **Database Schema**

   - **Principle:** Document the structure of the database, including tables, columns, relationships, and constraints.
   - **Explanation:** Database schema documentation assists developers in understanding data models and query requirements.

3. **Configuration**

   - **Principle:** Document configuration settings for the backend, including environment variables, database connections, and external service endpoints.
   - **Explanation:** Clear configuration documentation facilitates deployment and troubleshooting in different environments.

4. **Deployment Instructions**

   - **Principle:** Provide step-by-step instructions for deploying the backend application, including setting up servers, installing dependencies, and configuring environments.
   - **Explanation:** Deployment instructions ensure smooth and consistent deployment processes across development, staging, and production environments.

5. **Development Guidelines**

   - **Principle:** Outline guidelines and best practices for backend development, covering coding standards, directory structure, version control practices, and code review processes.
   - **Explanation:** Development guidelines promote consistency, collaboration, and maintainability in the codebase.

6. **API Versioning Strategy**

   - **Principle:** Define a strategy for versioning the API to manage changes and ensure backward compatibility.
   - **Explanation:** API versioning strategy documentation helps developers understand how to introduce and manage API changes effectively.

7. **Monitoring and Logging**

   - **Principle:** Document monitoring and logging practices, including metrics to track, logging formats, and tools used for monitoring and analysis.
   - **Explanation:** Monitoring and logging documentation aids in identifying and troubleshooting issues in the production environment.

8. **Security Practices**
   - **Principle:** Describe security measures implemented in the backend, such as encryption protocols, authentication mechanisms, input validation, and access control policies.
   - **Explanation:** Security practices documentation ensures that sensitive data is protected and compliance requirements are met.

Backend documentations provide crucial insights into the backend system's design, implementation, and maintenance. While they are typically part of the arc42 documentation, they can also be stored within the project's GitHub repository or another appropriate location.

**[back to top](#table-of-contents)**

## 5. Testing Guidelines

Testing ensures the reliability and correctness of the API. It is crucial for maintaining the quality and stability of the API as it evolves.

### Unit Testing:

- **Principle:** Test individual components of the API to ensure they work as expected.
- **Explanation:** Unit tests help catch bugs early in the development process.
- **Scope:** Individual functions or methods.
- **Tools:** Jest (with NestJS).
- **What to Test:**
  - Correctness of individual functions.
  - Edge cases and error handling.

### (Optional) Integration Testing:

- **Principle:** Test interactions between components and with external systems.
- **Explanation:** Integration tests ensure that different parts of the system work together correctly.
- **Scope:** Interactions between multiple components or services.
- **Tools:** Supertest (with Jest and NestJS).
- **What to Test:**
  - API endpoints and their responses.
  - Database interactions.
  - Service communication.

### Best Practices:

- Write clear, concise, and isolated tests.
- Follow the AAA (Arrange, Act, Assert) pattern.
- Use mocks and stubs where appropriate to isolate dependencies.
- Ensure high code coverage, but prioritize meaningful tests over coverage metrics.
- Automate tests to run on every commit using CI/CD pipelines.

**[back to top](#table-of-contents)**
