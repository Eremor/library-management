import { Mock } from "vitest";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { Loan, LoanResponse } from "../../types/loan";
import { addLoan } from "./addLoan";

vi.mock('axios');

describe('addLoan', () => {
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

  test('should addLoan with resolved response', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    (axios.post as Mock).mockReturnValue(Promise.resolve({
      data: testUpdateLoan
    }))

    const thunk = addLoan({
      bookId: testUpdateLoan.book.id,
      userId: testUpdateLoan.user.id
    });

    await thunk(dispatch, getState, { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3)

    const [start, middle, end] = calls as PayloadAction[][];
    expect(start[0].type).toBe(addLoan.pending.type);
    expect(middle[0].payload).toBeUndefined();
    expect(end[0].type).toBe(addLoan.fulfilled.type);
    expect(end[0].payload).toEqual(testUpdateLoan.loan);
  });
  test('should addLoan with rejected response', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    (axios.post as Mock).mockReturnValue(Promise.resolve({
      status: 404
    }));

    const thunk = addLoan({
      bookId: testUpdateLoan.book.id,
      userId: testUpdateLoan.user.id
    });

    await thunk(dispatch, getState, { api: axios });

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(addLoan.pending.type);
    expect(end[0].type).toBe(addLoan.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
    expect(end[0].payload).toEqual('Не удалось арендобать книгу с ID: 667ef9aff79b76a3bce88eb5');
  });
  test('should addLoan with empty response', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    (axios.post as Mock).mockReturnValue(Promise.resolve({
      status: 403
    }));

    const thunk = addLoan({
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