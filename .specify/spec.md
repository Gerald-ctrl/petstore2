# Project Specification — Petstore

## What We're Building

A full-stack pet e-commerce platform where users can browse and purchase pets, and admins can manage the pet catalogue.

## Why We're Building It

To demonstrate spec-driven AI development using Spec-kit, with a real-world full-stack application as the deliverable.

## User Stories

### Shopper
- As a shopper, I can browse a gallery of available pets so I can find one I want.
- As a shopper, I can filter pets by species, status, and price range.
- As a shopper, I can search pets by name or breed.
- As a shopper, I can view a detailed page for each pet.

### Admin
- As an admin, I can create a new pet listing with all attributes.
- As an admin, I can update any pet's details.
- As an admin, I can delete a pet from the catalogue.
- As an admin, I can change a pet's status (Available, Pending, Sold).

## Functional Requirements

1. **REST API** with CRUD endpoints for `Pet` resource.
2. **PostgreSQL** persistent storage for all pet data.
3. **Pet Gallery** — responsive grid with category/status/price filters.
4. **Admin Panel** — table with inline actions for create/edit/delete.
5. **Pet Detail Page** — full info display.

## Non-Functional Requirements

- API response time < 500ms for all reads.
- Frontend loads < 3s on first paint.
- Mobile-responsive layout (breakpoints: sm, md, lg, xl).
- Premium dark-mode UI design.
