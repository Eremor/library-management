import { describe, test, vi, Mock } from 'vitest';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Book, UpdateBookData } from '../../types/book';
import { BookStatus } from '../../const/bookStatus';
import { updateBook } from './updateBook';

vi.mock('axios');

describe('updateBook', () => {
  const testUpdateBook: Book = {
    id: '667ef942f79b76a3bce88eb4',
    title: 'Test',
    author: 'Герберт Фрэнк',
    publicYear: 2023,
    genres: ['Научная фантастика'],
    status: BookStatus.AVAILABLE,
  };

  const reqData: { bookId: string, dto: UpdateBookData } = {
    bookId: '667ef942f79b76a3bce88eb4',
    dto: {
      title: 'Test',
      author: 'Герберт Фрэнк',
      publicYear: 2023,
      genres: ['Научная фантастика'],
    },
  };

  test('should fetchBookById with resolved response', async () => {
    const dispatch = vi.fn();

    (axios.patch as Mock).mockReturnValue(Promise.resolve({
      data: testUpdateBook
    }))

    const thunk = updateBook(reqData);

    await thunk(dispatch, () => ({}), { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2)

    const [start, end] = calls as PayloadAction[][];
    expect(start[0].type).toBe(updateBook.pending.type);
    expect(end[0].type).toBe(updateBook.fulfilled.type);
    expect(end[0].payload).toEqual(testUpdateBook);
  })
  test('should fetchBookById with rejected response', async () => {
    const dispatch = vi.fn();

    (axios.patch as Mock).mockReturnValue(Promise.resolve({
      status: 403
    }))

    const thunk = updateBook(reqData);

    await thunk(dispatch, () => ({}), { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2)

    const [start, end] = calls;
    expect(start[0].type).toBe(updateBook.pending.type);
    expect(end[0].type).toBe(updateBook.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
    expect(end[0].payload).toEqual('Не удалось изменить данные книги Test');
  })
  test('should fetchBookById with empty response', async () => {
    const reqDataWithoutId: { bookId: string, dto: UpdateBookData } = {
      bookId: '',
      dto: {
        title: 'Test',
        author: 'Герберт Фрэнк',
        publicYear: 2023,
        genres: ['Научная фантастика'],
      },
    };

    const dispatch = vi.fn();

    (axios.patch as Mock).mockReturnValue(Promise.resolve({
      status: 403
    }))

    const thunk = updateBook(reqDataWithoutId);
    await thunk(dispatch, () => ({}), { api: axios });

    expect(thunk).rejects.toThrowError();

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    
    const [_, end] = calls;
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  })
})