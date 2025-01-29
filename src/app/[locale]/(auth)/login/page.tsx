import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
    return (
        <div className="container flex flex-col gap-10 py-20 items-center">
            <h1 className="text-5xl font-semibold">Welcome Back!</h1>
            <LoginForm />
        </div>
    );
}
