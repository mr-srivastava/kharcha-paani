import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AddExpense, ExpenseTable, NavBar, PageLoader } from 'src/components';

import './GroupPage.scss';
import { getGroupIdFromUrl, formatCurrency, getTotal } from 'src/utils';
import { useAppDispatch, useAppSelector } from 'src/state/stateHooks';
import { Expense, Group } from 'src/indexTypes';

function GroupPage() {
  const { expenses } = useAppSelector((state) => state.group);
  const id = getGroupIdFromUrl();

  const [group, setGroup] = useState<Group>();
  const [total, setTotal] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getGroupById(groupId: string) {
      setLoading(true);
      const response = new Promise((resolve, reject) => {
        dispatch({
          type: 'GET_GROUP_BY_ID',
          id: groupId,
          resolve,
          reject,
        });
      });
      const groupResp: any = await response;
      setLoading(false);
      setGroup(groupResp);
    }

    getGroupById(id);
  }, []);

  useEffect(() => {
    setTotal(getTotal(id, expenses));
  }, [expenses, id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="group-page-wrapper">
      <NavBar showIcon />
      {loading && <PageLoader page="Group" />}
      {group && !loading && (
        <>
          <div className="group-page-container">
            <div className="group-page-header d-flex justify-content-between">
              <h1 className="group-name">Group : {group.name}</h1>
              <Button className="add-exp-btn" onClick={handleShow}>
                Add Expense
              </Button>
            </div>
            <hr />
            <h2>TOTAL: {formatCurrency().format(total)}</h2>

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
function formatCurr() {
  throw new Error('Function not implemented.');
}
