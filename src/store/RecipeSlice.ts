import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type VisibleOn = 'welcome' | 'home' | 'both';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  liked: boolean;
  category?: string;
  createdAt: string;
  visibleOn?: VisibleOn;
  ingredients?: string[];
  instructions?: string;
}

interface RecipesState {
  recipes: Recipe[];
}

// Payload for addRecipe: excludes id and createdAt, includes optional fields
type AddRecipePayload = Omit<Partial<Recipe>, 'id' | 'createdAt'> & {
  title: string;
  description: string;
  image: string;
};

const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Ndole',
    description: 'A bitterleaf stew with peanuts and meat.',
    image: '/images/ndole-1.webp',
    rating: 5,
    liked: false,
    category: 'West Region',
    createdAt: '2024-05-01T12:00:00Z',
    visibleOn: 'both',
  },
  {
    id: '2',
    title: 'Eru',
    description: 'A flavorful mix of green leaves and water fufu.',
    image: '/images/Eru.jpeg',
    rating: 4,
    liked: false,
    createdAt: '2024-05-03T08:00:00Z',
    visibleOn: 'welcome',
  },
  {
    id: '3',
    title: 'Jollof Rice',
    description: 'Classic West African rice cooked in spicy tomato sauce.',
    image: '/images/jolof rice.jpeg',
    rating: 4,
    liked: false,
    category: 'West African Flavors',
    createdAt: '2024-05-28T09:30:00Z',
    visibleOn: 'both',
  },
  {
    id: '4',
    title: 'Fufu & Light Soup',
    description: 'Ghanaian fufu served with spicy light soup.',
    image: '/images/Fufu and light soup.jpeg',
    rating: 3,
    liked: false,
    createdAt: '2024-05-10T14:00:00Z',
    visibleOn: 'welcome',
  },
  {
    id: '5',
    title: 'Spaghetti Bolognese',
    description: 'Italian classic with rich meat sauce.',
    image: '/images/spaghetti-bolognese.jpeg',
    rating: 5,
    liked: false,
    createdAt: '2024-05-11T15:00:00Z',
    visibleOn: 'welcome',
  },
  {
    id: '6',
    title: 'Chicken Curry',
    description: 'Aromatic curry with tender chicken pieces.',
    image: '/images/chicken curry.jpeg',
    rating: 4,
    liked: false,
    createdAt: '2024-05-12T10:00:00Z',
    visibleOn: 'welcome',
  },
  {
    id: '7',
    title: 'Puff Puff',
    description: 'A local breakfast with a beautiful texture.',
    image: '/images/puff puff.jpeg',
    rating: 4,
    liked: false,
    createdAt: '2024-05-13T11:00:00Z',
    visibleOn: 'welcome',
  },
  {
    id: '8',
    title: 'Folere',
    description: 'Local refreshing drink to brighten your day.',
    image: '/images/Folere.jpg',
    rating: 4,
    liked: false,
    createdAt: '2024-05-14T16:00:00Z',
    visibleOn: 'welcome',
  },
];

const initialState: RecipesState = {
  recipes: initialRecipes,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const recipe = state.recipes.find(r => r.id === action.payload);
      if (recipe) {
        recipe.liked = !recipe.liked;
      }
    },
    setRating(state, action: PayloadAction<{ id: string; rating: number }>) {
      const { id, rating } = action.payload;
      const recipe = state.recipes.find(r => r.id === id);
      if (recipe) {
        recipe.rating = rating;
      }
    },
    addRecipe(state, action: PayloadAction<AddRecipePayload>) {
      const newRecipe: Recipe = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        rating: action.payload.rating ?? 0,
        liked: action.payload.liked ?? false,
        ingredients: action.payload.ingredients ?? [],
        instructions: action.payload.instructions ?? '',
        visibleOn: action.payload.visibleOn as VisibleOn | undefined,
      };
      state.recipes.push(newRecipe);
    },
    removeRecipe(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter(r => r.id !== action.payload);
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const index = state.recipes.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = {
          ...state.recipes[index],
          ...action.payload,
          createdAt: action.payload.createdAt ?? state.recipes[index].createdAt,
        };
      }
    },
  },
});

export const {
  toggleLike,
  setRating,
  addRecipe,
  removeRecipe,
  updateRecipe,
} = recipesSlice.actions;

export default recipesSlice.reducer;
