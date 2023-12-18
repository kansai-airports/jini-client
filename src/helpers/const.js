const MSG = {}

const ERROR = {
    ok: 0,
    fatal:-1,
    invalid_instruction: 1100001,
    logic_error: 9000001,
    isFatal: (e) => e < 0,
}

export {
    MSG,
    ERROR,
}