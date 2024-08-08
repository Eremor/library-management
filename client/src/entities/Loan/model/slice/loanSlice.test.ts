import { addLoan } from "../services/addLoan/addLoan";
import { fetchLoanByBookId } from "../services/fetchLoanByBookId/fetchLoanByBookId";
import { updateLoan } from "../services/updateLoan/updateLoan";
import { Loan } from "../types/loan";
import { LoanSchema } from "../types/loanSchema";
import { loanReducer } from "./loanSlice";

const initialState: LoanSchema = {
  isLoading: false,
  data: undefined,
  error: undefined
}

const testFetchLoanData: Loan = {
  id: '668f992a00a29ffa2b196039',
  bookId: '667ef942f79b76a3bce88eb4',
  userId: '667ec60e9df3d973701e3156',
  giveDate: new Date(Date.parse('2024-07-17T08:40:43.499Z')),
  returnDate: null,
  active: true
}

const testUpdateLoanData: Loan = {
  id: '668f992a00a29ffa2b196039',
  bookId: '667ef942f79b76a3bce88eb4',
  userId: '667ec60e9df3d973701e3156',
  giveDate: new Date(Date.parse('2024-07-17T08:40:43.499Z')),
  returnDate: new Date(Date.parse('2024-07-19T08:40:43.499Z')),
  active: false
}

describe('loanSlice', () => {
  test('test fetchLoanByBookId/pending', () => {
    const state = loanReducer(
      initialState,
      fetchLoanByBookId.pending(
        'fetchLoanByBookId/pending',
        '667ef942f79b76a3bce88eb4',
      )
    )
    expect(state.isLoading).toBeTruthy();
  });
  test('test fetchLoanByBookId/fulfilled', () => {
    const state = loanReducer(
      initialState,
      fetchLoanByBookId.fulfilled(
        testFetchLoanData,
        'fetchLoanByBookId/fulfilled',
        '667ef942f79b76a3bce88eb4',
      )
    )
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(testFetchLoanData);
  });
  test('test fetchLoanByBookId/rejected', () => {
    const action = {
      type: fetchLoanByBookId.rejected.type,
      payload: 'Запись в журнале выдачи книг не найдена'
    }
    const state = loanReducer(initialState, action)
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toBeUndefined();
    expect(state.error).toEqual('Запись в журнале выдачи книг не найдена');
  });
  test('test updateLoan/pending', () => {
    const state = loanReducer(
      initialState,
      updateLoan.pending(
        'updateLoan/pending',
        {
          bookId: '667ef942f79b76a3bce88eb4',
          userId: '667ec60e9df3d973701e3156'
        },
      )
    )
    expect(state.isLoading).toBeTruthy();
  });
  test('test updateLoan/fulfilled', () => {
    const state = loanReducer(
      initialState,
      updateLoan.fulfilled(
        testUpdateLoanData,
        'updateLoan/fulfilled',
        {
          bookId: '667ef942f79b76a3bce88eb4',
          userId: '667ec60e9df3d973701e3156'
        }
      )
    )
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(testUpdateLoanData);
  });
  test('test updateLoan/rejected', () => {
    const action = {
      type: updateLoan.rejected.type,
      payload: 'Не удалось вернуть книгу c ID: 667ef942f79b76a3bce88eb4'
    }
    const state = loanReducer(initialState, action)
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toBeUndefined();
    expect(state.error).toEqual('Не удалось вернуть книгу c ID: 667ef942f79b76a3bce88eb4');
  });
  test('test addLoan/pending', () => {
    const state = loanReducer(
      initialState,
      addLoan.pending(
        'addLoan/pending',
        {
          bookId: '667ef942f79b76a3bce88eb4',
          userId: '667ec60e9df3d973701e3156'
        },
      )
    )
    expect(state.isLoading).toBeTruthy();
  });
  test('test addLoan/fulfilled', () => {
    const state = loanReducer(
      initialState,
      addLoan.fulfilled(
        testFetchLoanData,
        'addLoan/fulfilled',
        {
          bookId: '667ef942f79b76a3bce88eb4',
          userId: '667ec60e9df3d973701e3156'
        }
      )
    )
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(testFetchLoanData);
  });
  test('test addLoan/rejected', () => {
    const action = {
      type: addLoan.rejected.type,
      payload: 'Не удалось арендобать книгу c ID: 667ef942f79b76a3bce88eb4'
    }
    const state = loanReducer(initialState, action)
    expect(state.isLoading).toBeFalsy();
    expect(state.data).toBeUndefined();
    expect(state.error).toEqual('Не удалось арендобать книгу c ID: 667ef942f79b76a3bce88eb4');
  });
})