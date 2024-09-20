import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { nombre, ingresos,totalIngresos, egresos,totalEgresos, total } = await request.json();
    const newCorte = await prisma.corte.create({
      data: {
        nombre,
        ingresos,
        totalIngresos,
        egresos,
        totalEgresos,
        total,
      },
    });
    return NextResponse.json(newCorte);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Error al crear el corte" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cortes = await prisma.corte.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(cortes);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Error al obtener los cortes" }, { status: 500 });
  }
}
