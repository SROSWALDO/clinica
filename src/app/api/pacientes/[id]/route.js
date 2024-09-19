import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request, {params}) {
    const paciente = await prisma.paciente.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(paciente)
}

export async function PUT(request, { params }) {
    const data = await request.json();
    

    // Convierte la fecha a formato ISO para la base de datos
    const fechaISO = new Date(data.fecha).toISOString();
    
    // Convierte la hora local a UTC si es necesario (dependiendo de cómo necesites manejar la hora)
    const hora = data.hora; // Aquí guardamos la hora como cadena

    // Convierte el valor de ambulancia a booleano
    const ambulancia = data.ambulancia === true || data.ambulancia === 'true'; // Asume que 'true' es el valor verdadero, de lo contrario, ajusta la lógica
    

    try {
        const pacienteUpdated = await prisma.paciente.update({
            where: {
                id: Number(params.id)
            },
            data: {
                fecha: fechaISO,
                hora: hora, // Guardamos la hora tal como está
                nombre: data.nombre,
                telefono: data.telefono,
                consulta: data.consulta,
                doctor: data.doctor,
                radiografias: data.radiografias,
                ambulancia: ambulancia, // Aquí pasamos el booleano
                ingresos: data.ingresos,
                egresos: data.egresos
            }
        });
        return NextResponse.json(pacienteUpdated);
    } catch (error) {
        console.error('Error actualizando paciente:', error);
        return NextResponse.json({ error: error.message });
    }
}

export async function DELETE(request, {params}) {
    try {  
    const deletePaciente = await prisma.paciente.delete({
        where: {
            id: Number(params.id)
        }
    })

    return NextResponse.json({
        message: `Paciente ${params.id} eliminado`,
        paciente: deletePaciente
    });
    } catch (error) {
        return NextResponse.json(error.message)
    }
}