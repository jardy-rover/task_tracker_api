// Validator handles input, parameter and state validation for data

//Input validation

function isTaskListEmpty(tasks) {
    return tasks.length === 0;
};

function validateTaskId(idParam) {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return {
            isValid: false,
            error: "Invalid request. Task ID must be a positive whole number."
        };
    }

    return { isValid: true, value: id };
};

function validateTaskData(title, description) {
    const errors = [];

    if (typeof title !== 'string' || title.trim().length === 0) {
        errors.push({
            field: 'title',
            message: 'Title must be a non-empty string.'
        });
    }

    if (typeof description !== 'string' || description.trim().length === 0) {
        errors.push({
            field: 'description',
            message: 'Description must be a non-empty string.'
        });
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return {
        isValid: true,
        value: {
            title: title,
            description: description
        }
    };
};

function validateTaskUpdateData(title, description) {
    const errors = [];
    const value = {};

    const isTitleEmpty =
        title !== undefined &&
        (typeof title !== 'string' || title.trim().length === 0);

    const isDescriptionEmpty =
        description !== undefined &&
        (typeof description !== 'string' || description.trim().length === 0);

    // Both fields are provided but empty
    if (isTitleEmpty && isDescriptionEmpty) {
        return {
            isValid: false,
            errors: [{
                field: 'data',
                message: 'At least a title or description must be provided for update.'
            }]
        };
    }

    // Validate title if it's provided
    if (title !== undefined) {
        if (isTitleEmpty) {
            errors.push({
                field: 'title',
                message: 'Title must be a non-empty string.'
            });
        } else {
            value.title = title;
        }
    }

    // Validate description if it's provided
    if (description !== undefined) {
        if (isDescriptionEmpty) {
            errors.push({
                field: 'description',
                message: 'Description must be a non-empty string.'
            });
        } else {
            value.description = description;
        }
    }

    // If neither title nor description is provided
    if (title === undefined && description === undefined) {
        errors.push({
            field: 'data',
            message: 'At least a title or description must be provided for update.'
        });
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return { isValid: true, value };
}

module.exports = {
    isTaskListEmpty,
    validateTaskId,
    validateTaskData,
    validateTaskUpdateData
};