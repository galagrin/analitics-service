import type { AggregateResponse } from "./fileApi";

export const fieldValidation = (data: AggregateResponse) => {
    const requiredFields = [
        'average_spend_galactic',
        'big_spent_at',
        'big_spent_civ',
        'big_spent_value',
        'less_spent_at',
        'less_spent_civ',
        'less_spent_value',
        'rows_affected',
        'total_spend_galactic',
    ] as const;
    const invalidFields: string[] = [];
    requiredFields.forEach((field) => {
        if (
            !Object.prototype.hasOwnProperty.call(data, field) ||
            data[field] === '' ||
            data[field] === null ||
            data[field] === undefined
        ) {
            invalidFields.push(field);
        }
    });
    return {
        isValid: invalidFields.length === 0,
        invalidFields,
    };
};
