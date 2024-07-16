import { memo } from 'react';
import { TableCell, TableRow } from '@mui/material';

import { LoanResponse } from 'entities/Loan';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/const';

interface LoansTableRowProps {
  loanResponse: LoanResponse
}

const LoansTableRow = memo((props: LoansTableRowProps) => {
  const { loanResponse } = props;
  const { loan, book, user } = loanResponse;
  return (
    <TableRow
      key={loan.id}
      sx={{
        backgroundColor: `${!loan.active && '#e9e9e9'}`,
      }}
    >
      <TableCell
        sx={{
          width: '45%',
        }}
      >
        <AppLink
          to={`${RoutePath.book_details}${loan.bookId}`}
          theme={AppLinkTheme.SECONDARY}
          style={{
            width: '100%',
            display: 'block',
            fontWeight: 700,
          }}
        >
          {book.title}
        </AppLink>
      </TableCell>
      <TableCell>
        <AppLink
          to={`${RoutePath.profile}${loan.userId}`}
          theme={AppLinkTheme.SECONDARY}
          style={{
            width: '100%',
            display: 'block',
            fontWeight: 700,
          }}
        >
          {user.userName}
        </AppLink>
      </TableCell>
      <TableCell align="right">
        {loan.giveDate.toString()}
      </TableCell>
      <TableCell align="right">
        {loan.returnDate && loan.returnDate.toString()}
      </TableCell>
    </TableRow>
  );
});

export { LoansTableRow };
