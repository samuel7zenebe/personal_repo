import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest,response:NextResponse){
    const res = NextResponse.next();
    res.cookies.set("theme","dark",{
        httpOnly: true,
        expires: 100,
        secure: true
    });

    return NextResponse.json({
        name: "samuel",
        message: "this is normal you have to go on like this.",
        theme: res.cookies.get("theme")?.value
    })
}

