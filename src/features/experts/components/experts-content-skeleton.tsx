export default function ExpertsContentSkeleton() {
    return Array(4)
        .fill(null)
        .map((_, index) => {
            return <div key={index} className="aspect-square w-full rounded-lg bg-dark-100"></div>;
        });
}
