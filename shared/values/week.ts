export const weekDayTitles = [
    { index: 1, short: 'Mon', default: 'Monday' },
    { index: 2, short: 'Tue', default: 'Tuesday' },
    { index: 3, short: 'Wed', default: 'Wednsday' },
    { index: 4, short: 'Thu', default: 'Thursday' },
    { index: 5, short: 'Fri', default: 'Friday' },
    { index: 6, short: 'Sat', default: 'Saturday' },
    { index: 0, short: 'Sun', default: 'Sunday' }
];

export const getWeekDates = (dateStr: string): string[] => {
    const weekDays: string[] = [];
    let [day, month, year]: (number | string)[] = dateStr.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    let inputDayAtWeek = inputDate.getDay();

    if (inputDayAtWeek == 0) {
        inputDate.setDate(inputDate.getDate() - 1);
        inputDayAtWeek = inputDate.getDay();
    }

    for (let i = 1; i <= 7; i++) {
        const date = new Date(inputDate);
        date.setDate(inputDate.getDate() + i - inputDayAtWeek);

        day = date.getDate().toString().padStart(2, '0');
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        year = date.getFullYear();
        weekDays[i % 7] = `${day}-${month}-${year}`;
    }
    return weekDays;
};