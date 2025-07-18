// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import { SendEmailDto } from './DTO/send-email.dto';

// @Injectable()
// export class EmailService {
//   private transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'nightshadow1305@gmail.com',
//       pass: 'kgig vxoc txmy nuiu', // App password, not regular password
//     },
//   });

//   async sendBulkEmail(dto: SendEmailDto): Promise<string> {
//     const mailOptions = {
//       from: '"Fitness Tracker" <your-email@gmail.com>',
//       to: dto.recipients.join(','),
//       subject: dto.subject,
//       text: dto.message,
//     };

//     await this.transporter.sendMail(mailOptions);
//     return 'Emails sent successfully!';
//   }
// }


import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './DTO/send-email.dto';
import { join } from 'path';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nightshadow1305@gmail.com',
      pass: 'kgig vxoc txmy nuiu',
    },
  });

  // async sendBulkEmail(dto: SendEmailDto): Promise<string> {
  //   const mailOptions = {
  //     from: '"Fitness Tracker" <nightshadow1305@gmail.com>',
  //     to: dto.recipients.join(','),
  //     subject: dto.subject,
  //     text: dto.message,
  //     attachments: dto.attachments ?? [],
  //   };

  //   await this.transporter.sendMail(mailOptions);
  //   return 'Emails sent successfully!';
  // }

async sendBulkEmail(
  dto: SendEmailDto,
  file?: Express.Multer.File,
): Promise<string> {
  const mailOptions: any = {
    from: '"Fitness Tracker" <nightshadow1305@gmail.com>',
    to: dto.recipients.join(','),
    subject: dto.subject,
    text: dto.message,
  };

  if (file) {
    mailOptions.attachments = [
      {
        filename: file.originalname,
        path: file.path, // or use join(file.destination, file.filename)
      },
    ];
  }

  await this.transporter.sendMail(mailOptions);
  return 'Email sent successfully!';
}





}


