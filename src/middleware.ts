/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

import { NextRequest, NextResponse  } from "next/server";
import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//     // Check if the request is for a protected route
//     if(req.nextUrl.pathname.startsWith("/notes")){
//         const token = req.cookies.get("token")?.value;

//         if(!token){
//             return NextResponse.redirect(new URL("/login", req.nextUrl));
//         }

//         try {
//             jwt.verify(token, process.env.TOKEN_SECRET!);
//             return NextResponse.next();
//         } catch(err) {
//             console.error("Invalid token:", err);
//             return NextResponse.redirect(new URL("/login", req.nextUrl));
//         }
//     }

//     return NextResponse.next();
// }

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    console.log("Middleware token:", req.cookies.get("token")?.value);

    if (!token) return NextResponse.redirect(new URL("/login", req.nextUrl));

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("Decoded token:", decoded);
        return NextResponse.next();
    } catch (err: any) {
        console.error("Invalid token:", err.message);
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}


// Config -> define which routes middleware should run on
export const config = {
    matcher: ["/notes/:path*"], // applies to all the /notes/* pages
}