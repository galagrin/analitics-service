const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

export function dayOfYearToDate(dayOfYear: number): Date {
    const year = new Date().getFullYear();
    const date = new Date(year, 0);
    date.setDate(dayOfYear);
    return date;
}

export function formatDayMonth(dayOfYear: number): string {
    const date = dayOfYearToDate(dayOfYear);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
}

export function formatDayMonthYear(item: Date): string {
    const date = new Date(item);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = date.getDate();
    return `${day}.${month}.${year}`;
}
