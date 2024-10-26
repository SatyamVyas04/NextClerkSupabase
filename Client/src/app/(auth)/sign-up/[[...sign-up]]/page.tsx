import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function page() {
	return (
		<div className="min-h-screen w-screen flex items-center justify-center">
			<SignUp />
		</div>
	);
}
