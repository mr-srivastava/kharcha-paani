import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAppSelector } from '../../state/stateHooks';
import { AddExpense, ExpenseTable } from 'src/components';

import './GroupPage.scss';

function GroupPage() {
  const groupInfo = useAppSelector((state) => state.group);

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="group-page-wrapper">
      <Navbar bg="dark">
        <Container className="navbar-container">
          <Navbar.Brand href="/">
            <div className="header">
              <span>Kharcha</span>Paani
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="group-page-container">
        <div className="group-page-header">
          <h1 className="group-name">Group : {groupInfo.name}</h1>
          <Button variant="primary" onClick={handleShow}>
            Add Expense
          </Button>
        </div>

        <div className="overview-container">
          <ExpenseTable groupInfo={groupInfo} />
        </div>
      </div>
      <AddExpense show={show} handleClose={handleClose} />
    </div>
  );
}

export { GroupPage };
