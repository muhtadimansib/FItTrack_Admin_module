import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/admin/Entity/Trainer.entity';
import { Nutritionist } from 'src/admin/Entity/Nutritionist.entity';
import { TrainerRating } from 'src/admin/Entity/TrainerRating.entity';
import { NutritionistRating } from 'src/admin/Entity/NutritionistRating.entity';
import { Client } from 'src/admin/Entity/Client.entity';
import { In, Repository } from 'typeorm';
import { ClientGoal } from '../Entity/Client-goal.entity';
import * as PDFDocument from 'pdfkit';
import { Writable } from 'stream';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import { ClientMealPlan } from '../Entity/ClientMealPlan.entity';


@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepo: Repository<Trainer>,

    @InjectRepository(Nutritionist)
    private nutritionistRepo: Repository<Nutritionist>,

    @InjectRepository(TrainerRating)
    private trainerRatingRepo: Repository<TrainerRating>,

    @InjectRepository(NutritionistRating)
    private nutritionistRatingRepo: Repository<NutritionistRating>,

    @InjectRepository(Client)
    private clientRepo: Repository<Client>,

    @InjectRepository(ClientGoal)
    private clientGoalRepo: Repository<ClientGoal>,

    @InjectRepository(ClientMealPlan)
    private clientMealPlanRepo: Repository<ClientMealPlan>,

  ) {}

  async getTrainerPerformance(trainerId: number) {
  const trainer = await this.trainerRepo.findOne({
    where: { id: trainerId },
    relations: ['clients'], // To count assigned clients
  });

  if (!trainer) {
    throw new NotFoundException(`Trainer with ID ${trainerId} not found`);
  }

  // Get average rating
  const averageRatingResult = await this.trainerRatingRepo
    .createQueryBuilder('rating')
    .select('AVG(rating.rating)', 'avg')
    .where('rating.trainerId = :trainerId', { trainerId })
    .getRawOne();

  const averageRating = parseFloat(averageRatingResult?.avg) || 0;

  return {
    id: trainer.id,
    name: trainer.name,
    email: trainer.email,
    image: trainer.profileImageUrl ?? null, // or use `trainer.profileImage` if named differently
    averageRating,
    clientsCount: trainer.clients?.length || 0,
    experience: trainer.experience,
    specialization: trainer.specialization ?? null,
  };
}


  async getNutritionistPerformance(nutritionistId: number) {
    // Check if any ratings exist for this nutritionist
    const hasRating = await this.nutritionistRatingRepo.findOne({
      where: { nutritionist: { id: nutritionistId } },
    });
  
    if (!hasRating) {
      throw new NotFoundException(`No ratings found for Nutritionist with ID ${nutritionistId}`);
    }
  
    // Get average rating
    const averageRating = await this.nutritionistRatingRepo
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'avg')
      .where('rating.nutritionistId = :nutritionistId', { nutritionistId })
      .getRawOne();
  
    // Count assigned clients
    const assignedClients = await this.clientRepo.count({
      where: { nutritionist: { id: nutritionistId } },
    });
  
    return {
      nutritionistId,
      averageRating: parseFloat(averageRating.avg) || 0,
      assignedClientCount: assignedClients,
    };
  }

  async getAssignedClientsForNutritionist(nutritionistId: number) {
    const nutritionist = await this.nutritionistRepo.findOne({
      where: { id: nutritionistId },
      relations: ['clients'],
    });

    if (!nutritionist) {
      throw new NotFoundException('Nutritionist not found');
    }

    if (!nutritionist.clients || nutritionist.clients.length === 0) {
      throw new NotFoundException('No clients assigned to this nutritionist');
    }

    return {
        nutritionist_id:nutritionist.id,
        nutritionist_name:nutritionist.name,
        nutritionist_bio:nutritionist.bio,
        nutritionist_gender:nutritionist.gender,
        nutritionist_experience:nutritionist.experience,
        clients: nutritionist.clients
    };
  }
  
  async getAssignedClientsForTrainer(trainerId: number) {
    const trainer = await this.trainerRepo.findOne({
      where: { id: trainerId },
      relations: ['clients'],
    });

    // Check if trainer exists
    if (!trainer) {
        throw new NotFoundException('Trainer not found');
    }

    // Check if the trainer has any assigned clients
    if (trainer.clients.length === 0) {
        throw new NotFoundException('No clients assigned to this trainer');
    }

    return { 
        trainer_id:trainer.id,
        trainer_name:trainer.name,
        trainer_bio:trainer.bio,
        trainer_gender:trainer.gender,
        trainer_experience:trainer.experience,
        clients: trainer.clients
    };
}

      //Weekly rating for the trainer and nutritionist
      async getWeeklyTrainerRatings() {
        return this.trainerRatingRepo
          .createQueryBuilder('rating')
          .select("TO_CHAR(DATE_TRUNC('week', rating.createdAt), 'YYYY-MM-DD')", 'week')
          .addSelect('AVG(rating.rating)', 'avgRating')
          .groupBy('week')
          .orderBy('week', 'ASC')
          .getRawMany();
      }

      async getWeeklyNutritionistRatings() {
        return this.nutritionistRatingRepo
          .createQueryBuilder('rating')
          .select("TO_CHAR(DATE_TRUNC('week', rating.createdAt), 'YYYY-MM-DD')", 'week')
          .addSelect('AVG(rating.rating)', 'avgRating')
          .groupBy('week')
          .orderBy('week', 'ASC')
          .getRawMany();
    }

    //Getting experience related visualizations for understanding the quality of the system
      async getTrainerExperienceDistribution() {
    const rawData = await this.trainerRepo
      .createQueryBuilder('trainer')
      .select(`
        CASE
          WHEN trainer.experience BETWEEN 0 AND 2 THEN '0-2'
          WHEN trainer.experience BETWEEN 3 AND 5 THEN '3-5'
          WHEN trainer.experience BETWEEN 6 AND 10 THEN '6-10'
          WHEN trainer.experience > 10 THEN '10+'
          ELSE 'Unknown'
        END AS "experienceRange",
        COUNT(*) as count
      `)
      .groupBy('"experienceRange"')
      .orderBy('"experienceRange"')
      .getRawMany();

    const ranges = ['0-2', '3-5', '6-10', '10+', 'Unknown'];
    return ranges.map((range) => {
      const found = rawData.find((d) => d.experienceRange === range);
      return {
        experienceRange: range,
        count: found ? Number(found.count) : 0,
      };
    });
  }

  async getNutritionistExperienceDistribution() {
  const rawData = await this.nutritionistRepo
    .createQueryBuilder('nutritionist')
    .select(`
      CASE
        WHEN nutritionist.experience BETWEEN 0 AND 2 THEN '0-2'
        WHEN nutritionist.experience BETWEEN 3 AND 5 THEN '3-5'
        WHEN nutritionist.experience BETWEEN 6 AND 10 THEN '6-10'
        WHEN nutritionist.experience > 10 THEN '10+'
        ELSE 'Unknown'
      END AS "experienceRange",
      COUNT(*) as count
    `)
    .groupBy('"experienceRange"')
    .orderBy('"experienceRange"')
    .getRawMany();

  const ranges = ['0-2', '3-5', '6-10', '10+', 'Unknown'];
  return ranges.map((range) => {
    const found = rawData.find((d) => d.experienceRange === range);
    return {
      experienceRange: range,
      count: found ? Number(found.count) : 0,
    };
  });
}


/////////////////////////-------------------------------Trainer Performance------------------------------------------------------------------

//Getting trainer performance metrics for the frontend
async getAllTrainerPerformance(): Promise<any[]> {
  const trainers = await this.trainerRepo.find({ relations: ['clients'] });

  return await Promise.all(
    trainers.map(async (trainer) => {
      const avg = await this.trainerRatingRepo
        .createQueryBuilder('rating')
        .select('AVG(rating.rating)', 'avg')
        .where('rating.trainerId = :trainerId', { trainerId: trainer.id })
        .getRawOne();

      return {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        image: trainer.profileImageUrl ?? null,
        averageRating: parseFloat(avg?.avg) || "NA",
        clientsCount: trainer.clients?.length || "NA",
        experience: trainer.experience,
        specialization: trainer.specialization ?? null,
      };
    })
  );
  
}

//Generating quickchart of rating trend for report purpose
async generateTrainerRatingTrend(trainerId: number): Promise<string> {
  const dailyAverages = await this.trainerRatingRepo
    .createQueryBuilder('rating')
    .select("TO_CHAR(rating.createdAt, 'YYYY-MM-DD')", 'date')
    .addSelect('AVG(rating.rating)', 'avgRating')
    .where('rating.trainerId = :trainerId', { trainerId })
    .groupBy('date')
    .orderBy('date', 'ASC')
    .getRawMany();

  const labels = dailyAverages.map((entry) => entry.date);
  const data = dailyAverages.map((entry) => parseFloat(entry.avgRating));

  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Average Daily Rating',
          data,
          fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.3,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Trainer ${trainerId} - Daily Avg Ratings`,
          font: { size: 18 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          title: {
            display: true,
            text: 'Average Rating',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    },
  };

  const encoded = encodeURIComponent(JSON.stringify(chartConfig));
  return `https://quickchart.io/chart?c=${encoded}`;
}



//Generating json data of Trainer Rating Trend for frontend
async getTrainerRatingTrendData(trainerId: number): Promise<
  { date: string; averageRating: number }[]
> {
  const dailyAverages = await this.trainerRatingRepo
    .createQueryBuilder('rating')
    .select("TO_CHAR(rating.createdAt, 'YYYY-MM-DD')", 'date')
    .addSelect('AVG(rating.rating)', 'averageRating')
    .where('rating.trainerId = :trainerId', { trainerId })
    .groupBy('date')
    .orderBy('date', 'ASC')
    .getRawMany();

  return dailyAverages.map((entry) => ({
    date: entry.date,
    averageRating: parseFloat(entry.averageRating),
  }));
}

//Generating chart of Client Goal Completion Rate for report purpose
  async generateClientGoalCompletionChart(trainerId: number): Promise<string> {
    const clients = await this.clientRepo.find({
      where: { trainer: { id: trainerId } },
      select: ['id', 'name'],
    });

    const clientIds = clients.map((c) => c.id);

    if (clientIds.length === 0) {
      return ''; // or some placeholder chart
    }

    const completedCounts = await this.clientGoalRepo
      .createQueryBuilder('goal')
      .select('goal.clientId', 'clientId')
      .addSelect('COUNT(*)', 'completedCount')
      .where('goal.clientId IN (:...clientIds)', { clientIds })
      .andWhere('goal.isCompleted = true')
      .groupBy('goal.clientId')
      .getRawMany();

    const totalCounts = await this.clientGoalRepo
      .createQueryBuilder('goal')
      .select('goal.clientId', 'clientId')
      .addSelect('COUNT(*)', 'totalCount')
      .where('goal.clientId IN (:...clientIds)', { clientIds })
      .groupBy('goal.clientId')
      .getRawMany();

    const result = clients.map((client) => {
      const total = totalCounts.find((g) => g.clientId === client.id)?.totalCount || 0;
      const completed = completedCounts.find((g) => g.clientId === client.id)?.completedCount || 0;
      const rate = total > 0 ? +(completed / total * 100).toFixed(1) : 0;

      return {
        name: client.name,
        rate,
      };
    });

    // Chart config
    const chartConfig = {
      type: 'bar',
      data: {
        labels: result.map((r) => r.name),
        datasets: [
          {
            label: 'Goal Completion Rate (%)',
            data: result.map((r) => r.rate),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Client Goal Completion Rate for Trainer ${trainerId}`,
            font: { size: 18 },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '% Completed',
            },
          },
        },
      },
    };

    const encoded = encodeURIComponent(JSON.stringify(chartConfig));
    return `https://quickchart.io/chart?c=${encoded}`;
  }


//Generating json data of Client Goal Completion Rate for frontend

async fetchImageBuffer(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

async getClientGoalCompletionChartJSON(trainerId: number) {
  const clients = await this.clientRepo.find({
    where: { trainer: { id: trainerId } },
    select: ['id', 'name'],
  });

  const clientIds = clients.map((c) => c.id);

  if (clientIds.length === 0) {
    return {
      labels: [],
      data: [],
    };
  }

  const completedCounts = await this.clientGoalRepo
    .createQueryBuilder('goal')
    .select('goal.clientId', 'clientId')
    .addSelect('COUNT(*)', 'completedCount')
    .where('goal.clientId IN (:...clientIds)', { clientIds })
    .andWhere('goal.isCompleted = true')
    .groupBy('goal.clientId')
    .getRawMany();

  const totalCounts = await this.clientGoalRepo
    .createQueryBuilder('goal')
    .select('goal.clientId', 'clientId')
    .addSelect('COUNT(*)', 'totalCount')
    .where('goal.clientId IN (:...clientIds)', { clientIds })
    .groupBy('goal.clientId')
    .getRawMany();

  const chartData = clients.map((client) => {
    const total = +totalCounts.find((g) => g.clientId === client.id)?.totalCount || 0;
    const completed = +completedCounts.find((g) => g.clientId === client.id)?.completedCount || 0;
    const rate = total > 0 ? +(completed / total * 100).toFixed(1) : 0;
    return {
      name: client.name,
      rate,
    };
  });

  return chartData; // [{ name: 'Client A', rate: 70.5 }, ...]
}


//Exporting report of a trainer

async exportTrainerReportPDF(trainerId: number, exportPath: string): Promise<Buffer> {
  // Fetch trainer with clients relation
  const trainer = await this.trainerRepo.findOne({
    where: { id: trainerId },
    relations: ['clients'],
  });

  if (!trainer) throw new NotFoundException('Trainer not found');

  const clientIds = trainer.clients.map((c) => c.id);

  // Fetch goals of clients assigned to this trainer
  const goals = await this.clientGoalRepo.find({
    where: { client: { id: In(clientIds) } },
    relations: ['client'],
  });

  const completedGoals = goals.filter((g) => g.isCompleted);
  const incompleteGoals = goals.filter((g) => !g.isCompleted);

  // Get average rating
  const avgRating = await this.trainerRatingRepo
    .createQueryBuilder('rating')
    .select('AVG(rating.rating)', 'avg')
    .where('rating.trainerId = :trainerId', { trainerId })
    .getRawOne();

  const doc = new PDFDocument();
  const chunks: any[] = [];

  // Writable stream to collect the PDF chunks
  const stream = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk);
      callback();
    },
  });

  // Determine export directory
  const exportDir = exportPath
    ? path.resolve(process.cwd(), exportPath)
    : path.join(process.cwd(), 'exports');

  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

  // File path for saving PDF (optional)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(exportDir, `trainer-report-${trainerId}-${timestamp}.pdf`);
  const fileStream = fs.createWriteStream(filePath);

  // Pipe PDF output to both buffer and file
  doc.pipe(stream);
  doc.pipe(fileStream);

  // --- Page 1: Trainer Basic Info ---
  doc.fontSize(20).text(`Trainer Report - ${trainer.name}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(14);
  doc.text(`Email: ${trainer.email}`);
  doc.text(`Experience: ${trainer.experience ?? 'N/A'} years`);
  doc.text(`Assigned Clients: ${trainer.clients.length}`);
  doc.text(`Specialization: ${trainer.specialization ?? 'N/A'}`);
  doc.text(`Certification: ${trainer.certification ?? 'N/A'}`);
  doc.text(`Gender: ${trainer.gender ?? 'N/A'}`);
  doc.text(`Average Rating: ${(parseFloat(avgRating?.avg) || 0).toFixed(2)}`);

  doc.addPage();

  // --- Page 2: Completed Goals ---
  doc.fontSize(16).text('Completed Goals:', { underline: true });
  doc.moveDown();
  completedGoals.forEach((goal, i) => {
    doc.fontSize(12).text(
      `${i + 1}. ${goal.client.name} (${goal.client.email})\n` +
      `   - Goal: ${goal.goal}\n` +
      `   - Created: ${goal.createdAt.toDateString()}\n` +
      `   - Target: ${new Date(goal.targetDate).toDateString()}`
    );
    doc.moveDown();
  });

  doc.addPage();

  // --- Page 3: Incomplete Goals ---
  doc.fontSize(16).text('Incomplete Goals:', { underline: true });
  doc.moveDown();
  incompleteGoals.forEach((goal, i) => {
    doc.fontSize(12).text(
      `${i + 1}. ${goal.client.name} (${goal.client.email})\n` +
      `   - Goal: ${goal.goal}\n` +
      `   - Created: ${goal.createdAt.toDateString()}\n` +
      `   - Target: ${new Date(goal.targetDate).toDateString()}`
    );
    doc.moveDown();
  });

  doc.addPage();

  // --- Page 4: Charts ---
  doc.fontSize(16).text('Rating Trend & Goal Completion Chart:', { underline: true });
  doc.moveDown();

  // Get chart URLs from your existing functions
  const ratingChartUrl = await this.generateTrainerRatingTrend(trainerId);
  const goalChartUrl = await this.generateClientGoalCompletionChart(trainerId);

  // Fetch images as buffers
  if (ratingChartUrl) {
  const ratingChartBuffer = await this.fetchImageBuffer(ratingChartUrl);
  doc.image(ratingChartBuffer, { fit: [500, 300] });
  doc.addPage();
  } else {
    doc.text('Rating chart not available.');
    doc.addPage();
  }

  if (goalChartUrl) {
  const goalChartBuffer = await this.fetchImageBuffer(goalChartUrl);
  doc.image(goalChartBuffer, { fit: [500, 300] });
} else {
  doc.text('Goal chart not available.');
}
   doc.end();

  // Return the PDF buffer when stream finishes
  return new Promise<Buffer>((resolve, reject) => {
    stream.on('finish', () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on('error', reject);
  });
}

async getTopTrainer() {
  // Step 1: Get trainers with client count >= 5
  const trainersWithClients = await this.clientRepo
    .createQueryBuilder('client')
    .select('client.trainerId', 'trainerId')
    .addSelect('COUNT(client.id)', 'clientsCount')
    .groupBy('client.trainerId')
    .having('COUNT(client.id) >= :minClients', { minClients: 5 })
    .getRawMany();

  if (trainersWithClients.length === 0) {
    return null; // No trainer meets the client count criteria
  }

  const qualifiedTrainerIds = trainersWithClients.map(t => t.trainerId);

  // Step 2: Get avg rating of those trainers and pick top one
const topTrainer = await this.trainerRatingRepo
  .createQueryBuilder('rating')
  .select('rating.trainerId', 'trainerId')
  .addSelect('AVG(rating.rating)', 'averageRating')
  .where('rating.trainerId IN (:...trainerIds)', { trainerIds: qualifiedTrainerIds })
  .groupBy('rating.trainerId')
  .orderBy('AVG(rating.rating)', 'DESC')  // <-- use full aggregate expression here
  .limit(1)
  .getRawOne();

  if (!topTrainer) return null;

  // Step 3: Fetch full trainer info and clients count for response
  const trainer = await this.trainerRepo.findOne({ where: { id: topTrainer.trainerId } });
  const clientsCount = trainersWithClients.find(t => t.trainerId === topTrainer.trainerId)?.clientsCount ?? 0;

  return {
    id: trainer?.id,
    name: trainer?.name,
    image:trainer?.profileImageUrl,
    averageRating: Number(topTrainer.averageRating).toFixed(2),
    clientsCount,
    specialization:trainer?.specialization,
    certification:trainer?.certification,
    bio:trainer?.bio,
  };
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////======================================Nutritionist Performance--------------------------------------------------------------

//Getting Nutritionist performance metrics for the frontend

async getAllNutritionistPerformance(): Promise<any[]> {
  const nutritionists = await this.nutritionistRepo.find({ relations: ['clients'] });

  return await Promise.all(
    nutritionists.map(async (nutritionist) => {
      const avg = await this.nutritionistRatingRepo
        .createQueryBuilder('rating')
        .select('AVG(rating.rating)', 'avg')
        .where('rating.nutritionistId = :nutritionistId', { nutritionistId: nutritionist.id })
        .getRawOne();

      return {
        id: nutritionist.id,
        name: nutritionist.name,
        email: nutritionist.email,
        image: nutritionist.profileImageUrl ?? null,
        averageRating: parseFloat(avg?.avg) || "NA",
        clientsCount: nutritionist.clients?.length || "NA",
        experience: nutritionist.experience,
        specialization: nutritionist.specialization ?? null,
      };
    })
  );
}

// Generate QuickChart URL for nutritionist rating trend (report)
async generateNutritionistRatingTrend(nutritionistId: number): Promise<string> {
  const dailyAverages = await this.nutritionistRatingRepo
    .createQueryBuilder('rating')
    .select("TO_CHAR(rating.createdAt, 'YYYY-MM-DD')", 'date')
    .addSelect('AVG(rating.rating)', 'avgRating')
    .where('rating.nutritionistId = :nutritionistId', { nutritionistId })
    .groupBy('date')
    .orderBy('date', 'ASC')
    .getRawMany();

  const labels = dailyAverages.map((entry) => entry.date);
  const data = dailyAverages.map((entry) => parseFloat(entry.avgRating));

  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Average Daily Rating',
          data,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)', // changed color for distinction
          tension: 0.3,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Nutritionist ${nutritionistId} - Daily Avg Ratings`,
          font: { size: 18 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          title: {
            display: true,
            text: 'Average Rating',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    },
  };

  const encoded = encodeURIComponent(JSON.stringify(chartConfig));
  return `https://quickchart.io/chart?c=${encoded}`;
}

// Generate JSON data for nutritionist rating trend (frontend)
async getNutritionistRatingTrendData(nutritionistId: number): Promise<
  { date: string; averageRating: number }[]
> {
  const dailyAverages = await this.nutritionistRatingRepo
    .createQueryBuilder('rating')
    .select("TO_CHAR(rating.createdAt, 'YYYY-MM-DD')", 'date')
    .addSelect('AVG(rating.rating)', 'averageRating')
    .where('rating.nutritionistId = :nutritionistId', { nutritionistId })
    .groupBy('date')
    .orderBy('date', 'ASC')
    .getRawMany();

  return dailyAverages.map((entry) => ({
    date: entry.date,
    averageRating: parseFloat(entry.averageRating),
  }));
}

// JSON data for meal plan completion of clients under a specific nutritionist
async getClientMealPlanCompletionChartJSON(nutritionistId: number): Promise<{ name: string; rate: number }[]> {
  const clients = await this.clientRepo.find({
    where: { nutritionist: { id: nutritionistId } },
    select: ['id', 'name'],
  });

  const clientIds = clients.map((c) => c.id);
  if (!clientIds.length) return [];

  const completedCounts = await this.clientMealPlanRepo
    .createQueryBuilder('plan')
    .select('plan.clientId', 'clientId')
    .addSelect('COUNT(*)', 'completedCount')
    .where('plan.clientId IN (:...clientIds)', { clientIds })
    .andWhere('plan.isCompleted = true')
    .groupBy('plan.clientId')
    .getRawMany();

  const totalCounts = await this.clientMealPlanRepo
    .createQueryBuilder('plan')
    .select('plan.clientId', 'clientId')
    .addSelect('COUNT(*)', 'totalCount')
    .where('plan.clientId IN (:...clientIds)', { clientIds })
    .groupBy('plan.clientId')
    .getRawMany();

  return clients.map((client) => {
    const total = +totalCounts.find((g) => g.clientId === client.id)?.totalCount || 0;
    const completed = +completedCounts.find((g) => g.clientId === client.id)?.completedCount || 0;
    const rate = total > 0 ? +(completed / total * 100).toFixed(1) : 0;
    return { name: client.name, rate };
  });
}

// Chart image for PDF report
async generateClientMealPlanCompletionChart(nutritionistId: number): Promise<string> {
  const data = await this.getClientMealPlanCompletionChartJSON(nutritionistId);
  if (!data.length) return '';

  const chartConfig = {
    type: 'bar',
    data: {
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: 'Meal Plan Completion Rate (%)',
          data: data.map((d) => d.rate),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Client Meal Plan Completion Rate for Nutritionist ${nutritionistId}`,
          font: { size: 18 },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: '% Completed' },
        },
      },
    },
  };

  const encoded = encodeURIComponent(JSON.stringify(chartConfig));
  return `https://quickchart.io/chart?c=${encoded}`;
}


async exportNutritionistReportPDF(nutritionistId: number, exportPath: string): Promise<Buffer> {
  // Fetch nutritionist with clients relation
  const nutritionist = await this.nutritionistRepo.findOne({
    where: { id: nutritionistId },
    relations: ['clients'],
  });

  if (!nutritionist) throw new NotFoundException('Nutritionist not found');

  const clientIds = nutritionist.clients.map((c) => c.id);

  // Fetch meal plans of clients assigned to this nutritionist
  const mealPlans = await this.clientMealPlanRepo.find({
    where: { client: { id: In(clientIds) } },
    relations: ['client'],
  });

  const completedPlans = mealPlans.filter((p) => p.isCompleted);
  const incompletePlans = mealPlans.filter((p) => !p.isCompleted);

  // Get average rating for nutritionist
  const avgRating = await this.nutritionistRatingRepo
    .createQueryBuilder('rating')
    .select('AVG(rating.rating)', 'avg')
    .where('rating.nutritionistId = :nutritionistId', { nutritionistId })
    .getRawOne();

  const doc = new PDFDocument();
  const chunks: any[] = [];

  // Writable stream to collect the PDF chunks
  const stream = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk);
      callback();
    },
  });

  // Determine export directory
  const exportDir = exportPath
    ? path.resolve(process.cwd(), exportPath)
    : path.join(process.cwd(), 'exports');

  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

  // File path for saving PDF (optional)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(exportDir, `nutritionist-report-${nutritionistId}-${timestamp}.pdf`);
  const fileStream = fs.createWriteStream(filePath);

  // Pipe PDF output to both buffer and file
  doc.pipe(stream);
  doc.pipe(fileStream);

  // --- Page 1: Nutritionist Basic Info ---
  doc.fontSize(20).text(`Nutritionist Report - ${nutritionist.name}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(14);
  doc.text(`Email: ${nutritionist.email}`);
  doc.text(`Experience: ${nutritionist.experience ?? 'N/A'} years`);
  doc.text(`Assigned Clients: ${nutritionist.clients.length}`);
  doc.text(`Specialization: ${nutritionist.specialization ?? 'N/A'}`);
  doc.text(`Certification: ${nutritionist.certification ?? 'N/A'}`);
  doc.text(`Gender: ${nutritionist.gender ?? 'N/A'}`);
  doc.text(`Average Rating: ${(parseFloat(avgRating?.avg) || 0).toFixed(2)}`);

  doc.addPage();

  // --- Page 2: Completed Meal Plans ---
  doc.fontSize(16).text('Completed Meal Plans:', { underline: true });
  doc.moveDown();
  completedPlans.forEach((plan, i) => {
    const createdAtDate = new Date(plan.createdAt);
    const targetDateDate = new Date(plan.targetDate);

    doc.fontSize(12).text(
      `${i + 1}. ${plan.client.name} (${plan.client.email})\n` +
      `   - Plan: ${plan.plan}\n` +
      `   - Created: ${createdAtDate.toDateString()}\n` +
      `   - Target: ${targetDateDate.toDateString()}`
    );
    doc.moveDown();
  });

  doc.addPage();

  // --- Page 3: Incomplete Meal Plans ---
  doc.fontSize(16).text('Incomplete Meal Plans:', { underline: true });
  doc.moveDown();
  incompletePlans.forEach((plan, i) => {
    const createdAtDate = new Date(plan.createdAt);
    const targetDateDate = new Date(plan.targetDate);

    doc.fontSize(12).text(
      `${i + 1}. ${plan.client.name} (${plan.client.email})\n` +
      `   - Plan: ${plan.plan}\n` +
      `   - Created: ${createdAtDate.toDateString()}\n` +
      `   - Target: ${targetDateDate.toDateString()}`
    );
    doc.moveDown();
  });

  doc.addPage();

  // --- Page 4: Charts ---
  doc.fontSize(16).text('Rating Trend & Meal Plan Completion Chart:', { underline: true });
  doc.moveDown();

  // Get chart URLs from your existing functions
  const ratingChartUrl = await this.generateNutritionistRatingTrend(nutritionistId);
  const mealPlanChartUrl = await this.generateClientMealPlanCompletionChart(nutritionistId);

  // Fetch images as buffers
  if (ratingChartUrl) {
    const ratingChartBuffer = await this.fetchImageBuffer(ratingChartUrl);
    doc.image(ratingChartBuffer, { fit: [500, 300] });
    doc.addPage();
  } else {
    doc.text('Rating chart not available.');
    doc.addPage();
  }

  if (mealPlanChartUrl) {
    const mealPlanChartBuffer = await this.fetchImageBuffer(mealPlanChartUrl);
    doc.image(mealPlanChartBuffer, { fit: [500, 300] });
  } else {
    doc.text('Meal Plan Completion chart not available.');
  }

  doc.end();

  // Return the PDF buffer when stream finishes
  return new Promise<Buffer>((resolve, reject) => {
    stream.on('finish', () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on('error', reject);
  });
}

//Top Nutritionist
async getTopNutritionist() {
  // Step 1: Nutritionists with at least 5 clients
  const nutritionistsWithClients = await this.clientRepo
    .createQueryBuilder('client')
    .select('client.nutritionistId', 'nutritionistId')
    .addSelect('COUNT(client.id)', 'clientsCount')
    .groupBy('client.nutritionistId')
    .having('COUNT(client.id) >= :minClients', { minClients: 5 })
    .getRawMany();

  if (nutritionistsWithClients.length === 0) return null;

  const qualifiedNutritionistIds = nutritionistsWithClients.map(n => n.nutritionistId);

  // Step 2: Avg rating for those nutritionists
const topNutritionist = await this.nutritionistRatingRepo
  .createQueryBuilder('rating')
  .select('rating.nutritionistId', 'nutritionistId')
  .addSelect('AVG(rating.rating)', 'averageRating')
  .where('rating.nutritionistId IN (:...nutritionistIds)', { nutritionistIds: qualifiedNutritionistIds })
  .groupBy('rating.nutritionistId')
  .orderBy('AVG(rating.rating)', 'DESC')  // <-- fix here too
  .limit(1)
  .getRawOne();


  if (!topNutritionist) return null;

  // Step 3: Fetch full nutritionist info + clients count
  const nutritionist = await this.nutritionistRepo.findOne({ where: { id: topNutritionist.nutritionistId } });
  const clientsCount = nutritionistsWithClients.find(n => n.nutritionistId === topNutritionist.nutritionistId)?.clientsCount ?? 0;

  return {
    id: nutritionist?.id,
    image:nutritionist?.profileImageUrl,
    name: nutritionist?.name,
    averageRating: Number(topNutritionist.averageRating).toFixed(2),
    clientsCount,
    specialization: nutritionist?.specialization,
    certification: nutritionist?.certification,
    bio: nutritionist?.bio,
  };
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
