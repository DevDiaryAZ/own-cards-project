export type UndefinedAnd<T> = undefined | T;

// export type GetErrorValidate = 'required' | 'minLength' | 'validate' | 'pattern';

export const getValidErrorMessage = (
    type: UndefinedAnd<string>,
): UndefinedAnd<string> => {
    switch (type) {
        case 'required':
            return 'This field is required';

        case 'minLength':
            return 'Minimum 7 characters required';

        case 'validate':
            return 'Passwords must match';

        case 'pattern':
            return 'Wrong or Invalid email address';

        default:
            return undefined;
    }
};