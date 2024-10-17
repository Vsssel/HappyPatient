export const weekDayTitles = [
    { index: 0, short: 'Mon', default: 'Monday' },
    { index: 1, short: 'Tue', default: 'Tuesday' },
    { index: 2, short: 'Wed', default: 'Wednsday' },
    { index: 3, short: 'Thu', default: 'Thursday' },
    { index: 4, short: 'Fri', default: 'Friday' },
    { index: 5, short: 'Sat', default: 'Saturday' },
    { index: 6, short: 'Sun', default: 'Sunday' }
];

export const getWeekDates = (weekNum: number = 0): string[] => {
    const current = new Date();
    const firstDayOfWeek = current.getDate() - current.getDay() + 1;
    const startOfWeek = new Date(current.setDate(firstDayOfWeek + (weekNum * 7)));

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        dates.push(`${day}.${month}.${year}`);
    }
    
    return dates;
}