import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, softDeleteUser } from "@/lib/users";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import { generateUserKey, encryptUserKey } from "@/lib/encryption";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
});

async function fetchGmailToken(userId: string) {
	try {
		const oauthTokens = await clerkClient.users.getUserOauthAccessToken(
			userId,
			"oauth_google"
		);
		if (!oauthTokens || oauthTokens.data.length === 0) {
			
			return null;
		}
		return oauthTokens.data[0].token;
	} catch (error) {
		if (error.status === 404) {
			console.log("User has not connected their Google account");
			return null;
		}
		console.error("Error fetching Gmail token:", error);
		return null;
	}
}

export async function POST(req: Request) {
	

	if (!WEBHOOK_SECRET) {
		console.error("CLERK_WEBHOOK_SECRET is not set");
		return NextResponse.json(
			{ error: "CLERK_WEBHOOK_SECRET is not set" },
			{ status: 500 }
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		console.error("Error occurred -- no svix headers");
		return NextResponse.json(
			{ error: "Error occurred -- no svix headers" },
			{ status: 400 }
		);
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return NextResponse.json(
			{ error: "Error verifying webhook" },
			{ status: 400 }
		);
	}

	const eventType = evt.type;
	

	if (eventType === "user.created") {
		const { id, email_addresses, first_name, last_name, image_url } =
			evt.data;
		const primaryEmail = email_addresses.find(
			(email) => email.id === evt.data.primary_email_address_id
		);

		if (!id || !primaryEmail) {
			console.error("Error occurred -- missing data");
			return NextResponse.json(
				{ error: "Error occurred -- missing data" },
				{ status: 400 }
			);
		}

		try {
			
			const gmailAccessToken = await fetchGmailToken(id);

			const userKey = generateUserKey();
			const encryptedUserKey = encryptUserKey(userKey);

			const user = {
				clerkUserId: id,
				email: primaryEmail.email_address,
				firstName: first_name || "",
				lastName: last_name || "",
				imageUrl: image_url,
				encryptedUserKey,
				gmailAccessToken,
			};

			
			const createdUser = await createUser(user as User);
			
			return NextResponse.json(
				{ message: "User created successfully" },
				{ status: 200 }
			);
		} catch (error) {
			console.error("Error creating user:", error);
			return NextResponse.json(
				{ error: "Error creating user" },
				{ status: 500 }
			);
		}
	}

	if (eventType === "user.deleted") {
		const { id: clerkUserId } = evt.data;

		if (!clerkUserId) {
			console.error(
				"Error in user deletion webhook: Missing clerkUserId"
			);
			return NextResponse.json(
				{ error: "Error occurred -- missing clerkUserId" },
				{ status: 400 }
			);
		}

		try {
			const { error } = await softDeleteUser(clerkUserId);
			if (error) {
				console.error("Error soft deleting user:", error);
				return NextResponse.json(
					{ error: "Error occurred while soft deleting user" },
					{ status: 500 }
				);
			}
			
			return NextResponse.json(
				{ message: "User soft deleted successfully" },
				{ status: 200 }
			);
		} catch (error) {
			console.error("Unexpected error in user deletion webhook:", error);
			return NextResponse.json(
				{ error: "Unexpected error occurred" },
				{ status: 500 }
			);
		}
	}

	
	return NextResponse.json(
		{ message: "Webhook processed successfully" },
		{ status: 200 }
	);
}
