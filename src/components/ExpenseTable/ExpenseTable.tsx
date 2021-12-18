import React from 'react';
import { Table } from 'react-bootstrap';

import './ExpenseTable.scss';

function ExpenseTable({ groupInfo }: any) {
  return (
    <div>
      <Table hover size="sm">
        <thead>
          <tr>
            <th>Member</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {groupInfo.members.map((mem: any) => {
            return (
              <tr>
                <td>{mem.name}</td>
                <td>{mem.share}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export { ExpenseTable };
