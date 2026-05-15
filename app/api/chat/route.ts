import { ServerResponse } from "http";
import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io"
 

let socket: Server | null = null

export async function GET(req: NextRequest) {
    if(socket) 
        return NextResponse.json({message: "Socket io server already initialized"})

    const socketServer = new Server({
        path: 'api/chat',
        cors: {
            origin: ['*'],
            methods: ['POST', 'GET']
        }
    })

    socket = socketServer

    socketServer.on('conneection', (socketio) => {
        console.log(`user connected saccsefully', ${socketio.id}`)

      socketio.on('join-room', (roomNumber: string) => {
      socketio.join(roomNumber);
      socketio.to(roomNumber).emit('user-joined', { userId: socketio.id });
      console.log(`User ${socketio.id} joined room: ${roomNumber}`);
    });

    socketio.on('send-text', ({roomNumber, message, sender}: {roomNumber: string, message:string, sender: string}) => {
        socketio.to(roomNumber).emit('receive message',{
            message,
            sender,
            timestamp: new Date().toISOString,
            socketId: socketio.id
         })
    })
    })

    return new Response('Socked.IO server initialized', {status: 200})

}

 