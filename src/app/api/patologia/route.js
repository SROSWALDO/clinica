import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    const patologias = await prisma.patologia.findMany()
    return NextResponse.json(patologias)
    
}

export async function POST(request) {
    const {fecha, nombre, telefono, pieza, costo, recibido} = await request.json();

    const newPatology = await prisma.patologia.create({
        data: {
            fecha,
            nombre,
            telefono,
            pieza,
            costo,
            recibido
        }
    })
    return NextResponse.json(newPatology)
}