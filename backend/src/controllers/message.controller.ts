import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response)=> {
  try {

    const {message} = req.body;
    const {id : recieverId} = req.params;
    const senderId = req.user.id;

    //have they chat before 
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds : {
          hasEvery : [senderId, recieverId]
        }
      }
    });
    // no, its the first message
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds : {
            set: [senderId, recieverId]
          }
        }
      });
    }
    //create message
    const newMessage = await prisma.message.create({
      data : {
        senderId,
        body : message,
        conversationId : conversation.id
      }
    });

    //add the message to the conversation for loading 
    if (newMessage){
      conversation = await prisma.conversation.update({
        where : {
          id : conversation.id
        },
        data : {
          messages : {
            connect : {
              id : newMessage.id
            }
          }
        }
      });
    }
 
    // TODO : ADD SOCKETIO HERE FOR REALTIME MESSAGING

    const recieverSocketId = getRecieverSocketId(recieverId);
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }



    return res.status(200).json(newMessage);
  } catch (err) {
    console.log("error sendMessage Cotroller ", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }  

};


export const getMessage = async (req: Request, res:Response) => {
   try {
    const {id:userToChatId} = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where : {
        participantIds : {
          hasEvery : [senderId, userToChatId]
        }
      },
      include : {
        messages : {
          orderBy : {
            createdAt : "asc"
          }
        }
      }
    })

    if (!conversation){
      return res.status(200).json([]);
    }
    
    return res.status(200).json(conversation.messages);

   } catch (error) {
    console.log("error in get message controller, ", error);
    return res.status(500).json({error : "Internal Server Error"});
   } 
}


export const getConversations = async (req: Request, res:Response) => {
  try {

    const authUserId = req.user.id ;

    const users = await prisma.user.findMany({
      where : {
        id: {
          not : authUserId
        }
      },
      select : {
        id: true,
        fullName : true,
        profilePic:  true
      }
    })
    return res.status(200).json(users);
    
  } catch (error) {
    console.log("error in getConversations  ", error);
    return res.status(500).json({error : "Internal Server Error"});
  }

}


