import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import Token from "@/models/Token";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        const userId = searchParams.get("id");

        if(!token || !userId){
            return NextResponse.json({error: "Invalid verification link"}, {status: 400});
        }

        // Find token in DB
        const tokenDoc = await Token.findOne({userId, type: "verify"});
        if(!tokenDoc) {
            return NextResponse.json({error: "Token not found or already used"}, {status: 400});
        }

        // Check expiry
        if(tokenDoc.expiresAt < new Date()){
            return NextResponse.json({error: "Token expired"}, {status: 400});
        }

        // Compare token
        const isValid = await bcrypt.compare(token, tokenDoc.token);
        if(!isValid){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        // Set user as verified
        await User.findByIdAndUpdate(userId, {isVerified: true});

        // Delete the token
        await tokenDoc.deleteOne();

        // Redirect to login or notes page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    } catch(error){
        console.error(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}