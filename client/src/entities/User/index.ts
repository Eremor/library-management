export type {
  User,
  UserSchema,
} from './model/types/user';

export {
  UserRole,
} from './model/const/role';

export {
  userActions,
  userReducer,
} from './model/slice/userSlice';

export {
  getAuthData,
  getUserRole,
  isAdmin,
} from './model/selectors/userSelector';
