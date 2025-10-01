import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import Token from "@/models/Token";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
    try {
        await connect();

        const body = await req.json();
        const { token, userId, newPassword } = body;

        if(!token || !userId || !newPassword) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        const tokenDoc = await Token.findOne({userId, type: "reset"});
        if(!tokenDoc){
            return NextResponse.json({error: "Token not found or already used"}, {status: 400});
        }

        if(tokenDoc.expiresAt < new Date()){
            return NextResponse.json({error: "Token expired"}, {status: 400});
        }

        const isValid = await bcrypt.compare(token, tokenDoc.token);
        if(!isValid){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, {password: hashedPassword});

        // Delete the token
        await tokenDoc.deleteOne();

        return NextResponse.json({message: "Password reset successful"});
    } catch(error){
        console.error(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}