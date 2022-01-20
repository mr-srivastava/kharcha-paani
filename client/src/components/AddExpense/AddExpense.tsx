import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Offcanvas,
} from 'react-bootstrap';
import { IoListOutline } from 'react-icons/io5';
import { useAppDispatch } from 'src/state/stateHooks';

import './AddExpense.scss';

function AddExpense({ show, handleClose, group }: any) {
  const dispatch = useAppDispatch();

  const [expenseName, setExpenseName] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [paidBy, setPaidBy] = useState<any[]>([]);
  const [sharedBy, setSharedBy] = useState<any[]>([]);
  const [showSelectPaidBy, setShowSelectPaidBy] = useState<boolean>(false);
  const [showSelectSharedBy, setShowSelectSharedBy] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);

  useEffect(() => {
    const memberState = group.members.map((mem: any) => {
      return { ...mem, hasPaid: false, hasShare: false };
    });
    setMembers(memberState);
  }, [group.members, show]);

  useEffect(() => {
    const hasName = expenseName.trim() !== '';
    const hasAmount = !!amount;
    setDisableAdd(!(hasName && hasAmount));
  }, [expenseName, amount, paidBy, sharedBy]);

  const onCloseClick = () => {
    handleClose();
    setExpenseName('');
    setAmount(null);
    setPaidBy([]);
    setSharedBy([]);
  };

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setExpenseName(e.target.value);
  };

  const handleAmountChange = (e: any) => {
    e.preventDefault();
    setAmount(parseInt(e.target.value));
  };

  const handlePaidBySelect = (e: any, mem: any) => {
    setMembers((prevState) => {
      const nextState = prevState.map((el) => {
        if (el.id === mem.id) {
          el.hasPaid = e.target.checked;
        }
        return el;
      });
      return nextState;
    });
  };

  const handleSharedBySelect = (e: any, mem: any) => {
    setMembers((prevState) => {
      const nextState = prevState.map((el) => {
        if (el.id === mem.id) {
          el.hasShare = e.target.checked;
        }
        return el;
      });
      return nextState;
    });
  };

  const handleAddPaidBy = () => {
    setPaidBy(members.filter((mem) => mem.hasPaid));
    setShowSelectPaidBy(false);
  };

  const handleAddSharedBy = () => {
    setSharedBy(members.filter((mem) => mem.hasShare));
    setShowSelectSharedBy(false);
  };

  const handleSubmit = () => {
    const payload = {
      id: uuidv4(),
      groupId: group.id,
      name: expenseName,
      amount,
      paidBy: paidBy.map((mem) => mem.id),
      sharedBy: sharedBy.map((mem) => mem.id),
    };
    dispatch({
      type: 'ADD_EXPENSE',
      payload,
    });
    onCloseClick();
  };

  return (
    <div>
      <Offcanvas show={show} onHide={onCloseClick} placement="end">
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
                        type="number"
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
                        value={
                          paidBy.length
                            ? `${paidBy[0].name} ${
                                paidBy.length > 1
                                  ? `+ ${paidBy.length - 1}`
                                  : ''
                              } `
                            : ''
                        }
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
                        value={
                          sharedBy.length
                            ? `${sharedBy[0].name} ${
                                sharedBy.length > 1
                                  ? `+ ${sharedBy.length - 1}`
                                  : ''
                              } `
                            : ''
                        }
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
                {members.map((mem: any) => (
                  <ListGroup.Item key={mem.id} className="member-list-item">
                    <div className="member-wrap">
                      <Form.Check
                        onChange={(e) => handlePaidBySelect(e, mem)}
                      />
                      <span>{mem.name}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="add-paidBy-btn">
                <Button onClick={handleAddPaidBy}>Done</Button>
              </div>
            </div>
          )}

          {showSelectSharedBy && (
            <div className="select-shared-by">
              <div className="select-all d-flex justify-content-end align-items-center mb-3">
                <IoListOutline className="select-all-icon" />
                <IoListOutline
                  className="select-all-hover-icon"
                  stroke="#41b4a5"
                />
                <span className="ml-1">Select all</span>
              </div>
              <ListGroup className="member-list-wrap">
                {group.members.map((mem: any) => (
                  <ListGroup.Item key={mem.id} className=" member-list-item">
                    <div className="member-wrap">
                      <Form.Check
                        onChange={(e) => handleSharedBySelect(e, mem)}
                        checked={mem.hasShare}
                      />
                      <span>{mem.name}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="add-sharedBy-btn">
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
