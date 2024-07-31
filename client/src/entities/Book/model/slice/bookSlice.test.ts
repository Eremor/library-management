import { BookStatus } from '../const/bookStatus';
import { fetchBookById } from '../services/fetchBookById/fetchBookById';
import { updateBook } from '../services/updateBook/updateBook';
import { Book, UpdateBookData } from '../types/book';
import { BookSchema } from '../types/bookSchema';
import { bookReducer } from './bookSlice';

const initialState:BookSchema = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const testFetchBookData: Book = {
  id: '667ef942f79b76a3bce88eb4',
  title: 'Дюна',
  author: 'Герберт Фрэнк',
  publicYear: 2024,
  genres: ['Научная фантастика'],
  status: BookStatus.AVAILABLE,
};

const updateBookProps: { bookId: string, dto: UpdateBookData } = {
  bookId: '667ef942f79b76a3bce88eb4',
  dto: {
    ...testFetchBookData,
    title: 'Test',
    publicYear: 2023,
  },
};

describe('bookSlice', () => {
  test('test fetchBookById/pending', () => {
    const state = bookReducer(
      initialState,
      fetchBookById.pending('fetchBookById/pending', undefined),
    );
    expect(state.isLoading).toBeTruthy();
  });
  test('test fetchBookById/fulfilled', () => {
    const state = bookReducer(
      initialState,
      fetchBookById.fulfilled(testFetchBookData, 'fetchBookById/fulfilled', undefined),
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(testFetchBookData);
  });
  test('test fetchBookById/rejected', () => {
    const action = {
      type: fetchBookById.rejected.type,
      payload: 'Книга не найдена',
    };
    const state = bookReducer(initialState, action);
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toBeUndefined();
    expect(state.error).toEqual('Книга не найдена');
  });
  test('test updateBook/pending', () => {
    const state = bookReducer(
      initialState,
      updateBook.pending('updateBook/pending', updateBookProps),
    );
    expect(state.isLoading).toBeTruthy();
  });
  test('test updateBook/fulfilled', () => {
    const testUpdateBook: Book = {
      id: '667ef942f79b76a3bce88eb4',
      title: 'Test',
      author: 'Герберт Фрэнк',
      publicYear: 2023,
      genres: ['Научная фантастика'],
      status: BookStatus.AVAILABLE,
    };

    const state = bookReducer(
      initialState,
      updateBook.fulfilled(testUpdateBook, 'updateBook/fulfilled', updateBookProps),
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(testUpdateBook);
  });
  test('test updateBook/rejected', () => {
    const action = {
      type: updateBook.rejected.type,
      payload: 'Не удалось изменить данные книги 667ef942f79b76a3bce88eb4',
    };
    const state = bookReducer(initialState, action);
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toBeUndefined();
    expect(state.error).toEqual('Не удалось изменить данные книги 667ef942f79b76a3bce88eb4');
  });
});
