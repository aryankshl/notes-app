/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Note from "@/models/Note";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  // const authHeader = req.headers.get("Authorization");
  // if(!authHeader){
  //     return NextResponse.json({error: "Missing authorization header"}, {status: 401});
  // }

  // const token = authHeader.split(" ")[1];
  // const decoded: any = verifyToken(token);
  // if(!decoded){
  //     return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
  // }
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = verifyToken(token);
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  const note = await Note.findOne({ _id: params.id, userId: decoded.userId });
  if (!note)
    return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json(note);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  //   const authHeader = req.headers.get("Authorization");
  //   if (!authHeader) {
  //     return NextResponse.json(
  //       { error: "Missing authorization header" },
  //       { status: 401 }
  //     );
  //   }

  //   const token = authHeader.split(" ")[1];
  //   const decoded: any = verifyToken(token);

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = verifyToken(token);
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  const { title, content } = await req.json();
  const note = await Note.findOneAndUpdate(
    { _id: params.id, userId: decoded.userId },
    { title, content },
    { new: true }
  );

  if (!note)
    return NextResponse.json(
      { error: "Note not found or you don't have permission to update it" },
      { status: 404 }
    );
  return NextResponse.json(note);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  //   const authHeader = req.headers.get("Authorization");
  //   if (!authHeader) {
  //     return NextResponse.json(
  //       { error: "Missing authorization header" },
  //       { status: 401 }
  //     );
  //   }

  //   const token = authHeader.split(" ")[1];
  //   const decoded: any = verifyToken(token);

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = verifyToken(token);
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  if (!decoded)
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );

  const note = await Note.findOneAndDelete({
    _id: params.id,
    userId: decoded.userId,
  });
  if (!note)
    return NextResponse.json(
      { error: "Note not found or you don't have permission to delete it" },
      { status: 404 }
    );

  return NextResponse.json({ message: "Note deleted successfully" });
}
