const {
    validateTaskData,
    validateTaskUpdateData,
    validateTaskId,
    isTaskListEmpty
} = require('../src/validators/tasksValidator');

describe('TASKS VALIDATOR - FULL TEST SUITE', () => {

    // =========================
    // validateTaskData
    // =========================
    describe('validateTaskData', () => {

        test('should pass with valid data', () => {
            const result = validateTaskData('Task A', 'Description A');

            expect(result.isValid).toBe(true);
            expect(result.value).toEqual({
                title: 'Task A',
                description: 'Description A'
            });
        });

        test('should fail when title is empty', () => {
            const result = validateTaskData('', 'Valid');

            expect(result.isValid).toBe(false);
            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ field: 'title' })
                ])
            );
        });

        test('should fail when description is empty', () => {
            const result = validateTaskData('Valid', '');

            expect(result.isValid).toBe(false);
            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ field: 'description' })
                ])
            );
        });

        test('should fail when both fields are empty', () => {
            const result = validateTaskData('', '');

            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBe(2);
        });

        test('should fail when title is not string', () => {
            const result = validateTaskData(123, 'Valid');

            expect(result.isValid).toBe(false);
        });

        test('should fail when description is not string', () => {
            const result = validateTaskData('Valid', 123);

            expect(result.isValid).toBe(false);
        });

    });

    // =========================
    // validateTaskUpdateData
    // =========================
    describe('validateTaskUpdateData', () => {

        test('should pass with only title', () => {
            const result = validateTaskUpdateData('Updated', undefined);

            expect(result.isValid).toBe(true);
            expect(result.value).toEqual({ title: 'Updated' });
        });

        test('should pass with only description', () => {
            const result = validateTaskUpdateData(undefined, 'Updated');

            expect(result.isValid).toBe(true);
            expect(result.value).toEqual({ description: 'Updated' });
        });

        test('should pass with both valid fields', () => {
            const result = validateTaskUpdateData('Updated', 'Updated desc');

            expect(result.isValid).toBe(true);
        });

        test('should fail when both undefined', () => {
            const result = validateTaskUpdateData(undefined, undefined);

            expect(result.isValid).toBe(false);
            expect(result.errors[0].field).toBe('data');
        });

        test('should fail when both empty strings', () => {
            const result = validateTaskUpdateData('', '');

            expect(result.isValid).toBe(false);
        });

        test('should fail when title empty string', () => {
            const result = validateTaskUpdateData('', 'Valid');

            expect(result.isValid).toBe(false);
            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ field: 'title' })
                ])
            );
        });

        test('should fail when description empty string', () => {
            const result = validateTaskUpdateData('Valid', '');

            expect(result.isValid).toBe(false);
            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ field: 'description' })
                ])
            );
        });

    });

    // =========================
    // validateTaskId
    // =========================
    describe('validateTaskId', () => {

        test('should pass with numeric string id', () => {
            const result = validateTaskId('1');

            expect(result.isValid).toBe(true);
            expect(result.value).toBe(1);
        });

        test('should pass with larger id', () => {
            const result = validateTaskId('10');

            expect(result.isValid).toBe(true);
        });

        test('should fail with letters', () => {
            const result = validateTaskId('abc');

            expect(result.isValid).toBe(false);
        });

        test('should fail with empty string', () => {
            const result = validateTaskId('');

            expect(result.isValid).toBe(false);
        });

        test('should fail with negative id', () => {
            const result = validateTaskId('-1');

            expect(result.isValid).toBe(false);
        });

        test('should fail with float', () => {
            const result = validateTaskId('1.5');

            expect(result.isValid).toBe(false);
        });

    });

    // =========================
    // isTaskListEmpty
    // =========================
    describe('isTaskListEmpty', () => {

        test('should return true for empty array', () => {
            expect(isTaskListEmpty([])).toBe(true);
        });

        test('should return false for non-empty array', () => {
            expect(isTaskListEmpty([{ id: 1 }])).toBe(false);
        });

    });

});