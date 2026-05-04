# Task Tracker API

API for task management, allowing users to create, organize, and track their activities. The goal of this project is to demonstrate good practices in REST API development, including code structure, testing, and database integration.

## Project Status

In early development

## Features

### Implemented

- Initial project structure
- Basic server setup
- Task CRUD operations

### Planned

- User system
- JWT authentication
- Data validation
- Pagination and filtering
- PostgreSQL integration
- Automated tests
- Docker ccontainerization
- API documentation

## Tech Stack

- Node.js
- JavaScript
- PostgreSQL
- Jest

## API Endpoints

```
POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id
```

## Tests

Automated tests will be implemented using Jest.

## Project Structure

```
src/
  controllers/
  services/
  models/
  routes/
  data/
```

## Roadmap

- [ ] Set up PostgreSQL database
- [✔] Implement task CRUD
- [ ] Create user system
- [ ] Implement authentication
- [ ] Add validations
- [ ] Write automated tests
- [ ] Configure deployment
- [ ] Document API with Swagger
