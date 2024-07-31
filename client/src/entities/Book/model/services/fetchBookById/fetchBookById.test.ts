import { describe, test, vi, Mock } from 'vitest'
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { BookStatus } from '../../const/bookStatus';
import { Book } from '../../types/book';
import { fetchBookById } from './fetchBookById';

vi.mock('axios');

describe('fetchBookById', () => {
  test('should fetchBookById with resolved response', async () => {
    const testFetchBook: Book = {
      id: '667ef942f79b76a3bce88eb4',
      title: 'Дюна',
      author: 'Герберт Фрэнк',
      publicYear: 2024,
      genres: ['Научная фантастика'],
      status: BookStatus.AVAILABLE,
    };

    const dispatch = vi.fn();
    
    (axios.get as Mock).mockReturnValue(Promise.resolve({
      data: testFetchBook
    }))

    const thunk = fetchBookById('667ef942f79b76a3bce88eb4')

    await thunk(dispatch, () => ({}), { api: axios })

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2)
    
    const [start, end] = calls as PayloadAction[][];
    expect(start[0].type).toBe(fetchBookById.pending.type);
    expect(end[0].type).toBe(fetchBookById.fulfilled.type);
    expect(end[0].payload).toEqual(testFetchBook);
  });

  test('should fetchBookById with rejected response', async () => {
    const dispatch = vi.fn();
    
    (axios.get as Mock ).mockReturnValue(Promise.resolve({
      status: 404
    }))

    const thunk = fetchBookById('667ef942f79b76a3bce88eb4')

    await thunk(dispatch, () => ({}), { api: axios })

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    
    const [start, end] = calls;
    expect(start[0].type).toBe(fetchBookById.pending.type);
    expect(end[0].type).toBe(fetchBookById.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
    expect(end[0].payload).toEqual('Книга не найдена');
  });

  test('should fetchBookById with empty response', async () => {
    const dispatch = vi.fn();

    (axios.get as Mock ).mockReturnValue(Promise.resolve({
      status: 404
    }))

    const thunk = fetchBookById();
    await thunk(dispatch, () => ({}), { api: axios })

    expect(thunk).rejects.toThrowError()
  })
});
