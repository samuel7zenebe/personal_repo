import {NextResponse} from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  let message = "";
  message = await delay();
  return NextResponse.json({
    message,
  });
}

function delay():Promise<string> {
  // simulate a delay 
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Delay is over.");
        },2000)
    })
}
