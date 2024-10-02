export const monthesToYears = (monthes: number) => {
    const years = Math.floor(monthes / 12);
    return {
        years: years > 0 ? years : undefined,
        monthes: monthes % 12,
        over: 12
    };
};