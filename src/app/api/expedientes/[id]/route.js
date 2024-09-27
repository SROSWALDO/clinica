import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Asegúrate de que Prisma esté instalado

const prisma = new PrismaClient(); // Inicializa Prisma

export async function DELETE(request, { params }) {
  const { id } = params; // Obtener el id del expediente desde los parámetros de la URL

  try {
    // Eliminar el expediente por id
    const expediente = await prisma.expediente.delete({
      where: {
        id: parseInt(id), // Asegúrate de que el id sea un número
      },
    });

    return NextResponse.json({ message: 'Expediente eliminado', expediente });
  } catch (error) {
    console.error("Error al eliminar el expediente:", error);
    return NextResponse.json({ message: 'Error al eliminar el expediente' }, { status: 500 });
  }
}
