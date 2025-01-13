import { useEffect } from "react";

interface UseOutsideClickOptions {
    ref: React.RefObject<HTMLElement>;
    handler: () => void;
    includeChildren?: boolean;
}

/**
 * Custom hook to trigger a handler when clicking outside a specified element.
 *
 * @param {UseOutsideClickOptions} options - Options object.
 */
function useOutsideClick({ ref, handler, includeChildren = false }: UseOutsideClickOptions): void {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current) {
                const isOutside = includeChildren
                    ? event.target !== ref.current
                    : !ref.current.contains(event.target as Node);

                if (isOutside) {
                    handler();
                }
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Cleanup event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handler, includeChildren]);
}

export default useOutsideClick;
