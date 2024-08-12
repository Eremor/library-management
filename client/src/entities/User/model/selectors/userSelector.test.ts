import { StateSchema } from "app/providers/StoreProvider"
import { UserRole } from "../const/role"
import { User } from "../types/user"
import { getAuthData, getUserRole } from "./userSelector"

describe('userSelector', () => {
  const testAuthData: User = {
    id: '1',
    userName: 'tester',
    password: '123',
    email: 'test@mail.ru',
    role: UserRole.USER
  }

  const state: DeepPartial<StateSchema> = {
    user: {
      authData: testAuthData
    }
  }

  test('should return auth data', () => {
    expect(getAuthData(state as StateSchema)).toBe(testAuthData)
  })
  test('should return user role', () => {
    expect(getUserRole(state as StateSchema)).toBe(UserRole.USER)
  })
})