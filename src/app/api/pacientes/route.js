import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
    // Obtener los parámetros de la URL (query params)
    const { searchParams } = new URL(request.url);
    const nombre = searchParams.get("nombre"); // Obtiene el nombre desde la query string

    // Si hay un nombre, buscar los pacientes que coincidan
    if (nombre) {
        const pacientes = await prisma.paciente.findMany({
            where: {
                nombre: {
                    contains: nombre.toLowerCase(), 
                },
            },
        });

        return NextResponse.json(pacientes);
    }

    // Si no hay un parámetro de nombre, devolver todos los pacientes
    const pacientes = await prisma.paciente.findMany();
    return NextResponse.json(pacientes);
}


export async function POST(request) {
    const { fecha, hora, nombre, telefono, consulta, doctor, radiografias, ambulancia, ingresos, egresos } = await request.json();
    
    // Asegúrate de que fecha esté en formato Date con solo la fecha (hora a medianoche)
    const fechaDate = new Date(fecha);
    fechaDate.setHours(0, 0, 0, 0); // Establece la hora a medianoche

    const radiografiasInt = parseInt(radiografias, 10);
    const ingresosInt = parseInt(ingresos, 10);
    const egresosInt = parseInt(egresos,10);

    const ambulanciaBool = ambulancia.toLowerCase() === 'si';

    // Crea el nuevo paciente en la base de datos
    const newPaciente = await prisma.paciente.create({
        data: {
            fecha: fechaDate,
            hora,
            nombre,
            telefono,
            consulta,
            doctor,
            radiografias: radiografiasInt,
            ambulancia: ambulanciaBool,
            ingresos:ingresosInt,
            egresos: egresosInt,
        }
    });

    return NextResponse.json(newPaciente);
}

export async function DELETE() {
    try {
        // Eliminar todos los pacientes de la tabla
        await prisma.paciente.deleteMany();
        
        // Retornar una respuesta exitosa
        return NextResponse.json({ message: "Todos los pacientes han sido eliminados" }, { status: 200 });
    } catch (error) {
        // Manejo de errores
        console.error("Error eliminando pacientes:", error);
        return NextResponse.json({ error: "Error eliminando pacientes" }, { status: 500 });
    }
}

