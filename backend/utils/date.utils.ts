/**
 * Date/time utility helpers for slot generation and availability logic.
 * All times are handled in UTC internally; timezone conversion happens at the API boundary.
 */

/**
 * Parse a "HH:MM" string and combine with a Date to produce a UTC DateTime.
 * @param date - The base date (year, month, day are used)
 * @param timeStr - Time string in "HH:MM" 24-hour format
 */
export function parseTimeOnDate(date: Date, timeStr: string): Date {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const result = new Date(date);
    result.setUTCHours(hours, minutes, 0, 0);
    return result;
}

/**
 * Generate candidate time slots between start and end, each of `durationMin` minutes.
 * @returns array of { start: Date, end: Date }
 */
export function generateSlots(
    windowStart: Date,
    windowEnd: Date,
    durationMin: number
): { start: Date; end: Date }[] {
    const slots: { start: Date; end: Date }[] = [];
    const durationMs = durationMin * 60 * 1000;
    let current = new Date(windowStart);

    while (current.getTime() + durationMs <= windowEnd.getTime()) {
        const slotEnd = new Date(current.getTime() + durationMs);
        slots.push({ start: new Date(current), end: slotEnd });
        current = slotEnd; // non-overlapping, back-to-back slots
    }

    return slots;
}

/**
 * Check if two time intervals overlap.
 * Uses the classic gap-overlap formula: A starts before B ends AND A ends after B starts.
 */
export function overlaps(
    aStart: Date,
    aEnd: Date,
    bStart: Date,
    bEnd: Date
): boolean {
    return aStart < bEnd && aEnd > bStart;
}

/**
 * Map a JavaScript Date's day-of-week to our DB convention (0=Sunday … 6=Saturday).
 * Date.getUTCDay() already returns 0-6, so this is a pass-through for clarity.
 */
export function getDayOfWeek(date: Date): number {
    return date.getUTCDay();
}
