import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import Token from "@/models/Token";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    try {
        await connect();

        const body = await req.json();
        const { email, password } = body;

        if(!email || !password){
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }

        // Find user by email
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "Invalid credentilas"}, {status: 400});
        }

        // Check if user is verified
        if(!user.isVerified){
            return NextResponse.json({error: "Please verify your email first"}, { status: 403 });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid credentilas"}, {status: 400});
        }

        // Generate JWT token for session
        const token = jwt.sign(
            {userId: user._id},
            process.env.TOKEN_SECRET!,
            {expiresIn: "7d"}
        );

        // Set token in HTTP-only cookie
        const response = NextResponse.json({
            message: "Login successful",
            user: {id: user._id, username: user.username, email: user.email},
        });

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true, // not accessible from JS
            secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS
            path: "/", // available throughout the site
            maxAge: 7*24*60*60, // 7 days
        });

        return response;
    } catch(error){
        console.error(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}