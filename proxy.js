
import { authClient } from "@/lib/auth-client";
import { NextResponse } from "next/server";

export function proxy(req) {

  const session = authClient.useSession()

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()

}


export const config = { matcher: ["/dashboard/:path**", "components/browsercipedata/actionbutton/:path**"] }

