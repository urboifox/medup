import { FaStar } from "react-icons/fa6";

export default function StarsRating({
    value,
    showNumber
}: {
    value: number;
    showNumber?: boolean;
}) {
    return (
        <div className="flex items-center gap-1">
            {Array(5)
                .fill(null)
                .map((_, idx) => {
                    return (
                        <span
                            key={idx}
                            className={`${
                                idx < value ? "text-yellow-500" : "text-foreground-50"
                            } text-sm`}
                        >
                            <FaStar />
                        </span>
                    );
                })}
            {showNumber && (
                <span className="text-xs font-medium text-foreground-100">({value})</span>
            )}
        </div>
    );
}
