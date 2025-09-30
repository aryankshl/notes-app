import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import Token from "@/models/Token";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// POST /api/auth/signup

export async function POST(req: NextRequest) {
    try{
        await connect();

        const body = await req.json();
        const { username, email, password } = body;

        // Basic validation
        if(!username || !email || !password) {
            return NextResponse.json({
                error: "All fields are required"
            },
            { status: 400 });
        }

        // Check if user/email already exists
        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        });
        if(existingUser){
            return NextResponse.json({
                error: "Username or email already exists"
            },
            { status: 400 });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false,
        });

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(verificationToken, 10);

        // Store token in DB
        await Token.create({
            userId: user._id,
            token: hashedToken,
            type: "verify",
            expiresAt: new Date(Date.now() + 3600000), // 1 hour expiration
        });

        // Send verification email
        console.log(
            `Verification link: ${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}&id=${user._id}`
        );
        
        return NextResponse.json({
            message: "Signup successful! Check your email to verify your account.",
        });
    } catch(error){
        console.error(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}