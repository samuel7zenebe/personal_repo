import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req:NextRequest,res:NextResponse) {
    // const cookiesStore = await cookies();
    // const theme = cookiesStore.get("theme");
    const response = NextResponse.next();
    console.log(response.cookies.get("theme")?.value);

    return NextResponse.json({
        message: "Nothing...",
        theme: response.cookies.get("theme")?.value
    })    
}