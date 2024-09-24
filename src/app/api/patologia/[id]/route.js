import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request, {params}) {
    try {
        const deletePatologia = await prisma.patologia.delete({
            where:{
                id: Number(params.id)
            }
        })

        return NextResponse.json({
            message: `Patologia ${params.id} eliminado`,
            patologia: deletePatologia
        })
    } catch (error) {
        NextResponse.json(error.message)
    }
}