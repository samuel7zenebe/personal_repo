import { NextResponse } from "next/server";
export async function GET(request: Request, response: Response) {
  console.log("GET request received");
  return NextResponse.json({
    message: "Nextjs Hello",
  });
}
