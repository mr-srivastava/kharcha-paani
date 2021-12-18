import React, { useState } from 'react';
import { Button, FormControl, InputGroup, Offcanvas } from 'react-bootstrap';

import './AddExpense.scss';

function AddExpense({ show, handleClose }: any) {
  const [expenseName, setExpenseName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [paidBy, setPaidBy] = useState<any[]>([]);
  const [sharedBy, setSharedBy] = useState<any[]>([]);

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Expense</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="add-expense-wrapper">
            <div className="expense-name">
              <InputGroup className="mb-3">
                <InputGroup.Text>Name</InputGroup.Text>
                <FormControl
                  placeholder="Enter a name for the expense."
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="expense-amount">
              <InputGroup className="mb-3">
                <InputGroup.Text>Amount</InputGroup.Text>
                <FormControl
                  placeholder="Enter amount."
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            {/* <div className="expense-date">
              <InputGroup className="mb-3">
                <InputGroup.Text>Date</InputGroup.Text>
                <FormControl
                  type="date"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div> */}
            <div className="expense-made-by">
              <InputGroup className="mb-3">
                <InputGroup.Text>Paid by</InputGroup.Text>
                <FormControl
                  placeholder="Select members"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  readOnly
                />
                <Button>Select</Button>
              </InputGroup>
            </div>
            <div className="expense-shared-by">
              <InputGroup className="mb-3">
                <InputGroup.Text>Shared by</InputGroup.Text>
                <FormControl
                  placeholder="Select members"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  readOnly
                />
                <Button>Select</Button>
              </InputGroup>
            </div>
            <div className="add-btn">
              <Button variant="success" onClick={handleClose}>
                Add
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export { AddExpense };
