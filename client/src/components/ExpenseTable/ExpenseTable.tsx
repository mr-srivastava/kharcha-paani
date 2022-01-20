import React from 'react';
import { Table } from 'react-bootstrap';
import { formatCurrency } from 'src/utils';

import './ExpenseTable.scss';

function ExpenseTable({ group }: any) {
  return (
    <div className="expense-table-wrapper">
      <Table hover size="sm">
        <thead>
          <tr>
            <th>Member</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {group.members.length &&
            group.members.map((mem: any) => {
              return (
                <tr key={mem.id}>
                  <td>{mem.name}</td>
                  <td>{formatCurrency().format(mem.paid - mem.share)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export { ExpenseTable };
