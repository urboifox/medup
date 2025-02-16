export default function InfoCardWrapper({
    children,
    label
}: {
    children?: React.ReactNode;
    label?: string;
}) {
    return (
        <div className="p-6 rounded-lg border-2 border-info-50 flex flex-col gap-6">
            <h3 className="font-semibold text-xl">{label}</h3>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
}
