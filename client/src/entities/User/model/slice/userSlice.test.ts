import { UserRole } from "../const/role"
import { User, UserSchema } from "../types/user"
import { userActions, userReducer } from "./userSlice"

describe('userSlice', () => {
  const testAuthData: User = {
    id: '1',
    userName: 'tester',
    password: '123',
    email: 'test@mail.ru',
    role: UserRole.USER
  }

  test('should set auth data', () => {
    const state: DeepPartial<UserSchema> = {
      authData: undefined
    }

    expect(userReducer(
      state as UserSchema,
      userActions.setAuthData(testAuthData)
    )).toStrictEqual({
      authData: testAuthData
    })
  });
  test('should logout user', () => {
    const state: DeepPartial<UserSchema> = {
      authData: testAuthData
    };

    expect(userReducer(
      state as UserSchema,
      userActions.logout()
    ).authData).toBeUndefined()
  })
})