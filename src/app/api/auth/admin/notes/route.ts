/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Note from "@/models/Note";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
    await connect();

    const token = req.cookies.get("token")?.value;
    if(!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if(!decoded || !decoded.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 401 });

    // Fetch all notes grouped by user

    const notes = await Note.find().lean();

    const grouped = notes.reduce((acc: Record<string, any[]>, note) => {
        const userId = note.userId.toString();
        if(!acc[userId]) acc[userId] = [];
        acc[userId].push(note);
        return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({notes: grouped});
}