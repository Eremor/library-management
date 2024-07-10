import { memo, useCallback } from 'react';
import { Controller, DefaultValues, useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';

import { Modal } from 'shared/ui/Modal';

import { NewBook } from '../../model/types/NewBook';

interface AddNewBookModalProps {
  onSuccess: (data: NewBook) => void;
  onClose: () => void;
  isOpen: boolean;
}

interface FormValues {
  title: string;
  author: string;
  publicYear: number;
  genres: string;
}

const defaultValues: DefaultValues<FormValues> = {
  title: '',
  author: '',
  publicYear: new Date().getFullYear(),
  genres: '',
};

const AddNewBookModal = memo((props: AddNewBookModalProps) => {
  const {
    isOpen,
    onClose,
    onSuccess,
  } = props;
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = useCallback((data: FormValues) => {
    const arrGenres: string[] = data.genres.split(',').map((genre) => genre.trim());

    onSuccess({
      title: data.title,
      author: data.author,
      publicYear: Number(data.publicYear),
      genres: arrGenres,
    });
    reset();
    onClose();
  }, [onClose, onSuccess, reset]);

  const onCloseModal = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <Modal
      modalTitle="Добавить новую книгу"
      open={isOpen}
      onClose={onCloseModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
        }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Укажите название книги"
              variant="standard"
              autoComplete="off"
              {...register('title', {
                required: true,
              })}
              error={!!errors.title}
              helperText={errors.title && 'Необходимо указать название книги'}
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Укажите автора книги"
              variant="standard"
              autoComplete="off"
              {...register('author', {
                required: true,
              })}
              error={!!errors.author}
              helperText={errors.author && 'Необходимо указать автора'}
            />
          )}
        />
        <Controller
          name="publicYear"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Укажите год публикации книги"
              variant="standard"
              autoComplete="off"
              type="number"
              {...register('publicYear', {
                min: 1900,
                max: new Date().getFullYear(),
              })}
              error={!!errors.publicYear}
              helperText={
                errors.publicYear && 'Год публикации может быть в диапозоне с 1900 по текущий год'
              }
            />
          )}
        />
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Укажите жанр книги"
              variant="standard"
              autoComplete="off"
              {...register('genres', {
                required: true,
              })}
              error={!!errors.genres}
              helperText={errors.genres
                ? 'Необходимо указать хотя бы один жанр'
                : 'Если жанров много, то укажите их через запятую'}
            />
          )}
        />
        <Stack
          mt={4}
          justifyContent="space-between"
          direction="row"
        >
          <Button
            type="submit"
            variant="contained"
            disabled={!!errors.title || !!errors.author || !!errors.publicYear || !!errors.genres}
          >
            Добавить
          </Button>
          <Button onClick={onCloseModal}>
            Отмена
          </Button>
        </Stack>
      </form>
    </Modal>
  );
});

export { AddNewBookModal };
