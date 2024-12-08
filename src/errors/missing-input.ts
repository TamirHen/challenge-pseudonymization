type InputType = 'arg' | 'env'

export class MissingInputError extends Error {
    type: InputType

    constructor(inputName: string, type: InputType) {
        super(`Missing required input: ${inputName} of type ${type}`)
        this.name = 'MissingInputError'
        this.type = type

        // maintains proper stack trace for where the error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissingInputError)
        }
    }
}
