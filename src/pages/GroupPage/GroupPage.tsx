import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AddExpense, ExpenseTable, NavBar } from 'src/components';

import './GroupPage.scss';
import { getGroupIdFromUrl, getGroups } from 'src/utils';

function GroupPage() {
  const groups = getGroups();

  const [group, setGroup] = useState<any>({ name: '', members: [] });
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const id = getGroupIdFromUrl();
    setGroup(groups.find((g: any) => g.id === id));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="group-page-wrapper">
      <NavBar showIcon />
      <div className="group-page-container">
        <div className="group-page-header">
          <h1 className="group-name">Group : {group.name}</h1>
          <Button variant="primary" onClick={handleShow}>
            Add Expense
          </Button>
        </div>

        <div className="overview-container">
          <ExpenseTable group={group} />
        </div>
      </div>
      <AddExpense show={show} handleClose={handleClose} group={group} />
    </div>
  );
}

export { GroupPage };
