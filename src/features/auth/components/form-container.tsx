export default function FormContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-80px)] py-10">
            <div className="rounded-3xl border border-dark-200 py-20 flex flex-col gap-10 items-center w-full max-w-3xl px-4 sm:px-10">
                {children}
            </div>
        </div>
    );
}
