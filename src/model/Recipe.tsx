// Public-facing recipe (from database or backend API)
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  liked: boolean;
}

// Extended recipe used by the user side with extra metadata
export interface UserRecipe extends Recipe {
  category: string;
  createdAt: Date;
}