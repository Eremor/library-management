import { AxiosInstance } from 'axios';

export interface StateSchema {

}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  state: StateSchema;
  rejectValue: T;
}
