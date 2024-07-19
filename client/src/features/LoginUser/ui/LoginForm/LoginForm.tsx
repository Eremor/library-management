import { memo, useCallback } from 'react';
import { Controller, DefaultValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Button, CircularProgress, TextField, Typography,
} from '@mui/material';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';
import { useAppDispatch } from 'shared/lib/hooks';

import { loginReducer } from '../../model/slice/loginSlice';
import { requestLogin } from '../../model/services/requestLogin/requestLogin';
import { getLoginError, getLoginIsLoading } from '../../model/selectors/loginSelector';

export interface LoginFormProps {
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  login: loginReducer,
};

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: DefaultValues<FormValues> = {
  email: '',
  password: '',
};

const LoginForm = memo(({ onSuccess }: LoginFormProps) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues,
  });
  const dispatch = useAppDispatch();
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onLoginSubmit = useCallback(async (data: FormValues) => {
    const result = await dispatch(requestLogin(data));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      reset();
    }
  }, [onSuccess, dispatch, reset]);

  return (
    <DynamicModuleLoader
      reducers={initialReducers}
    >
      <form
        onSubmit={handleSubmit(onLoginSubmit)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
        }}
      >
        <Controller
          name="email"
          control={control}
          render={({
            field: { value, onChange },
            fieldState: { error },
          }) => (
            <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              required
              label="Укажите свой email"
              variant="standard"
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({
            field: { value, onChange },
            fieldState: { error },
          }) => (
            <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              required
              label="Пароль"
              variant="standard"
              autoComplete="off"
            />
          )}
        />
        {error && (
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              bottom: '50px',
              color: '#f30e0e',
            }}
          >
            {error}
          </Typography>
        )}
        {isLoading && (
          <CircularProgress
            color="secondary"
            sx={{
              position: 'absolute',
              bottom: '45px',
              left: 'calc(50% - 20px)',
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 5,
          }}
          disabled={isLoading}
        >
          Войти
        </Button>
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
