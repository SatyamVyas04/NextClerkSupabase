import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export const metadata: Metadata = {
	title: "ProductivityHub - Transform Your Team's Productivity",
	description:
		"An all-in-one platform for team collaboration, task management, and employee well-being. Features include live document sharing, video calls, AI-powered task management, and mental health monitoring.",
	keywords: [
		"productivity",
		"team collaboration",
		"task management",
		"employee well-being",
		"video calls",
		"document sharing",
		"AI management",
	],
	authors: [
		{
			name: "ProductivityHub",
		},
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://productivityhub.com",
		title: "ProductivityHub - Transform Your Team's Productivity",
		description:
			"All-in-one platform for team collaboration and productivity",
		siteName: "ProductivityHub",
	},
	twitter: {
		card: "summary_large_image",
		title: "ProductivityHub - Transform Your Team's Productivity",
		description:
			"All-in-one platform for team collaboration and productivity",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					unsafe_disableDevelopmentModeWarnings: true,
				},
				baseTheme: dark,
				variables: {
					colorPrimary: "#62AAFF",
					colorText: "white",
				},
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
