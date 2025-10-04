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

  export const formatDate = (da: number | Date): string => {
    if (!da) return ''
    const date = new Date(da);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const mo = (date.getMonth() + 1).toString().padStart(2, "0"); // tháng tính từ 0
    const y = date.getFullYear();
    return `${h}:${m} ${d}-${mo}-${y}`;
}
  export const formatDateToInput = (da: number | Date): string => {
    if (!da) return ''
    const date = new Date(da);
    const d = date.getDate().toString().padStart(2, "0");
    const mo = (date.getMonth() + 1).toString().padStart(2, "0"); // tháng tính từ 0
    const y = date.getFullYear();
    return `${y}-${mo}-${d}`;
}