import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product as ProductType } from '@types';

const API_URL = 'https://6900a9a4ff8d792314bae147.mockapi.io/api/v1/products';

interface ProductsState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  status: string;
}

const initialState: ProductsState = {
  status: 'idle',
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  ProductType[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL);
    return [...new Map(res.data.map(item => [item.title, item])).values()];
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<{ id: ProductType[] }>) {
      state.products = action.payload;
    },
    setProductQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.qty;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
        state.products = [];
        state.status = 'initial';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
        state.status = 'error';
      });
  },
});

export const { setProducts, setProductQty } = productsSlice.actions;
export default productsSlice.reducer;
