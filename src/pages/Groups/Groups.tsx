import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CreateGroup, NavBar } from 'src/components';
import { GroupCard } from 'src/components';
import { Group } from 'src/indexTypes';
import { getGroups } from 'src/utils';
import './Groups.scss';

function Groups() {
  const groups: Group[] = getGroups();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="groups-wrapper">
      <NavBar showIcon />
      <div className="groups-container">
        <div className="heading d-flex justify-content-between align-items-center">
          <h1 className="heading-text">GROUPS</h1>
          <Button onClick={() => setOpenModal(true)}>Create</Button>
        </div>
        <hr />
        <Row xs={1} md={2} className="g-4">
          {groups.map((group: Group) => (
            <Col>
              <GroupCard data={group} />
            </Col>
          ))}
        </Row>
      </div>
      {openModal && (
        <div className="create-group">
          <CreateGroup open={openModal} setOpen={setOpenModal} />
        </div>
      )}
    </div>
  );
}

export { Groups };
