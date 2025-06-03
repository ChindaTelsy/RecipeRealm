import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipe {
  id: string;
  title: string;
  image: string;
  likes: number;
  rating: number;
}

interface User {
  uid: string;
  name: string;
  bio: string;
  joinDate: string;
  profileImage?: string;
  location: string;
  stats: {
    recipes: number;
    likes: number;
    avgRating: number;
  };
  recipes: Recipe[];
  likedRecipes: Recipe[];
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateProfileImage(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
    updateBio(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.bio = action.payload;
      }
    },
    addRecipe(state, action: PayloadAction<Recipe>) {
      if (state.user) {
        state.user.recipes.push(action.payload);
        state.user.stats.recipes += 1;
      }
    },
  },
});

export const { setUser, clearUser, updateProfileImage, updateBio, addRecipe } = userSlice.actions;
export default userSlice.reducer;
