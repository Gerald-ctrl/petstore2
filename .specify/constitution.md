# Project Constitution — Petstore

## 1. Immutable Principles

1. **Java 17+** is the minimum JVM version. No deprecated APIs.
2. **Spring Boot 3** conventions are mandatory — use auto-configuration, avoid XML.
3. **Spring Data JPA** is the only ORM layer. No raw JDBC or native queries unless absolutely required.
4. **PostgreSQL** is the only supported database. No H2 or in-memory fallbacks in production config.
5. **REST API** is the sole integration contract between frontend and backend.
6. **React + Vite** is the frontend build system. No Create-React-App.
7. **Tailwind CSS + MUI** are the only styling systems. No inline styles, no plain CSS files except `index.css` globals.
8. **All endpoints must be tested** with at least a smoke test before task is considered complete.
9. **CORS** must be configured explicitly; no wildcard `*` in production.
10. **Git commits** follow Conventional Commits format: `feat:`, `fix:`, `chore:`, `docs:`.

## 2. Coding Standards

- Java: camelCase for methods/fields, PascalCase for classes, SCREAMING_SNAKE_CASE for constants.
- React: functional components only, hooks for state management.
- File naming: React components use PascalCase, utility files use camelCase.

## 3. Architecture Constraints

- Backend follows a strict 3-layer architecture: Controller → Service → Repository.
- No business logic in controllers or repositories.
- DTOs are used at the controller boundary; entities stay within the service/repository layer.
