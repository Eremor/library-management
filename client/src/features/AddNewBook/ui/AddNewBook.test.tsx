import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { AddNewBook } from "./AddNewBook";

describe('AddNewBook', () => {
  const sendNewBook = vi.fn()

  test('should display a modal', async () => {
    render(<AddNewBook sendNewBookData={sendNewBook} />);

    await userEvent.click(screen.getByTestId('AddNewBook.Button'));
    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();
  });
  test('should be hide modal when press key ESC', async () => {
    render(<AddNewBook sendNewBookData={sendNewBook} />);

    await userEvent.click(screen.getByTestId('AddNewBook.Button'));
    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByTestId('AddNewBook.Modal')).toBeNull();
  });
  test('should be hide modal when click close button', async () => {
    render(<AddNewBook sendNewBookData={sendNewBook} />);

    await userEvent.click(screen.getByTestId('AddNewBook.Button'));
    expect(screen.getByTestId('AddNewBook.Modal')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('AddNewBookModal.CloseBtn'));
    expect(screen.queryByTestId('AddNewBook.Modal')).toBeNull();
  })
})