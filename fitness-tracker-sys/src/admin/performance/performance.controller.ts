// src/admin/performance/performance.controller.ts
import { Controller, Get, Param, ParseIntPipe, Query, Res, UseGuards } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';
import { Response as ExpressResponse } from 'express';

@Controller('admin/performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('trainer')
  async trainerStats(@Query('id') id: number) {
    return this.performanceService.getTrainerPerformance(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('nutritionist')
  async nutritionistStats(@Query('id') id: number) {
    return this.performanceService.getNutritionistPerformance(id);
  }

  @Get('nutritionist/:id/clients')
  getClientsOfNutritionist(@Param('id', ParseIntPipe) id: number) {
    return this.performanceService.getAssignedClientsForNutritionist(id);
  }

  @Get('trainer/:id/clients')
  getClientsOfTrainer(@Param('id', ParseIntPipe) id: number) {
    return this.performanceService.getAssignedClientsForTrainer(id);
  }

  //Weekly rating of the trainer and nutritionist
    @Get('trainer-weekly-ratings')
  getTrainerWeeklyRatings() {
    return this.performanceService.getWeeklyTrainerRatings();
  }

  @Get('nutritionist-weekly-ratings')
  getNutritionistWeeklyRatings() {
    return this.performanceService.getWeeklyNutritionistRatings();
  }

  //Getting experience related visualizations for understanding the quality of the system
  @Get('trainer/experience-distribution')
  async getTrainerExperienceDistribution() {
    return this.performanceService.getTrainerExperienceDistribution();
  }


  @Get('nutritionist/experience-distribution')
  async getNutritionistExperienceDistribution() {
    return this.performanceService.getNutritionistExperienceDistribution();
  }

/////////////////------------------------------------Trainer Performance---------------------------------------

  //Trainer Performance Stats
  @Get('AllTrainers')
  async getAllTrainerStats() {
    return this.performanceService.getAllTrainerPerformance();
  }

  //Generating quickchart for report purpose
    @Get('trainer/:id/weekly-rating-chart')
  async getTrainerRatingTrend(@Param('id', ParseIntPipe) id: number) {
    return this.performanceService.generateTrainerRatingTrend(id);
  }


  //Generating json data of Trainer Rating Trend for frontend
  @Get('trainer/:id/weekly-rating-chart-jsondata')
  async getTrainerRatingTrendData(@Param('id', ParseIntPipe) id: number) {
    return this.performanceService.getTrainerRatingTrendData(id);
  }

  //Generating chart of Client Goal Completion Rate for report purpose
    @Get('trainer/:trainerId/goal-completion-chart')
  async getGoalCompletionChart(@Param('trainerId') trainerId: number) {
    const url = await this.performanceService.generateClientGoalCompletionChart(trainerId);
    return { chartUrl: url };
  }

  //Generating json data of Client Goal Completion Rate for frontend
  @Get('trainer/:id/goal-completion-jsondata')
async getTrainerGoalCompletion(@Param('id', ParseIntPipe) id: number) {
  return this.performanceService.getClientGoalCompletionChartJSON(id);
}

//Export Report of a trainer
 @Get(':trainerId/pdf')
  async exportTrainerProgressAsPDF(
    @Param('trainerId') trainerId: number,
    @Res() res: ExpressResponse,
    @Query('path') path: string // Optional directory to save
  ) {
    try {
      const pdfBuffer = await this.performanceService.exportTrainerReportPDF(trainerId, path);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=trainer-progress-${trainerId}.pdf`);
      res.end(pdfBuffer);
    } catch (error) {
      console.error('PDF export error:', error);
      res.status(500).send('Error generating PDF');
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////

/////////////------------------------------------------Nutritionist Performance-----------------------------------------------

//TNutritionist Performance Stats
@Get('AllNutritionists')
async getAllNutritionistStats() {
  return this.performanceService.getAllNutritionistPerformance();
}

// Generate QuickChart URL for Nutritionist rating trend (report)
@Get('nutritionist/:id/weekly-rating-chart')
async getNutritionistRatingTrend(@Param('id', ParseIntPipe) id: number) {
  return this.performanceService.generateNutritionistRatingTrend(id);
}

// Generate JSON data for Nutritionist rating trend (frontend)
@Get('nutritionist/:id/weekly-rating-chart-jsondata')
async getNutritionistRatingTrendData(@Param('id', ParseIntPipe) id: number) {
  return this.performanceService.getNutritionistRatingTrendData(id);
}

// JSON data for frontend rendering
@Get('nutritionist/:id/mealplan-completion-jsondata')
async getMealPlanJSON(@Param('id', ParseIntPipe) id: number) {
  return this.performanceService.getClientMealPlanCompletionChartJSON(id);
}

// QuickChart URL for PDF export
@Get('nutritionist/:id/mealplan-completion-chart')
async getMealPlanChart(@Param('id', ParseIntPipe) id: number) {
  const url = await this.performanceService.generateClientMealPlanCompletionChart(id);
  return { chartUrl: url };
}

// Export Nutritionist PDF report
@Get('nutritionist/:nutritionistId/pdf')
async exportNutritionistProgressAsPDF(
  @Param('nutritionistId', ParseIntPipe) nutritionistId: number,
  @Res() res: ExpressResponse,
  @Query('path') path: string // Optional directory to save
) {
  try {
    const pdfBuffer = await this.performanceService.exportNutritionistReportPDF(nutritionistId, path);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=nutritionist-progress-${nutritionistId}.pdf`);
    res.end(pdfBuffer);
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).send('Error generating PDF');
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Top performer
  @Get('top-trainer')
  async getTopTrainer() {
    const topTrainer = await this.performanceService.getTopTrainer();
    return topTrainer ?? { message: 'No trainer ratings found' };
  }

  @Get('top-nutritionist')
  async getTopNutritionist() {
    const topNutritionist = await this.performanceService.getTopNutritionist();
    return topNutritionist ?? { message: 'No nutritionist ratings found' };
  }


}
