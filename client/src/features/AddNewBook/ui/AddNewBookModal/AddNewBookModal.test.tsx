import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddNewBookModal } from "./AddNewBookModal";

describe('AddNewBookModal', () => {
  const onSuccess = vi.fn();
  const onClose = vi.fn();

  test('should display modal', () => {
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();
  });
  test('should be change title', async () => {
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();
  
    const inputTitle = screen.getByTestId('AddNewBookModal.Title').children[1].children[0];
    expect(inputTitle).toContainHTML('');

    await userEvent.type(inputTitle, 'Test title');
    expect(
      screen.getByTestId('AddNewBookModal.Title').children[1].children[0]
    ).toHaveValue('Test title');
  });
  test('should be change author', async () => {
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    const inputAuthor = screen.getByTestId('AddNewBookModal.Author').children[1].children[0];
    expect(inputAuthor).toContainHTML('');

    await userEvent.type(inputAuthor, 'Test author');
    expect(
      screen.getByTestId('AddNewBookModal.Author').children[1].children[0]
    ).toHaveValue('Test author');
  });
  test('should be change book year', async () => {
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    const inputYear = screen.getByTestId('AddNewBookModal.Year').children[1].children[0];
    expect(inputYear).toContainHTML('2024');

    await userEvent.clear(inputYear);
    await userEvent.type(inputYear, '2023');
    expect(
      screen.getByTestId('AddNewBookModal.Year').children[1].children[0]
    ).toHaveValue(2023)
  });
  test('should be change genres', async () => {
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    const inputGenres = screen.getByTestId('AddNewBookModal.Genres').children[1].children[0];
    expect(inputGenres).toContainHTML('');

    await userEvent.type(inputGenres, 'Test genres');
    expect(
      screen.getByTestId('AddNewBookModal.Genres').children[1].children[0]
    ).toHaveValue('Test genres');
  });
  test('should submit data', async () => {
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    const inputTitle = screen.getByTestId('AddNewBookModal.Title').children[1].children[0];
    await userEvent.type(inputTitle, 'Test title');

    const inputAuthor = screen.getByTestId('AddNewBookModal.Author').children[1].children[0];
    await userEvent.type(inputAuthor, 'Test author');

    const inputGenres = screen.getByTestId('AddNewBookModal.Genres').children[1].children[0];
    await userEvent.type(inputGenres, 'Test genres');

    await userEvent.click(screen.getByTestId('AddNewBookModal.SubmitBtn'));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
  test('should close modal', async () => {
    const onCloseModal = vi.fn();
  
    render(
      <AddNewBookModal
        isOpen={true}
        onSuccess={onSuccess}
        onClose={onCloseModal}
      />
    );

    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('AddNewBookModal.CloseBtn'));
    expect(onCloseModal).toHaveBeenCalledTimes(1);
  })
})