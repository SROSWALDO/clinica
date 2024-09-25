import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const nombre = searchParams.get("nombre");

    if(nombre) {
        const patologias = await prisma.patologia.findMany({
            where: {
                nombre: {
                    contains: nombre.toLowerCase()
                }
            }
        })
        return NextResponse.json(patologias)
    }


    const patologias = await prisma.patologia.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    })
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

export async function DELETE() {
    try {
        // Eliminar todos los pacientes de la tabla
        await prisma.patologia.deleteMany();
        
        // Retornar una respuesta exitosa
        return NextResponse.json({ message: "Todos las patologias han sido eliminados" }, { status: 200 });
    } catch (error) {
        // Manejo de errores
        console.error("Error eliminando patologias:", error);
        return NextResponse.json({ error: "Error eliminando patologias" }, { status: 500 });
    }
}