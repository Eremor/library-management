import { Mock } from "vitest";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { Loan } from "../../types/loan";
import { fetchLoanByBookId } from "./fetchLoanByBookId";

vi.mock('axios')

describe('fetchLoanByBookId', () => {
  const testFetchLoan: Loan = {
    id: '668f992a00a29ffa2b196039',
    bookId: '667ef942f79b76a3bce88eb4',
    userId: '667ec60e9df3d973701e3156',
    giveDate: new Date(Date.parse('2024-07-17T08:40:43.499Z')),
    returnDate: null,
    active: true
  }

  test('should fetchLoanByBookId with resolved response', async () => {
    const dispatch = vi.fn();

    (axios.get as Mock).mockReturnValue(Promise.resolve({
      data: testFetchLoan
    }))

    const thunk = fetchLoanByBookId('667ef942f79b76a3bce88eb4')

    await thunk(dispatch, () => ({}), { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls as PayloadAction[][];
    expect(start[0].type).toBe(fetchLoanByBookId.pending.type);
    expect(end[0].type).toBe(fetchLoanByBookId.fulfilled.type);
    expect(end[0].payload).toEqual(testFetchLoan);
  });
  test('should fetchLoanByBookId with rejected response', async () => {
    const dispatch = vi.fn();

    (axios.get as Mock).mockReturnValue(Promise.resolve({
      status: 404
    }));

    const thunk = fetchLoanByBookId('667ef942f79b76a3bce88eb4');

    await thunk(dispatch, () => ({}), { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(fetchLoanByBookId.pending.type);
    expect(end[0].type).toBe(fetchLoanByBookId.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
    expect(end[0].payload).toEqual('Запись в журнале выдачи книг не найдена')
  });
  test('should fetchLoanByBookId with empty response', async () => {
    const dispatch = vi.fn();

    (axios.get as Mock).mockReturnValue(Promise.resolve({
      status: 404
    }));

    const thunk = fetchLoanByBookId();

    await thunk(dispatch, () => ({}), { api: axios });

    expect(thunk).rejects.toThrowError();
  })
})