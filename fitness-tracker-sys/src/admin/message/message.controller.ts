import { Controller, Post, Get, Param, Body, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from '../DTO/message.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req
  ) {
    console.log('Decoded user from JWT:', req.user);
    const { email, role } = req.user;
    return await this.messageService.sendMessage(createMessageDto, email, role);
  }

  @Get('inbox')
  async getInbox(@Request() req) {
    const { email, role } = req.user;
    return await this.messageService.getInbox(email, role);
  }

  @Get('read/:messageId')
  async readMessage(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Request() req
  ) {
    const { email, role } = req.user;
    return await this.messageService.readMessage(messageId, email, role);
  }


@Get('conversation/:otherUserEmail')
async getConversationWith(
  @Param('otherUserEmail') otherUserEmail: string,
  @Request() req
) {
  return this.messageService.getConversation(req.user.email, otherUserEmail);
}

// @Get('conversation/:otherUserEmail')
// async getConversationWith(
//   @Param('otherUserEmail') otherUserEmail: string,
//   @Request() req
// ) {
//   return this.messageService.getConversation(req.user.email, otherUserEmail);
// }

  @UseGuards(JwtAuthGuard)
  @Get('chat-history')
  async getFullChatHistory(@Request() req) {
    return this.messageService.getChatHistoryWithAllUsers(req.user.email);
  }

}
