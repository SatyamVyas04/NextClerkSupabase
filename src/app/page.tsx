/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Bell,
	Brain,
	Calendar,
	Clock,
	FileText,
	Layout,
	MessageSquare,
	Presentation,
	Timer,
	Users,
	Video,
} from "lucide-react";

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
			{/* Navbar */}
			<nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
					<div className="flex items-center space-x-2">
						<Layout className="h-6 w-6 text-blue-600" />
						<span className="text-xl font-bold">
							ProductivityHub
						</span>
					</div>

					<div className="hidden md:flex items-center space-x-6">
						<a
							href="#features"
							className="text-gray-600 hover:text-blue-600 transition"
						>
							Features
						</a>
						<a
							href="#managers"
							className="text-gray-600 hover:text-blue-600 transition"
						>
							For Managers
						</a>
						<a
							href="#employees"
							className="text-gray-600 hover:text-blue-600 transition"
						>
							For Employees
						</a>
						<a href="/sign-in">
							<Button variant="outline" className="ml-4">
								Sign In
							</Button>
						</a>
						<a href="/sign-up">
							<Button>Get Started</Button>
						</a>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="pt-32 pb-16 max-w-5xl mx-auto">
				<div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
					<div className="space-y-6">
						<h1 className="text-5xl font-bold leading-tight animate-fade-in">
							Transform Your Team&apos;s Productivity
						</h1>
						<p className="text-xl text-gray-600 animate-fade-in-delay-1">
							An all-in-one platform for team collaboration, task
							management, and employee well-being.
						</p>
						<div className="space-x-4 animate-fade-in-delay-2">
							<Button size="lg">Start Free Trial</Button>
							<Button size="lg" variant="outline">
								Watch Demo
							</Button>
						</div>
					</div>
					<div className="relative animate-float">
						<img
							src="https://placehold.co/600x400"
							alt="Platform Preview"
							className="rounded-lg shadow-2xl"
						/>
					</div>
				</div>
			</section>

			{/* Basic Features */}
			<section
				id="features"
				className="py-16 bg-gray-50 max-w-5xl mx-auto"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Basic Features
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Team Communication</CardTitle>
								<CardDescription>
									Slack/Discord-like servers for seamless team
									collaboration
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<FileText className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Live Document Sharing</CardTitle>
								<CardDescription>
									Real-time collaborative document editing and
									sharing
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<Presentation className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Presentation Tools</CardTitle>
								<CardDescription>
									Create and collaborate on presentations in
									real-time
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Manager Features */}
			<section id="managers" className="py-16 max-w-5xl mx-auto">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Manager Features
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<Bell className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Advanced Notifications</CardTitle>
								<CardDescription>
									Multi-channel notifications system including
									push, web, and email alerts
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<Users className="h-5 w-5 text-blue-600" />
										<span>Employee activity tracking</span>
									</li>
									<li className="flex items-center gap-2">
										<Calendar className="h-5 w-5 text-blue-600" />
										<span>Scheduled notifications</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<Brain className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>
									AI-Powered Task Management
								</CardTitle>
								<CardDescription>
									Smart task allocation based on employee
									performance and availability
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<Clock className="h-5 w-5 text-blue-600" />
										<span>Workload optimization</span>
									</li>
									<li className="flex items-center gap-2">
										<Video className="h-5 w-5 text-blue-600" />
										<span>Performance analytics</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Employee Features */}
			<section
				id="employees"
				className="py-16 bg-gray-50 max-w-5xl mx-auto"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Employee Features
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<Timer className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Productivity Tools</CardTitle>
								<CardDescription>
									Pomodoro timer and workflow management tools
									to boost productivity
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<Clock className="h-5 w-5 text-blue-600" />
										<span>Customizable time tracking</span>
									</li>
									<li className="flex items-center gap-2">
										<Layout className="h-5 w-5 text-blue-600" />
										<span>Task organization</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition">
							<CardHeader>
								<Brain className="h-8 w-8 text-blue-600 mb-2" />
								<CardTitle>Mental Health Support</CardTitle>
								<CardDescription>
									AI-driven well-being monitoring and support
									system
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<Bell className="h-5 w-5 text-blue-600" />
										<span>Smart break reminders</span>
									</li>
									<li className="flex items-center gap-2">
										<Users className="h-5 w-5 text-blue-600" />
										<span>Wellness resources</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 max-w-5xl mx-auto">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">
						Ready to Transform Your Workplace?
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Join thousands of teams already using ProductivityHub
					</p>
					<Button size="lg" className="animate-bounce">
						Start Your Free Trial
					</Button>
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
