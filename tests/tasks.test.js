const request = require('supertest');
const app = require('../server');

describe('TASKS API - FULL ROUTES TEST', () => {

    let createdId;

    // =========================
    // POST /tasks
    // =========================
    describe('POST /tasks', () => {

        test('should create task (201)', async () => {
            const res = await request(app)
                .post('/tasks')
                .send({
                    title: 'Task A',
                    description: 'Desc A'
                });

            expect(res.status).toBe(201);
            expect(res.body.data).toHaveProperty('id');

            createdId = res.body.data.id;
        });

        test('should fail when body empty (400)', async () => {
            const res = await request(app)
                .post('/tasks')
                .send({});

            expect(res.status).toBe(400);
        });

        test('should fail when title empty (400)', async () => {
            const res = await request(app)
                .post('/tasks')
                .send({
                    title: '',
                    description: 'Valid'
                });

            expect(res.status).toBe(400);
        });

        test('should fail when description empty (400)', async () => {
            const res = await request(app)
                .post('/tasks')
                .send({
                    title: 'Valid',
                    description: ''
                });

            expect(res.status).toBe(400);
        });

    });

    // =========================
    // GET /tasks
    // =========================
    describe('GET /tasks', () => {

        test('should return tasks list (200)', async () => {
            const res = await request(app).get('/tasks');

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
        });

    });

    // =========================
    // GET /tasks/:id
    // =========================
    describe('GET /tasks/:id', () => {

        test('should return task by id (200)', async () => {
            const res = await request(app).get(`/tasks/${createdId}`);

            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(createdId);
        });

        test('should fail with invalid id (400)', async () => {
            const res = await request(app).get('/tasks/abc');

            expect(res.status).toBe(400);
        });

        test('should return 404 for non-existing id', async () => {
            const res = await request(app).get('/tasks/9999');

            expect(res.status).toBe(404);
        });

    });

    // =========================
    // PUT /tasks/:id
    // =========================
    describe('PUT /tasks/:id', () => {

        test('should update title only (200)', async () => {
            const res = await request(app)
                .put(`/tasks/${createdId}`)
                .send({ title: 'Updated Title' });

            expect(res.status).toBe(200);
            expect(res.body.data.title).toBe('Updated Title');
        });

        test('should update description only (200)', async () => {
            const res = await request(app)
                .put(`/tasks/${createdId}`)
                .send({ description: 'Updated Desc' });

            expect(res.status).toBe(200);
        });

        test('should fail with empty body (400)', async () => {
            const res = await request(app)
                .put(`/tasks/${createdId}`)
                .send({});

            expect(res.status).toBe(400);
        });

        test('should fail when both fields invalid (400)', async () => {
            const res = await request(app)
                .put(`/tasks/${createdId}`)
                .send({
                    title: '',
                    description: ''
                });

            expect(res.status).toBe(400);
        });

        test('should fail with invalid id (400)', async () => {
            const res = await request(app)
                .put('/tasks/abc')
                .send({ title: 'Test' });

            expect(res.status).toBe(400);
        });

        test('should return 404 for non-existing id', async () => {
            const res = await request(app)
                .put('/tasks/9999')
                .send({ title: 'Test' });

            expect(res.status).toBe(404);
        });

    });

    // =========================
    // DELETE /tasks/:id
    // =========================
    describe('DELETE /tasks/:id', () => {

        test('should delete task (200)', async () => {
            const res = await request(app)
                .delete(`/tasks/${createdId}`);

            expect(res.status).toBe(200);
        });

        test('should return 404 when deleting again', async () => {
            const res = await request(app)
                .delete(`/tasks/${createdId}`);

            expect(res.status).toBe(404);
        });

        test('should fail with invalid id (400)', async () => {
            const res = await request(app)
                .delete('/tasks/abc');

            expect(res.status).toBe(400);
        });

    });

});