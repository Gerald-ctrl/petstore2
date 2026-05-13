# Technical Plan — Petstore

## Backend Design

### Technology
- Java 17, Spring Boot 3.2, Spring Data JPA, Hibernate, PostgreSQL 15

### Pet Entity
```
id          BIGSERIAL PRIMARY KEY
name        VARCHAR(255) NOT NULL
species     VARCHAR(100) NOT NULL   -- Dog, Cat, Bird, Fish, Rabbit, Other
breed       VARCHAR(255)
age_months  INTEGER
price       NUMERIC(10,2) NOT NULL
status      VARCHAR(50) DEFAULT 'AVAILABLE'  -- AVAILABLE, PENDING, SOLD
description TEXT
image_url   VARCHAR(500)
created_at  TIMESTAMP DEFAULT NOW()
updated_at  TIMESTAMP DEFAULT NOW()
```

### Layer Architecture
```
PetController  →  PetService  →  PetRepository  →  PostgreSQL
     ↑                ↑
  PetDTO           Pet (Entity)
```

### REST Endpoints
| Method | Path           | Body    | Response       |
|--------|----------------|---------|----------------|
| GET    | /api/pets      | -       | List<PetDTO>   |
| GET    | /api/pets/{id} | -       | PetDTO         |
| POST   | /api/pets      | PetDTO  | PetDTO (201)   |
| PUT    | /api/pets/{id} | PetDTO  | PetDTO (200)   |
| DELETE | /api/pets/{id} | -       | 204 No Content |

### Query Parameters for GET /api/pets
- `species` (String)
- `status` (String)
- `minPrice` (BigDecimal)
- `maxPrice` (BigDecimal)
- `search` (String — searches name + breed)

## Frontend Design

### Pages
1. **GalleryPage** (`/`) — responsive MUI Grid of PetCards + PetFilters sidebar
2. **PetDetailPage** (`/pets/:id`) — full pet detail with image
3. **AdminPage** (`/admin`) — MUI DataGrid with CRUD actions

### Components
- `Navbar` — branding, navigation links
- `PetCard` — MUI Card with image, name, price, status chip, "View" button
- `PetFilters` — species checkboxes, status radio, price range slider, search box
- `PetFormDialog` — MUI Dialog with form for create/edit

### State Management
- React `useState` + `useEffect` for local state
- Axios for HTTP calls via `petApi.js`

### Theming
- MUI dark theme with custom palette (deep purple + amber accent)
- Tailwind for layout utilities

## Infrastructure
- Docker Compose for PostgreSQL
- Backend port: 8080
- Frontend dev server port: 5173
- CORS: allow localhost:5173 in dev
