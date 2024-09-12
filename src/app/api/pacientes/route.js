import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
    const pacientes = await prisma.paciente.findMany();
    console.log(pacientes);
    
    return NextResponse.json(pacientes)
}

export async function POST(request) {
    const { fecha, hora, nombre, telefono, consulta, doctor, radiografias, ambulancia, ingresos, egresos } = await request.json();
    
    // Asegúrate de que fecha esté en formato Date con solo la fecha (hora a medianoche)
    const fechaDate = new Date(fecha);
    fechaDate.setHours(0, 0, 0, 0); // Establece la hora a medianoche

    // Convierte la hora a formato Date si es necesario
    const horaDate = new Date(`1970-01-01T${hora}Z`);

    // Crea el nuevo paciente en la base de datos
    const newPaciente = await prisma.paciente.create({
        data: {
            fecha: fechaDate,
            hora: horaDate,
            nombre,
            telefono,
            consulta,
            doctor,
            radiografias,
            ambulancia,
            ingresos,
            egresos
        }
    });

    return NextResponse.json(newPaciente);
}