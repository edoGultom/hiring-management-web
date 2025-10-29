import { signToken } from "@/lib/jwt";
import { AuthCredentials, AuthResponse } from "@/types/auth.type";
import { NextRequest, NextResponse } from "next/server";

const MOCK_USERS = [
  { email: "admin", password: "admin123", role: "admin" },
  { email: "applicant", password: "user123", role: "applicant" },
];

export async function POST(request: NextRequest) {
  try {
    const body: AuthCredentials = await request.json();
    const { email, password } = body;

    // cari user
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" } as AuthResponse,
        { status: 401 }
      );
    }

    // buat token dengan payload berisi email dan role
    const token = await signToken({
      email: foundUser.email,
      role: foundUser.role,
    });

    const response: AuthResponse = {
      success: true,
      token,
      role: foundUser.role as "admin" | "applicant",
    };

    // set cookie token
    const res = NextResponse.json(response);
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Internal server error" } as AuthResponse,
      { status: 500 }
    );
  }
}
