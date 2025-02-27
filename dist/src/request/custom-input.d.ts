type CustomInputValue = boolean | number | string | undefined;
export default class CustomInput {
    [key: string]: CustomInputValue;
    constructor(key: string, value?: CustomInputValue);
}
export {};
