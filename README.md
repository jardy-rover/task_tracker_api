# Task Tracker API

API for task management, allowing users to create, organize, and track their activities. The goal of this project is to demonstrate good practices in REST API development, including code structure, testing, and database integration.

## Project Status

In development  
Core features implemented.

## Features

### Implemented

- Basic project structure
- REST API structure following layered architecture
- Task CRUD operations (Create, Read, Update, Delete)
- Input validation layer for request safety
- Separation between controllers, services, and validators
- Centralized error handling
- Automated testing with Jest and Supertest

### Planned

- User management system
- Authentication and authorization (JWT)
- Pagination and filtering for task queries
- PostgreSQL database integration
- Docker containerization
- API documentation with Swagger

## Tech Stack

- Node.js
- JavaScript (ES6+)
- Express
- Jest
- Supertest
- PostgreSQL (planned)

## API Endpoints

```

POST /tasks
GET /tasks
GET /tasks/:id
PUT /tasks/:id
DELETE /tasks/:id

```

## Testing

This project uses automated tests to ensure API reliability.

- Jest (unit and integration testing)
- Supertest (HTTP endpoint testing)

### Run tests

```bash
npm test
```

## Project Structure

```
src/
  controllers/
  services/
  routes/
  validators/
tests/
  tasks.test.js
  tasksValidator.test.js
server.js
app.js
```

## Roadmap

- [x] Implement task CRUD
- [x] Add input validation layer
- [x] Create automated tests
- [ ] Integrate PostgreSQL
- [ ] Implement user system
- [ ] Add authentication (JWT)
- [ ] Improve validation coverage
- [ ] Add pagination and filtering
- [ ] Configure deployment pipeline
- [ ] Document API with Swagger
