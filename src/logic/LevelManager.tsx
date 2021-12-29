export function getGlassAmount(level: number): number
{
    if (level >= 0 && level <= 5) {
        return 5;
    } else if (level > 5 && level <= 10) {
        return 6;
    } else if (level > 10 && level <= 15) {
        return 7;
    } else if (level > 15 && level <= 30) {
        return 8;
    } else if (level > 30 && level <= 50) {
        return 9;
    } else if (level > 50 && level <= 65) {
        return 10;
    } else if (level > 65 && level <= 80) {
        return 11;
    } else if (level > 80 && level <= 100) {
        return 12;
    }

    return 14;
}

export function getEmptyGlassAmount(level: number): number
{
    return 2;
}