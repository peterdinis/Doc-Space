export const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3001"
		: process.env.NEXT_PUBLIC_API_URL || "";

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
	const res = await fetch(`${BASE_URL}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(options?.headers || {}),
		},
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Something went wrong");
	}

	return res.json();
}
