import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock Authentication for MVP
    if (email && password) {
      return NextResponse.json({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock...",
        user: { email, role: "enterprise_admin" },
        message: "Authentication successful."
      });
    }

    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
