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
        console.log(`token from url ${token}`)
        console.log(`token from db ${tokenDoc.token}`)
        console.log(`isValid ${isValid}`)
        if(!isValid){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        
        // Check if new password is the same as any of the last 3 passwords used by the user
        const allHashes = [user.password, ...user.oldPasswords];

        for (const hash of allHashes) {
            const match = await bcrypt.compare(newPassword, hash);
            if(match){
                return NextResponse.json({
                    error: "You cannot reuse your last 3 passwords."
                }, {status: 400});
            }
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Move current password to oldPasswords
        user.oldPasswords.unshift(user.password);
        if(user.oldPasswords.length>3) {
            user.oldPasswords.pop();
        }

        // Update users password
        user.password = hashedPassword;
        await user.save();
        // await User.findByIdAndUpdate(userId, {password: hashedPassword});

        // Delete the token
        await tokenDoc.deleteOne();

        return NextResponse.json({message: "Password reset successful"});
    } catch(error){
        console.error(error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}