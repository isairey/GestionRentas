import Update from "@/app/models/Update";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { update, description } = body;
        
        if (!update || !description) {
            return NextResponse.json(
                { message: "Missing required fields" }, 
                { status: 400 }
            );
        }
        
        const newUpdate = await Update.create({ update, description });
        
        return NextResponse.json(
            { message: "Update created successfully", data: newUpdate }, 
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating update:", error);
        return NextResponse.json(
            { message: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}

export async function GET() {
    try{
        await connectDB()
        const announcememnts = await Update.find().sort({createdAt: -1})
        return NextResponse.json(announcememnts)
    } catch(error){
        console.error("Error fetching updates:", error)
        return NextResponse.json(
            {error: "internal server Error"},
            {status: 500}
        )    
    }
}
