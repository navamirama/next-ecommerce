"use client";

import { RefObject, useEffect } from "react";

export function ClickOutside(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;
            if (!el) return;
            // If click is inside, do nothing
            if (el.contains(event.target as Node)) {
                return;
            }
            // Else, it's outside — call handler
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
