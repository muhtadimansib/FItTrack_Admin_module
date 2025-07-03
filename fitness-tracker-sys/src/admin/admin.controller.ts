import { Controller, Get, UseGuards, Req, Param, Patch,Post,Body, UploadedFile, UseInterceptors, BadRequestException, ParseIntPipe, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AdminService } from './admin.service';
import { EmailService } from './email.service';
import { SendEmailDto } from './DTO/send-email.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Exercise } from './Entity/Exercise.entity';
import { Report as ReportEntity } from '../admin/Entity/Report.entity';


@Controller('admin')
export class AdminController {

  constructor(
    private readonly adminService: AdminService,
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    return this.adminService.getDashboardInfo(req.user);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('pendingUsers')
  ShowPendingUsers() {
    return this.adminService.ShowPendingUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('approve-user/:id')
  approveUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.approveUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('ApprovedUsers')
  ShowApprovedUsers() {
    return this.adminService.ShowApprovedUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('reject-user/:id')
  rejectUser(@Param('id') id: number) {
    return this.adminService.rejectUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('rejectedUsers')
  ShowRejectedUsers() {
    return this.adminService.ShowRejectedUsers();
  }


  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // @Post('send-email')
  // sendEmail(@Body() sendEmailDto: SendEmailDto) {
  //   return this.emailService.sendBulkEmail(sendEmailDto);
  //}

  @Post('send-bulk')
  @UseInterceptors(FileInterceptor('attachment', { dest: './uploads' }))
  async sendEmail(
    @Body() dto: SendEmailDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // Parse recipients if it's a stringified JSON array
    if (typeof dto.recipients === 'string') {
      try {
        dto.recipients = JSON.parse(dto.recipients);
      } catch {
        throw new BadRequestException('Invalid recipients format');
      }
    }

    return this.emailService.sendBulkEmail(dto, file); // send file separately
  }

  //Latest 5 exercises added for notification in the UI
  @Get('latest-exercises')
   async getLatestExercises(): Promise<Exercise[]> {
      return this.adminService.getLatestExercises();
    }

    //Get latest report for notifications in the UI
    @Get('latestOpenReport')
    async getLatestReport(): Promise<ReportEntity> {
      const report = await this.adminService.getLatestReport();
      if (!report) {
        throw new Error('No reports found.');
      }
      return report;
    }

    //Get the latest pending user for notification in the UI
    @Get('latestPendingUser')
    async getLatestPendingUser() {
      const user = await this.adminService.getLatestPendingUser();
      return user || { message: 'No pending user found.' };
    }

    //Search an user
    @Get('search-users')
    async searchUsers(@Query('query') query: string) {
      if (!query || query.trim() === '') {
        return [];
      }
      return this.adminService.searchUsers(query.trim());
    }


}
