import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
    selectedDate: Date | undefined;
    onSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelect }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    // To handle padding days we need the start of the week for `start`
    const startDate = new Date(start);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const monthDays = eachDayOfInterval({ start: startDate, end: endDate });

    const isDayDisabled = (day: Date) => {
        return isBefore(day, startOfDay(new Date()));
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
                <div className="flex gap-2 text-[color:var(--muted-foreground)]">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-1 rounded-full hover:bg-[color:var(--secondary)] transition-colors disabled:opacity-50"
                        disabled={isBefore(startOfMonth(currentMonth), startOfMonth(new Date()))}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-1 rounded-full hover:bg-[color:var(--secondary)] transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-medium text-[color:var(--muted-foreground)]">
                {days.map(day => <div key={day} className="py-2">{day}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, i) => {
                    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const disabled = isDayDisabled(day);
                    const today = isToday(day);

                    return (
                        <button
                            key={i}
                            onClick={() => !disabled && onSelect(day)}
                            disabled={disabled || !isCurrentMonth}
                            className={cn(
                                "h-10 w-full rounded-full flex items-center justify-center text-sm transition-all relative font-medium",
                                {
                                    "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] shadow-md translate-y-[-1px]": isSelected,
                                    "hover:bg-[color:var(--secondary)]/80 text-[color:var(--foreground)]": !isSelected && !disabled && isCurrentMonth,
                                    "text-[color:var(--muted-foreground)] opacity-30 cursor-not-allowed": disabled || !isCurrentMonth,
                                    "text-[color:var(--primary)]": today && !isSelected,
                                }
                            )}
                        >
                            <span className="z-10">{format(day, "d")}</span>
                            {today && !isSelected && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[color:var(--primary)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
