import { StateSchema } from "app/providers/StoreProvider"
import { BookStatus } from "../const/bookStatus"
import { Book } from "../types/book"
import { getBookData, getBookError, getBookIsLoading } from "./bookSelector"

describe('bookSelector', () => {
  test('should return book data', () => {
    const data: Book = {
      id: '667ef942f79b76a3bce88eb4',
      title: 'Дюна',
      author: 'Герберт Фрэнк',
      publicYear: 2024,
      genres: ['Научная фантастика'],
      status: BookStatus.AVAILABLE,
    }

    const state: DeepPartial<StateSchema> = {
      book: {
        data
      }
    }

    expect(getBookData(state as StateSchema)).toEqual(data)
  })
  test('should return loading', () => {
    const state: DeepPartial<StateSchema> = {
      book: {
        isLoading: true
      }
    }

    expect(getBookIsLoading(state as StateSchema)).toBeTruthy()
  })
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      book: {
        error: 'Book test error'
      }
    }

    expect(getBookError(state as StateSchema)).toEqual('Book test error')
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getBookData(state as StateSchema)).toBeUndefined()
  })
})