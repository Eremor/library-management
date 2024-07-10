import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { NewBook } from 'features/AddNewBook';

import { Book } from 'entities/Book';

import { fetchAllBooks } from '../fetchAllBooks/fetchAllBooks';

export const createNewBook = createAsyncThunk<
  Book,
  NewBook,
  ThunkConfig<string>
>(
  'booksPage/addNewBook',
  async (newBookData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.post<Book>('/book', newBookData);

      if (!response) {
        throw new Error();
      }

      dispatch(fetchAllBooks());
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось добавить новую книгу');
    }
  },
);
