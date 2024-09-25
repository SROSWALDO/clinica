import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const deletePatologia = await prisma.patologia.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      message: `Patologia ${params.id} eliminado`,
      patologia: deletePatologia,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const patologia = await prisma.patologia.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(patologia);
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const updatedPatologia = await prisma.patologia.update({
      where: {
        id: Number(params.id),
      },
      data: {
        fecha:new Date(data.fecha),
        nombre: data.nombre,
        telefono: data.telefono,
        pieza: data.pieza,
        costo: parseInt(data.costo, 10),
        recibido: data.recibido,
      },
    });
    return NextResponse.json(updatedPatologia);
  } catch (error) {
    console.error("Error actualizando patologia:", error);
    return NextResponse.json({ error: error.message });
  }
}
