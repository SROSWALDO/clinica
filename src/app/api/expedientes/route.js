import { NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from '@/lib/firebase'; // Importa tu configuración de Firebase
import { PrismaClient } from '@prisma/client'; // Asegúrate de que Prisma esté instalado

const prisma = new PrismaClient(); // Inicializa Prisma

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file'); // Obtiene el archivo del FormData
  const nombre = formData.get('nombre'); // Obtiene el nombre del FormData

  if (!file || !nombre) {
    return NextResponse.json({ message: 'No se proporcionó el archivo o el nombre' }, { status: 400 });
  }

  // Crear una referencia en Firebase Storage
  const storageRef = ref(storage, `expedientes/${nombre}`); // Usa el nombre proporcionado para el archivo

  try {
    // Subir el archivo a Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener la URL de descarga del archivo subido
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Guardar el registro en la base de datos
    const expediente = await prisma.expediente.create({
      data: {
        nombre, // Guarda el nombre del expediente
        url: downloadURL, // Guarda la URL del archivo
      },
    });

    return NextResponse.json({ expediente, url: downloadURL }); // Retorna el expediente creado y la URL
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return NextResponse.json({ message: 'Error al subir el archivo' }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    // Obtener los parámetros de búsqueda de la URL
    const { searchParams } = new URL(request.url);
    const nombre = searchParams.get("nombre");

    if (nombre) {
      const expedientes = await prisma.expediente.findMany({
        where: {
          nombre: {
            contains: nombre.toLowerCase(),
            mode: 'insensitive', // Esto hará que la búsqueda no distinga entre mayúsculas y minúsculas
          },
        },
      });

      return NextResponse.json(expedientes);
    }

    // Si no hay parámetro de búsqueda, devolver todos los expedientes
    const expedientes = await prisma.expediente.findMany();

    return NextResponse.json(expedientes); // Retornar todos los expedientes
  } catch (error) {
    console.error("Error al obtener los expedientes:", error);
    return NextResponse.json({ message: 'Error al obtener los expedientes' }, { status: 500 });
  }
}

