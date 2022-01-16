import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AddExpense, ExpenseTable, NavBar } from 'src/components';

import './GroupPage.scss';
import { getGroupIdFromUrl } from 'src/utils';
import { useAppSelector } from 'src/state/stateHooks';

function GroupPage() {
  const { groups } = useAppSelector((state) => state.group);

  const [group, setGroup] = useState<any>();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const id = getGroupIdFromUrl();
    setGroup(groups.find((g: any) => g.id === id));
  }, [groups]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="group-page-wrapper">
      <NavBar showIcon />
      {group && (
        <>
          <div className="group-page-container">
            <div className="group-page-header d-flex justify-content-between">
              <h1 className="group-name">Group : {group.name}</h1>
              <Button className="add-exp-btn" onClick={handleShow}>
                Add Expense
              </Button>
            </div>

            <div className="overview-container">
              <ExpenseTable group={group} />
            </div>
          </div>

          <AddExpense show={show} handleClose={handleClose} group={group} />
        </>
      )}
    </div>
  );
}

export { GroupPage };
