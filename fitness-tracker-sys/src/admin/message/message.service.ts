// import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Message } from './message.entity';

// @Injectable()
// export class MessageService {
//   constructor(
//     @InjectRepository(Message)
//     private messageRepository: Repository<Message>,
//   ) {}

//   async sendMessage(
//     senderId: number,
//     senderRole: string,
//     receiverId: number,
//     receiverRole: string,
//     content: string,
//   ) {
//     const message = this.messageRepository.create({
//       senderId,
//       senderRole,
//       receiverId,
//       receiverRole,
//       content,
//     });
//     return await this.messageRepository.save(message);
//   }

//   async getInbox(receiverId: number, receiverRole: string) {
//     return await this.messageRepository.find({
//       where: { receiverId, receiverRole },
//       order: { timestamp: 'DESC' },
//     });
//   }

//   async readMessage(messageId: number, receiverId: number, receiverRole: string) {
//     const message = await this.messageRepository.findOne({ where: { id: messageId } });
  
//     if (!message) throw new NotFoundException('Message not found');
  
//     if (message.receiverId !== receiverId || message.receiverRole !== receiverRole) {
//       throw new ForbiddenException('You are not authorized to read this message');
//     }
  
//     if (!message.seen) {
//       message.seen = true;
//       await this.messageRepository.save(message);
//     }
  
//     return message;
//   }
  
// }








import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/admin/message/message.entity';
import { CreateMessageDto } from '../DTO/message.dto';
import { Client } from '../Entity/Client.entity';
import { Nutritionist } from '../Entity/Nutritionist.entity';
import { Trainer } from '../Entity/Trainer.entity';

@Injectable()
export class MessageService {

  


  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
      @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>,

  @InjectRepository(Trainer)
  private readonly trainerRepository: Repository<Trainer>,

  @InjectRepository(Nutritionist)
  private readonly nutritionistRepository: Repository<Nutritionist>,
    
  ) {}

  // async sendMessage(createMessageDto: CreateMessageDto, senderEmail: string, senderRole: string) {
  //   const message = this.messageRepository.create({
  //     senderEmail,
  //     senderRole,
  //     ...createMessageDto, // receiverEmail, receiverRole, content
  //   });

  //   return await this.messageRepository.save(message);
  // }

    private async validateUser(email: string, role: string) {
    switch (role) {
      case 'client':
        return await this.clientRepository.findOne({ where: { email } });
      case 'trainer':
        return await this.trainerRepository.findOne({ where: { email } });
      case 'nutritionist':
        return await this.nutritionistRepository.findOne({ where: { email } });
      default:
        return null;
    }
  }

    async sendMessage(createMessageDto: CreateMessageDto, senderEmail: string, senderRole: string) {

        // Allow admin to bypass validation
    if (senderRole === 'admin') {
      const message = this.messageRepository.create({
      senderEmail,
      senderRole,
      ...createMessageDto,
    });
    return await this.messageRepository.save(message);
  }

    // Validate sender
    const sender = await this.validateUser(senderEmail, senderRole);

    if (!sender) {
      throw new ForbiddenException('Sender is not a valid system user');
    }

          // Create and save message
      const message = this.messageRepository.create({
      senderEmail,
      senderRole,
      ...createMessageDto, // content, receiverEmail, receiverRole
    });
   
    return await this.messageRepository.save(message);
  }
  

  // (Other methods remain unchanged...)


  async getInbox(receiverEmail: string, receiverRole: string) {
    return await this.messageRepository.find({
      where: { receiverEmail, receiverRole },
      order: { timestamp: 'DESC' },
    });
  }

  async readMessage(messageId: number, receiverEmail: string, receiverRole: string) {
    const message = await this.messageRepository.findOne({ where: { id: messageId } });

    if (!message) throw new NotFoundException('Message not found');

    // Make sure the receiver matches
    if (message.receiverEmail !== receiverEmail || message.receiverRole !== receiverRole) {
      throw new NotFoundException('Unauthorized access to message');
    }

    if (!message.seen) {
      message.seen = true;
      await this.messageRepository.save(message);
    }

    return message;
  }

  async countUnreadMessagesForUser(email: string, role: string): Promise<number> {
    return await this.messageRepository.count({
      where: {
        receiverEmail: email,
        receiverRole: role,
        seen: false,
      },
    });
  }


// async getConversation(user1: string, user2: string) {
//   return this.messageRepository.find({
//     where: [
//       { senderEmail: user1, receiverEmail: user2 },
//       { senderEmail: user2, receiverEmail: user1 },
//     ],
//     order: { timestamp: 'ASC' },
//   });
// }

  async getConversation(user1: string, user2: string) {
    const messages = await this.messageRepository.find({
      where: [
        { senderEmail: user1, receiverEmail: user2 },
        { senderEmail: user2, receiverEmail: user1 },
      ],
      order: { timestamp: 'ASC' },
    });

    const enhancedMessages = await Promise.all(
      messages.map(async (msg) => {
        let senderProfile: any;

        if (msg.senderRole === 'client') {
          senderProfile = await this.clientRepository.findOne({
            where: { email: msg.senderEmail },
            select: ['id', 'name', 'email', 'profileImageUrl'],
          });
        } else if (msg.senderRole === 'trainer') {
          senderProfile = await this.trainerRepository.findOne({
            where: { email: msg.senderEmail },
            select: ['id', 'name', 'email', 'profileImageUrl'],
          });
        } else if (msg.senderRole === 'nutritionist') {
          senderProfile = await this.nutritionistRepository.findOne({
            where: { email: msg.senderEmail },
            select: ['id', 'name', 'email', 'profileImageUrl'],
          });
        }

        return {
          ...msg,
          senderProfile: {
            ...senderProfile,
            role: msg.senderRole,
          },
        };
      }),
    );

    return enhancedMessages;
  }

  async getChatHistoryWithAllUsers(loggedInEmail: string) {
    // Get all messages where the logged-in user is sender or receiver
    const allMessages = await this.messageRepository.find({
      where: [
        { senderEmail: loggedInEmail },
        { receiverEmail: loggedInEmail },
      ],
      order: { timestamp: 'ASC' }, // Chronological order
    });

    // Group messages by the other user
    const chatMap = new Map<string, { role: string; messages: Message[] }>();

    for (const msg of allMessages) {
      const isSender = msg.senderEmail === loggedInEmail;
      const otherEmail = isSender ? msg.receiverEmail : msg.senderEmail;
      const otherRole = isSender ? msg.receiverRole : msg.senderRole;

      if (!chatMap.has(otherEmail)) {
        chatMap.set(otherEmail, {
          role: otherRole,
          messages: [],
        });
      }

        if (!chatMap.has(otherEmail)) {
    chatMap.set(otherEmail, {
      role: otherRole,
      messages: [],
    });
}

chatMap.get(otherEmail)!.messages.push(msg); // ← no more error
    }

    // Attach user profile to each conversation
    const result = await Promise.all(
      Array.from(chatMap.entries()).map(async ([otherEmail, { role, messages }]) => {
        let profile: any;

        if (role === 'client') {
          profile = await this.clientRepository.findOne({
            where: { email: otherEmail },
            select: ['id', 'name', 'email', 'profileImageUrl'],
          });
        } else if (role === 'trainer') {
          profile = await this.trainerRepository.findOne({
            where: { email: otherEmail },
            select: ['id', 'name', 'email', 'profileImageUrl'],
          });
        } else if (role === 'nutritionist') {
          profile = await this.nutritionistRepository.findOne({
            where: { email: otherEmail },
            select: ['id', 'name', 'email', 'profileImageUrl'],
          });
        }

        return {
          user: {
            ...profile,
            role,
          },
          messages,
        };
      })
    );

    return result;
  }

}
















