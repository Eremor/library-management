import { StateSchema } from "app/providers/StoreProvider"
import { Loan } from "../types/loan"
import { getLoanData, getLoanError, getLoanIsLoading } from "./loanSelector"

describe('loanSelector', () => {
  test('should return loan data', () => {
    const data: Loan = {
      id: '6697aa193193fddb5c7d3ffa',
      bookId: '667ef9aff79b76a3bce88eb5',
      userId: '667ec6239df3d973701e3157',
      giveDate: new Date(Date.parse('2024-07-17T11:25:13.705Z')),
      returnDate: null,
      active: true
    }

    const state: DeepPartial<StateSchema> = {
      loan: {
        data
      }
    }

    expect(getLoanData(state as StateSchema)).toEqual(data)
  });
  test('should return loading', () => {
    const state: DeepPartial<StateSchema> = {
      loan: {
        isLoading: true
      }
    };

    expect(getLoanIsLoading(state as StateSchema)).toBeTruthy()
  });
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loan: {
        error: 'error'
      }
    };

    expect(getLoanError(state as StateSchema)).toEqual('error')
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoanData(state as StateSchema)).toBeUndefined();
  })
})