import React, { useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CloseButton,
  FormControl,
  InputGroup,
  ListGroup,
  Modal,
} from 'react-bootstrap';
import {
  IoChevronBackCircle,
  IoChevronForwardCircle,
  IoCheckmarkCircle,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
  IoCheckmarkCircleOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoPerson,
  IoInformationCircleOutline,
} from 'react-icons/io5';
import { currencies } from '../../utils';

import './CreateGroup.scss';

type CreateGroupProps = {
  open: boolean;
  setOpen: Function;
};

type Member = {
  id: string;
  name: string;
};

function CreateGroup({ open, setOpen }: CreateGroupProps) {
  let navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [groupName, setGroupName] = useState<string>('');
  const [memberText, setMemberText] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);

  const handleClose = () => setOpen(false);
  const onDoneClick = () => {
    navigate(`/group/123`);
  };

  const handlePrevClick = () => {
    setPage((prevState) => (prevState - 1) % 2);
  };

  const handleNextClick = () => {
    setPage((prevState) => (prevState + 1) % 2);
  };

  const handleGroupNameChange = (e: any) => {
    e.preventDefault();
    setGroupName(e.target.value.trim());
  };

  const handleMemberTextChange = (e: any) => {
    e.preventDefault();
    setMemberText(e.target.value);
  };

  const handleMemberAdd = () => {
    const newMember = {
      id: uuidv4(),
      name: memberText,
    };
    setMembers((prev) => [...prev, newMember]);
    setMemberText('');
  };

  const handleMemberRemove = (id: string) => {
    const updatedList = members.filter((mem) => mem.id !== id);
    setMembers(updatedList);
  };

  const GroupNameJsx = () => {
    return (
      <>
        <InputGroup className="mb-3 group-name-input">
          <InputGroup.Text>
            <IoPeopleOutline />
          </InputGroup.Text>
          <FormControl
            value={groupName}
            placeholder="Enter a name for the group."
            aria-label="GroupName"
            aria-describedby="basic-addon1"
            onChange={handleGroupNameChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleNextClick();
              }
            }}
          />
        </InputGroup>
      </>
    );
  };

  const AddMemberJsx = () => {
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <IoPersonAddOutline />
          </InputGroup.Text>
          <FormControl
            value={memberText}
            placeholder="Add member"
            aria-label="Add member"
            aria-describedby="basic-addon2"
            onChange={handleMemberTextChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && memberText !== '') {
                handleMemberAdd();
              }
            }}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleMemberAdd}
            disabled={memberText.trim() === ''}
          >
            Add
          </Button>
        </InputGroup>
        <div className="add-member-note">
          <IoInformationCircleOutline />
          <div className="add-member-note-text">
            Add atleast one member in the group
          </div>
        </div>
        <ListGroup>
          {members.map((mem) => (
            <ListGroup.Item key={mem.id} className="member-list-wrap">
              <div className="member-list-item">
                <div className="member-wrap">
                  <IoPerson />
                  <span>{mem.name}</span>
                </div>
                <CloseButton onClick={() => handleMemberRemove(mem.id)} />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  };

  const BodyContent: any = {
    0: GroupNameJsx(),
    1: AddMemberJsx(),
  };

  return (
    <div className="create-group-modal-wrapper">
      <Modal
        show={open}
        dialogClassName="create-group-modal"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{page === 0 ? 'Create Group' : groupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{BodyContent[page]}</Modal.Body>
        <Modal.Footer>
          {page !== 0 && (
            <div className="prev-step" onClick={handlePrevClick}>
              <IoChevronBackCircle className="back-icon" />
              <IoChevronBackCircleOutline className="back-icon-hover" />
            </div>
          )}
          {page !== 1 && (
            <div
              className={classNames('next-step', {
                disabled: page === 0 && groupName === '',
              })}
              onClick={handleNextClick}
            >
              <IoChevronForwardCircle className="next-icon" />
              <IoChevronForwardCircleOutline className="next-icon-hover" />
            </div>
          )}
          {page === 1 && (
            <div
              className={classNames('confirm-step', {
                disabled: page === 1 && !members.length,
              })}
              onClick={onDoneClick}
            >
              <IoCheckmarkCircle className="confirm-icon" />
              <IoCheckmarkCircleOutline className="confirm-icon-hover" />
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { CreateGroup };
