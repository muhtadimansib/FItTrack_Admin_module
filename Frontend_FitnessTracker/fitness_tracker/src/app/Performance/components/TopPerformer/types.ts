export type TrainerData = {
  type: "trainer";
  data: {
    id: number;
    name: string;
    image?: string;
    rating: number;
    clients: number;
    specialization: string;
    certification: string;
    bio: string;
  };
};

export type NutritionistData = {
  type: "nutritionist";
  data: {
    id: number;
    name: string;
    image?: string;
    rating: number;
    clients: number;
    specialization: string;
    certification: string;
    bio: string;
  };
};

export type ModalData = TrainerData | NutritionistData | null;
