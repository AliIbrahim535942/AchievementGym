import { responseHandler } from "../utils/responseHandler.js";
export default function validate(schema, target) {
    return (req, res, next) => {
        try {
            const result = schema.validate(req[target], { abortEarly: false });
            if (result?.error) {
                return responseHandler.error(res, `Validation error: ${result.error.details
                    .map((e) => e.message)
                    .join(", ")}`, 400);
            }
            req[target] = result.value;
            return next();
        }
        catch (err) {
            console.log(err);
            responseHandler.error(res, "Server error during schema validation", 500);
        }
    };
}
