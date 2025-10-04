export const validRequire = (value: string) => {
    if (!value.trim()) return '*Required field'
}
export const validUsername = (value: string) => {
        if (validRequire(value)) return validRequire(value)
        if (!(/^[a-z0-9]+$/).test(value)) return 'Use only letters and numbers, no spaces or accents'
    }

export const regexVaid = (name: string) => {
    if (!name) return {}
    switch (name) {
        case 'username': return { pattern: "^[a-z0-9]+$" }

        default: return {}
    }
}