import React, { useEffect, useState } from 'react';
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Offcanvas,
} from 'react-bootstrap';

import './AddExpense.scss';

function AddExpense({ show, handleClose, groupInfo }: any) {
  const [expenseName, setExpenseName] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [paidBy, setPaidBy] = useState<any[]>([]);
  const [sharedBy, setSharedBy] = useState<any[]>([]);
  const [showSelectPaidBy, setShowSelectPaidBy] = useState<boolean>(false);
  const [showSelectMultiplePaidBy, setShowSelectMultiplePaidBy] =
    useState<boolean>(false);
  const [showSelectSharedBy, setShowSelectSharedBy] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);

  useEffect(() => {
    const hasName = expenseName !== '';
    const hasAmount = amount !== 0;
    setDisableAdd(!(hasName && hasAmount));
  }, [expenseName, amount, paidBy, sharedBy]);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setExpenseName(e.target.value.trim());
  };

  const handleAmountChange = (e: any) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const handleAddPaidBy = () => {
    setShowSelectMultiplePaidBy(false);
    setShowSelectPaidBy(false);
  };

  const handleAddSharedBy = () => {
    setShowSelectSharedBy(false);
  };

  const handleSubmit = () => {
    const payload = {
      name: expenseName,
      amount,
      paidBy,
      sharedBy,
    };
    console.log('EXPENSE: ', payload);
    handleClose();
  };

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {showSelectPaidBy || showSelectSharedBy
              ? 'Select Member(s)'
              : 'Add Expense'}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!showSelectPaidBy && !showSelectSharedBy && (
            <div className="add-expense-wrapper">
              <Form>
                <Form.Group className="mb-3" controlId="formExpenseName">
                  <div className="expense-name">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name of expense"
                      className="mb-3"
                    >
                      <FormControl
                        value={expenseName}
                        placeholder="Enter a name for the expense."
                        onChange={handleNameChange}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </FloatingLabel>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExpenseAmount">
                  <div className="expense-amount">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Amount"
                      className="mb-3"
                    >
                      <FormControl
                        value={amount || 0}
                        placeholder="Enter amount."
                        onChange={handleAmountChange}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </FloatingLabel>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExpensePaidBy">
                  <Form.Label>Paid by</Form.Label>
                  <div className="expense-made-by">
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Select members"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        readOnly
                      />
                      <Button onClick={() => setShowSelectPaidBy(true)}>
                        Select
                      </Button>
                    </InputGroup>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExpensePaidBy">
                  <Form.Label>Shared by</Form.Label>
                  <div className="expense-shared-by">
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Select members"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        readOnly
                      />
                      <Button onClick={() => setShowSelectSharedBy(true)}>
                        Select
                      </Button>
                    </InputGroup>
                  </div>
                </Form.Group>

                <div className="add-btn">
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    disabled={disableAdd}
                  >
                    Add
                  </Button>
                </div>
              </Form>

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
            </div>
          )}

          {showSelectPaidBy && (
            <div className="select-paid-by">
              <ListGroup className="member-list-wrap">
                {groupInfo.members.map((mem: any) => (
                  <ListGroup.Item key={mem.id} className=" member-list-item">
                    <div className="member-wrap">
                      {showSelectMultiplePaidBy && <Form.Check />}
                      <span>{mem.name}</span>
                    </div>
                  </ListGroup.Item>
                ))}
                {!showSelectMultiplePaidBy && (
                  <ListGroup.Item
                    onClick={() => setShowSelectMultiplePaidBy(true)}
                  >
                    Multiple
                  </ListGroup.Item>
                )}
              </ListGroup>
              <div className="add-paidBy-btn">
                <Button onClick={handleAddPaidBy}>Done</Button>
              </div>
            </div>
          )}

          {showSelectSharedBy && (
            <div className="select-paid-by">
              <ListGroup className="member-list-wrap">
                <ListGroup.Item
                  className=" member-list-item"
                  onClick={() => console.log('Select all')}
                >
                  Select All
                </ListGroup.Item>
                {groupInfo.members.map((mem: any) => (
                  <ListGroup.Item key={mem.id} className=" member-list-item">
                    <div className="member-wrap">
                      <Form.Check />
                      <span>{mem.name}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="add-paidBy-btn">
                <Button onClick={handleAddSharedBy}>Done</Button>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export { AddExpense };
