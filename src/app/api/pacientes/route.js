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