export interface Trainer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  specialization?: string;
  bio?: string;
  experience?: number;
  certification?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Nutritionist {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  specialization?: string;
  bio?: string;
  experience?: number;
  certification?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
  profileImageUrl?: string;
  trainer?: {
    id: number;
    name: string;
  };
  nutritionist?: {
    id: number;
    name: string;
  };
}

export interface PendingUser {
  UserId: number;
  UName: string;
  Email: string;
  Password: string;
  RoleRequested: 'Trainer' | 'Nutritionist';
  Certification?: string;
  Specialization?: string;
  ExperienceYears?: number;
  Bio?: string;
  SubmittedAt: string;
  profileImageUrl?: string;
  Status: 'Pending' | 'Approved' | 'Rejected';
}


export interface DisplayUser {
  id: number;
  name: string;
  email: string;
  signup: string;
  image: string;
  role: string;
}

export type SelectedUser = Client | Trainer | Nutritionist | PendingUser | DisplayUser;

