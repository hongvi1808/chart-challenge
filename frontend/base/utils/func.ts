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

export const getWeekRange = (date: Date) => {
    // const day = date.getDay();
    // const diffToMonday = (day === 0 ? -6 : 1 - day); // Nếu CN thì lùi về -6

    const fromDate = new Date(date);
    fromDate.setDate(date.getDate() - 6);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999);

    return {  fromDate, toDate };
}
export const getRangeDateCompare = (): { fromDate: number, toDate: number, previousDate: number } => {
    const today = new Date();
    const currentWeek = getWeekRange(today);

    const lastWeekStartDate = new Date(currentWeek.fromDate);
    lastWeekStartDate.setDate(currentWeek.fromDate.getDate() - 7);

    const lastWeek = getWeekRange(lastWeekStartDate);
    return {
        fromDate: currentWeek.fromDate.getTime(),
        toDate: currentWeek.toDate.getTime(),
        previousDate: lastWeek.fromDate.getTime()
    }
}

export const formatNumberK = (num: number) =>{
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}
export const formatCurrency = (num: number) => {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0  });
} 
export const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
}

