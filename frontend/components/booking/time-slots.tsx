import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TimeSlotsProps {
    slots: string[];
    selectedSlot: string | null;
    onSelect: (slot: string) => void;
    onConfirm: () => void;
    date: Date;
}

export function TimeSlots({ slots, selectedSlot, onSelect, onConfirm, date }: TimeSlotsProps) {
    const [confirmingSlot, setConfirmingSlot] = useState<string | null>(null);

    if (slots.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center p-6 bg-[color:var(--secondary)]/20 rounded-xl border border-dashed border-[color:var(--border)]">
                <p className="font-medium">No slots available</p>
                <p className="text-sm text-[color:var(--muted-foreground)] mt-1">
                    Try selecting a different date.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <h3 className="font-medium text-[color:var(--foreground)]">
                    {format(date, "EEEE, MMMM d")}
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {slots.map((s) => {
                    const isSelected = selectedSlot === s;
                    const isConfirming = confirmingSlot === s;

                    return (
                        <div key={s} className="flex gap-2 h-12 w-full transition-all">
                            <button
                                onClick={() => {
                                    onSelect(s);
                                    setConfirmingSlot(s);
                                }}
                                className={cn(
                                    "flex-1 h-full rounded-lg border text-sm font-medium transition-all active:scale-[0.98]",
                                    {
                                        "bg-[color:var(--foreground)] text-[color:var(--background)] border-[color:var(--foreground)] w-1/2": isSelected || isConfirming,
                                        "border-[color:var(--primary)]/30 text-[color:var(--primary)] hover:border-[color:var(--primary)] hover:bg-[color:var(--primary)]/5": !isSelected && !isConfirming
                                    }
                                )}
                            >
                                {format(new Date(s), "h:mm a")}
                            </button>

                            {(isSelected || isConfirming) && (
                                <Button
                                    onClick={onConfirm}
                                    className="flex-1 h-full rounded-lg animate-in fade-in slide-in-from-left-2"
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
