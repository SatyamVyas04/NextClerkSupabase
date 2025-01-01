import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

interface UserResponse {
	user: {
		gmailAccessToken: string;
	};
}

export const fetchAndStoreGmailToken = async (
	req: NextRequest
): Promise<string> => {
	
	try {
		const { getToken } = getAuth(req);
		const token = await getToken();

		if (!token) {
			throw new Error("No authentication token available");
		}

		const response = await fetch("/api/user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		

		if (!response.ok) {
			const errorData: { error: string } = await response.json();
			throw new Error(
				`Failed to fetch stored Gmail token: ${response.status}. ${errorData.error}`
			);
		}

		const data: UserResponse = await response.json();
		
		return data.user.gmailAccessToken;
	} catch (error) {
		console.error("Error fetching stored Gmail token:", error);
		throw error;
	}
};
