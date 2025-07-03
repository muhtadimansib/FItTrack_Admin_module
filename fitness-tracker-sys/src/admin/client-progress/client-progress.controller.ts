import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClientProgressService } from './client-progress.service';

@Controller('client-progress')
export class ClientProgressController {
  constructor(private readonly service: ClientProgressService) {}

  // View client progress
  @Get('progress/:clientId')
  async getProgress(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.service.getProgress(clientId);
  }

  // Export client progress to PDF
  @Get('progress/:clientId/export-pdf')
  async exportPdf(@Param('clientId', ParseIntPipe) clientId: number, @Res() res: Response) {
    const buffer = await this.service.exportProgressAsPDF(clientId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=client-${clientId}-progress.pdf`,
    });
    res.send(buffer);
  }
///-------------------For Report Generating as PDF from quickchart----------------------------------------------------------------------
  @Get('StepCountChart/:clientId')
  async getChart(@Param('clientId') clientId: number) {
    return {
      chartUrl: await this.service.generateChartStepCount(clientId),
    };
  }

  @Get('SleepChart/:clientId')
  async getChartSleepHour(@Param('clientId') clientId: number) {
    return {
      chartUrl: await this.service.generateChartSleepHour(clientId),
    };
  }

    @Get('sleep-efficiency-vs-calories/:clientId')
  async getSleepEfficiencyVsCaloriesChart(@Param('clientId') clientId: number) {
    const chartUrl = await this.service.generateSleepEfficiencyVsCaloriesChart(clientId);
    return { chartUrl };
  }

  
  @Get(':clientId/bubble-chart')
  async getBubbleChart(@Param('clientId') clientId: number) {
    const chartUrl = await this.service.generateBubbleChart(clientId);
    return { chartUrl };
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Export client progress to Excel
  // @Get('progress/:clientId/export-excel')
  // async exportExcel(@Param('clientId', ParseIntPipe) clientId: number, @Res() res: Response) {
  //   const buffer = await this.service.exportProgressAsExcel(clientId);
  //   res.set({
  //     'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     'Content-Disposition': `attachment; filename=client-${clientId}-progress.xlsx`,
  //   });
  //   res.send(buffer);
  // }

  //   @Get(':clientId/pdf')
  // async exportProgressAsPDF(
  //   @Param('clientId') clientId: number,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const pdfBuffer = await this.service.exportProgressAsPDFwithChart(clientId);
      
  //     // Set the response header for PDF download
  //     res.setHeader('Content-Type', 'application/pdf');
      
  //     res.setHeader('Content-Disposition', `attachment; filename=client-progress-${clientId}.pdf`);

  //     // Send the PDF buffer as the response
  //     res.end(pdfBuffer);
  //   } catch (error) {
  //     // Handle errors (e.g., no data found for the client)
  //     res.status(500).send('Error generating PDF');
  //   }
  // }

/////////-----------------------------------Graph Json data for visualizing in the front end====================================


  @Get('chart/step-count/:clientId')
  async getStepCountChartData(@Param('clientId') clientId: number) {
    return await this.service.getStepCountChartData(clientId);
  }

  @Get('chart/sleep-hours/:clientId')
  async getSleepHoursChartData(@Param('clientId') clientId: number) {
    return await this.service.getSleepHoursChartData(clientId);
  }

  @Get('chart/sleep-efficiency/:clientId')
  async getSleepEfficiencyVsCaloriesChartData(@Param('clientId') clientId: number) {
    return await this.service.getSleepEfficiencyVsCaloriesChartData(clientId);
  }

  @Get('chart/bubble/:clientId')
  async getBubbleChartData(@Param('clientId') clientId: number) {
    return await this.service.getBubbleChartData(clientId);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Get(':clientId/pdf')
async exportProgressAsPDF(
  @Param('clientId') clientId: number,
  @Res() res: Response,
  @Query('path') path: string // <-- New query param
) {
  try {
    const pdfBuffer = await this.service.exportProgressAsPDFwithChart(clientId, path);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=client-progress-${clientId}.pdf`);
    res.end(pdfBuffer);
  } catch (error) {
    res.status(500).send('Error generating PDF');
  }
}

    @Get('stats')
  async getAllClientsStats() {
    return this.service.getAllClientsStats();
  }

}
