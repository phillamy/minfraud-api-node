"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelizeResponse = exports.snakeToCamelCase = void 0;
function snakeToCamelCase(input) {
    return input.replace(/_+(\w?)/g, (_, p, o) => o === 0 ? p : p.toUpperCase());
}
exports.snakeToCamelCase = snakeToCamelCase;
const isObject = (value) => typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof RegExp) &&
    !(value instanceof Error) &&
    !(value instanceof Date);
const processArray = (arr) => arr.map((el) => Array.isArray(el)
    ? processArray(el)
    : isObject(el)
        ? camelizeResponse(el)
        : el);
function camelizeResponse(input) {
    if (!input) {
        return input;
    }
    if (Array.isArray(input)) {
        return processArray(input);
    }
    const output = {};
    for (const [key, value] of Object.entries(input)) {
        if (Array.isArray(value)) {
            output[snakeToCamelCase(key)] = processArray(value);
        }
        else if (isObject(value)) {
            output[snakeToCamelCase(key)] = camelizeResponse(value);
        }
        else {
            output[snakeToCamelCase(key)] = value;
        }
    }
    return output;
}
exports.camelizeResponse = camelizeResponse;
