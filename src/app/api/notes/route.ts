/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Note from "@/models/Note";
import { verifyToken } from "@/lib/auth";

// export async function GET(req: NextRequest){
//     await connect();

//     const authHeader = req.headers.get("Authorization");
//     if(!authHeader){
//         return NextResponse.json({error: "Missing authorization header"}, {status: 401});
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded: any = verifyToken(token);
//     if(!decoded) {
//         return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
//     }

//     const notes = await Note.find({userId: decoded.userId}).sort({createAt: -1});
//     return NextResponse.json(notes);
// }

export async function GET(req: NextRequest){
    await connect();

    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const notes = await Note.find({ userId: decoded.userId }).sort({ createdAt: -1 });
    return NextResponse.json({ notes });
}

// export async function POST(req: NextRequest) {
//     await connect();

//     const authHeader = req.headers.get("Authorization");
//     if(!authHeader){
//         return NextResponse.json({error: "Missing authorization header"}, {status: 401});
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded: any = verifyToken(token);
//     if(!decoded){
//         return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
//     }

//     const { title, content } = await req.json();
//     if(!title || !content) return NextResponse.json({error: "All fields are required"}, {status: 400});

//     const note = new Note({
//         userId: decoded.userId,
//         title,
//         content,
//     });

//     return NextResponse.json(note);
// }

export async function POST(req: NextRequest){
    await connect();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

    const { title, content } = await req.json();
    if (!title || !content) return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const note = new Note({
        userId: decoded.userId,
        title,
        content,
    });

    await note.save();
    return NextResponse.json({ note });
}