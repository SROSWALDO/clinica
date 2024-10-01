import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const { paciente,telefono, descripcion, fecha, horaFin } = await request.json();

  // Convertir las fechas `fecha` y `horaFin` al formato ISO antes de guardarlas
  const fechaISO = new Date(fecha).toISOString();
  const horaFinISO = new Date(horaFin).toISOString();

  const newCita = await prisma.cita.create({
    data: {
      paciente,
      telefono,
      descripcion,
      fecha: fechaISO,
      horaFin: horaFinISO,
    },
  });

  return NextResponse.json(newCita);
}

export async function GET() {
  const citas = await prisma.cita.findMany();
  return NextResponse.json(citas);
}

export async function DELETE() {
  try {
      // Eliminar todos las citas de la tabla
      await prisma.cita.deleteMany();
      
      // Retornar una respuesta exitosa
      return NextResponse.json({ message: "Todos las citas han sido eliminadas" }, { status: 200 });
  } catch (error) {
      // Manejo de errores
      console.error("Error eliminando citas:", error);
      return NextResponse.json({ error: "Error eliminando citas" }, { status: 500 });
  }
}
