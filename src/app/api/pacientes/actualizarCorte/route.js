// /api/pacientes/actualizarCorte/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request) {
  const { corteId } = await request.json();

  try {
    // Actualizar los pacientes para asignarles el corteId
    await prisma.paciente.updateMany({
      where: {
        corteId: null, // Solo actualiza los pacientes que no tengan un corteId asignado
      },
      data: {
        corteId: corteId,
      },
    });

    return NextResponse.json({ message: "Pacientes actualizados correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar los pacientes:", error);
    return NextResponse.json({ error: "Error al actualizar los pacientes" }, { status: 500 });
  }
}
