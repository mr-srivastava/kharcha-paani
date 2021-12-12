import React from 'react';
import { Button, FormControl, InputGroup, Offcanvas } from 'react-bootstrap';

function AddExpense({ show, handleClose }: any) {
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
                <InputGroup.Text id="inputGroup-sizing-default">
                  Name
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="expense-amount">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Amount
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="expense-made-by">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Made by
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="expense-shared-by">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Shared by
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <Button variant="success">Add</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export { AddExpense };
