# Petstore

A full-stack pet e-commerce platform built with **Spec-kit** (Spec-Driven Development), Spring Boot 3, React + Vite, Tailwind CSS, and Material UI.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3, Spring Data JPA |
| Database | PostgreSQL 15 |
| Frontend | React 18, Vite, Tailwind CSS, MUI |
| Dev Workflow | Spec-kit (`.specify/` directory) |

---

## Getting Started

### Prerequisites
- Java 17+
- Node 18+
- Docker & Docker Compose
- Maven 3.8+

### 1. Start PostgreSQL
```bash
docker-compose up -d
```

### 2. Run the Backend
```bash
cd backend
mvn spring-boot:run
```
API will be available at: `http://localhost:8080/api/pets`

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
App will be available at: `http://localhost:5173`

---

## REST API

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/pets` | List pets (supports filters) |
| GET | `/api/pets/{id}` | Get single pet |
| POST | `/api/pets` | Create pet |
| PUT | `/api/pets/{id}` | Update pet |
| DELETE | `/api/pets/{id}` | Delete pet |

### Filter Parameters (GET /api/pets)
- `species` — Dog, Cat, Bird, Fish, Rabbit, Other
- `status` — AVAILABLE, PENDING, SOLD
- `minPrice`, `maxPrice` — price range
- `search` — searches name + breed

---

## Project Structure

```
petstore/
├── .specify/          # Spec-kit: constitution, spec, plan, tasks
├── backend/           # Spring Boot application
├── frontend/          # React + Vite application
├── docker-compose.yml # PostgreSQL setup
└── README.md
```

---

## Spec-Kit Workflow

This project was built using [Spec-kit](https://speckit.org) — a Spec-Driven Development toolkit:

1. **Constitution** — `.specify/constitution.md` — immutable project principles
2. **Spec** — `.specify/spec.md` — what we're building
3. **Plan** — `.specify/plan.md` — technical design
4. **Tasks** — `.specify/tasks.md` — ordered implementation checklist

---

## Deployment (Render)

This project is configured for deployment on **Render** via Blueprint:

1. Connect your GitHub repository to Render.
2. Render will automatically detect the `render.yaml` file.
3. Click **"Apply"** to provision the Postgres database and start the backend/frontend services.
4. **Note**: After the first deployment, you may need to update the frontend API proxy destination in `render.yaml` to match your backend's actual URL.

