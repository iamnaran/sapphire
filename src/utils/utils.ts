
const safeNumber = (val: any, fallback = 0): number => {
    const num = Number(val);
    return isNaN(num) ? fallback : num;
};