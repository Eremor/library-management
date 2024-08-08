import { Mock } from "vitest";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { Loan, LoanResponse } from "../../types/loan";
import { updateLoan } from "./updateLoan";

vi.mock('axios');

describe('updateLoan', () => {
  const testLoan: Loan = {
    id: '6697aa193193fddb5c7d3ffa',
    bookId: '667ef9aff79b76a3bce88eb5',
    userId: '667ec6239df3d973701e3157',
    giveDate: new Date(Date.parse('2024-07-17T11:25:13.705Z')),
    returnDate: null,
    active: true
  }

  const testUpdateLoan: LoanResponse = {
    loan: testLoan,
    book: {
      id: testLoan.bookId,
      title: 'Test'
    },
    user: {
      id: testLoan.userId,
      userName: 'user'
    }
  }

  test('should updateLoan with resolved response', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    (axios.patch as Mock).mockReturnValue(Promise.resolve({
      data: testUpdateLoan
    }))

    const thunk = updateLoan({
      bookId: testUpdateLoan.book.id,
      userId: testUpdateLoan.user.id
    });

    await thunk(dispatch, getState, { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3)

    const [start, middle, end] = calls as PayloadAction[][];
    expect(start[0].type).toBe(updateLoan.pending.type);
    expect(middle[0].payload).toBeUndefined();
    expect(end[0].type).toBe(updateLoan.fulfilled.type);
    expect(end[0].payload).toEqual(testUpdateLoan.loan);
  });
  test('should updateLoan with rejected response', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    (axios.patch as Mock).mockReturnValue(Promise.resolve({
      status: 404
    }));

    const thunk = updateLoan({
      bookId: testUpdateLoan.book.id,
      userId: testUpdateLoan.user.id
    });

    await thunk(dispatch, getState, { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(updateLoan.pending.type);
    expect(end[0].type).toBe(updateLoan.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
    expect(end[0].payload).toEqual('Не удалось вернуть книгу c ID: 667ef9aff79b76a3bce88eb5');
  });
  test('should updateLoan with empty response', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    (axios.patch as Mock).mockReturnValue(Promise.resolve({
      status: 403
    }));

    const thunk = updateLoan({
      bookId: '',
      userId: ''
    });

    await thunk(dispatch, getState, { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    
    const [_, end] = calls;
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  })
})