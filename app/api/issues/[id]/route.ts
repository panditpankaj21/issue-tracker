import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/ValidationSchemas";

export async function PATCH(
    req: NextRequest,
    {params} : {params: {id: string}}
){
    const body = await req.json();
    const validataion = issueSchema.safeParse(body);

    if(!validataion.success){
        return NextResponse.json(validataion.error.format(), {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue){
        return NextResponse.json({error: "Invalid issue"}, {status: 404})
    }

    const updateIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updateIssue);
}



export async function DELETE(
    req:NextRequest,
    {params}: {params:  {id: string}}
){

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue){
        return NextResponse.json({error: "Invalid issue"}, {status: 404});
    }

    const deletedIssue = await prisma.issue.delete({
        where: {id: parseInt(params.id)}
    })

    return NextResponse.json(deletedIssue, {status: 200});
}