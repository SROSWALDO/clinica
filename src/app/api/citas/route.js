import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const { paciente, descripcion, fecha, horaFin } = await request.json();

  // Convertir las fechas `fecha` y `horaFin` al formato ISO antes de guardarlas
  const fechaISO = new Date(fecha).toISOString();
  const horaFinISO = new Date(horaFin).toISOString();

  const newCita = await prisma.cita.create({
    data: {
      paciente,
      descripcion,
      fecha: fechaISO,
      horaFin: horaFinISO,
    },
  });

  return NextResponse.json(newCita);
}

export async function GET(request) {
  const citas = await prisma.cita.findMany();
  return NextResponse.json(citas);
}
