import { useEffect, useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { CreateGroup, NavBar } from 'src/components';
import { GroupCard } from 'src/components';
import { Group } from 'src/indexTypes';
import { useAppDispatch, useAppSelector } from 'src/state/stateHooks';
import NullImg from 'src/assets/images/groups_null.svg';
import './Groups.scss';

function Groups() {
  // const { groups } = useAppSelector((state) => state.group);
  const [groups, setGroups] = useState<any>();
  const [editId, setEditId] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getGroups() {
      const response = new Promise((resolve, reject) => {
        dispatch({
          type: 'GET_ALL_GROUPS',
          resolve,
          reject,
        });
      });
      const { groups }: any = await response;
      setGroups(groups);
    }

    getGroups();
  }, []);

  const handleEditClick = (id: string) => {
    setEditId(id);
    setOpenEditModal(true);
  };

  return (
    <div className="groups-wrapper">
      <NavBar showIcon />
      <div className="groups-container">
        <div className="heading d-flex justify-content-between align-items-center">
          <h1 className="heading-text">GROUPS</h1>
        </div>
        <hr />
        {groups && groups.length ? (
          <div className="card-grid">
            {groups.map((group: Group) => (
              <GroupCard data={group} handleEditClick={handleEditClick} />
            ))}
          </div>
        ) : (
          <div className="null-state mt-5 d-flex flex-column justify-content-center align-items-center">
            <Image src={NullImg} className="w-25" />
            <div className="null-text mt-2 d-flex flex-column justify-content-center align-items-center">
              <h2 className="l1">No groups created.</h2>
              <div className="l2">Please create one to get started.</div>
            </div>
            <Button className="create-btn" onClick={() => setOpenModal(true)}>
              Create
            </Button>
          </div>
        )}
      </div>
      {openModal && (
        <div className="create-group">
          <CreateGroup open={openModal} setOpen={setOpenModal} />
        </div>
      )}
      {openEditModal && (
        <div className="create-group">
          <CreateGroup
            edit
            open={openEditModal}
            setOpen={setOpenEditModal}
            data={groups.find((g: any) => g.id === editId)}
          />
        </div>
      )}
    </div>
  );
}

export { Groups };