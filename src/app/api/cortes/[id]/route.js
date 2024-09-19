import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request, {params}) {
    const corte = await prisma.corte.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(corte)
}

export async function DELETE(request, {params}) {
    try {
        const deleteCorte = await prisma.corte.delete({
            where: {
                id:Number(params.id)
            }
        })
        return NextResponse.json({
            message: `Corte ${params.id} eliminado `,
            corte: deleteCorte
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}