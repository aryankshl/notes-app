import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import Token from "@/models/Token";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest ){
    try {
        await connect();
        
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({error: "Email is required"}, {status: 400});
        }

        // Find user by email
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);

        await Token.create({
            userId: user._id,
            type: "reset",
            token: hashedToken,
            expiresAt: new Date(Date.now() + 3600*1000), // 1 hour
        });

        // Send reset link (log for dev)
        console.log(
            `Reset password link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&id=${user._id}`
        );

        return NextResponse.json({message: "Reset password link sent. Check your email"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}