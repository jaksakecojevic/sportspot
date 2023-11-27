import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                primaryDarker: "var(--primaryDarker)",
                primaryLighter: "var(--primaryLighter)",
                secondary: "var(--secondary)",
            },
            boxShadow: {
                primary: "var(--shadowPrimary)",
            },
            padding: {
                sideSpace: "var(--sideSpace)",
            },
            transitionProperty: {
                boxShadow: "box-shadow",
                border: "border",
            },
        },
    },
    plugins: [],
}
export default config
