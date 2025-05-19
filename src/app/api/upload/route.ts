import {NextResponse} from "next/server";

export async function GET(request:Request,response:Response) {
    let message = "";
    message = await delay();
  return NextResponse.json({
    message
  })
}

function delay():Promise<string> {
  // simulate a delay 
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Delay is over.");
        },2000)
    })
}
