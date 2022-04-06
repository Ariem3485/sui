import { object, string, number, array, date } from 'yup';

function lineFromPath(path: string): number {
    const match = /\[(\d+)\]/.exec(path);
    return +(match?.[1] || -1) + 1;
}

export const campaignSchema = object({
    name: string().trim().ensure().required('Campaign name is required'),
    emails: array()
        .transform((value, originalValue) => {
            if (Array.isArray(value)) {
                return value;
            }
            return (originalValue || '')
                .split(/\r?\n/)
                .map((val: string) => val.trim())
                .filter((val: string) => !!val)
                .map((line: string) => {
                    const [name, email] = line.split('-');
                    return {
                        name,
                        email,
                    };
                });
        })
        .of(
            object({
                email: string()
                    .ensure()
                    .trim()
                    .email(
                        ({ value, path }) =>
                            `Input: ${lineFromPath(
                                path
                            )}. "${value}" is not a valid email.`
                    )
                    .required(
                        ({ path }) =>
                            `Input: ${lineFromPath(path)}. Missing email.`
                    ),
                name: string()
                    .ensure()
                    .trim()
                    .required(
                        ({ path }) =>
                            `Input: ${lineFromPath(
                                path
                            )}. Full name is required.`
                    ),
            })
        )
        .required('At least one email is required'),
    emailTemplate: string().ensure().trim(),
    discount: number().min(0).max(100).required('Discount is required'),
    expiration: date().required('Expiration date is required.'),
});
