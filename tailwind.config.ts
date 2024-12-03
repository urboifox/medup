import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    main: "var(--primary-main)",
                    50: "var(--primary-50)",
                    100: "var(--primary-100)",
                    200: "var(--primary-200)"
                },
                error: {
                    main: "var(--error-main)",
                    50: "var(--error-50)",
                    100: "var(--error-100)",
                    200: "var(--error-200)"
                },
                warning: {
                    main: "var(--warning-main)",
                    50: "var(--warning-50)",
                    100: "var(--warning-100)",
                    200: "var(--warning-200)"
                },
                info: {
                    main: "var(--info-main)",
                    50: "var(--info-50)",
                    100: "var(--info-100)",
                    200: "var(--info-200)"
                },
                success: {
                    main: "var(--success-main)",
                    50: "var(--success-50)",
                    100: "var(--success-100)",
                    200: "var(--success-200)"
                },
                dark: {
                    100: "var(--dark-100)",
                    200: "var(--dark-200)",
                    300: "var(--dark-300)",
                    400: "var(--dark-400)"
                },
                light: {
                    100: "var(--light-100)",
                    200: "var(--light-200)",
                    300: "var(--light-300)",
                    400: "var(--light-400)"
                }
            },
            container: {
                center: true,
                padding: "1rem"
            }
        }
    },
    plugins: []
} satisfies Config;
