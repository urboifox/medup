import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center h-screen">
            <h2 className="text-4xl font-bold">Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className="underline">
                Return Home
            </Link>
        </div>
    );
}
