import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    const patologias = await prisma.paciente.findMany();
    return NextResponse.json(patologias)
    
}