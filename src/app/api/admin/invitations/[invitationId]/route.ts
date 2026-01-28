import { NextRequest, NextResponse } from "next/server";
import { patchInvitation } from "./patch";
import { deleteInvitation } from "./delete";

export async function PATCH(req: NextRequest, context: any) {
  return await patchInvitation(req, context);
}

export async function DELETE(req: NextRequest, context: any) {
  return await deleteInvitation(req, context);
}
