import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserById } from "@/lib/users";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
	const { userId } = getAuth(req);

	if (!userId) {
		return NextResponse.json(
			{ error: "User not authenticated" },
			{ status: 401 }
		);
	}

	try {
		const { user, error } = await getUserById({ clerkUserId: userId });

		if (error) {
			console.error("Error fetching user:", error);
			return NextResponse.json(
				{ error: `Failed to fetch user: ${error.message}` },
				{ status: 500 }
			);
		}

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ user });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 }
		);
	}
}
