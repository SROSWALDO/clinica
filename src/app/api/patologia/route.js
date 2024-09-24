import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    const patologias = await prisma.patologia.findMany()
    return NextResponse.json(patologias)
    
}

export async function POST(request) {
    const {fecha, nombre, telefono, pieza, costo, recibido} = await request.json();

    // Asegúrate de que fecha esté en formato Date con solo la fecha (hora a medianoche)
    const fechaDate = new Date(fecha);
    fechaDate.setHours(0, 0, 0, 0); // Establece la hora a medianoche

    const costoInt = parseInt(costo, 10)

    const newPatology = await prisma.patologia.create({
        data: {
            fecha: fechaDate,
            nombre,
            telefono,
            pieza,
            costo: costoInt,
            recibido
        }
    })
    return NextResponse.json(newPatology)
}