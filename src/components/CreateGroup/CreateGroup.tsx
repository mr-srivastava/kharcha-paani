import React, { useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
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
  const [step, setStep] = useState<number>(0);
  const [groupName, setGroupName] = useState<string>('');
  const [memberText, setMemberText] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);
  const handleClose = () => setOpen(false);

  const handlePrevClick = () => {
    setStep((prevState) => (prevState - 1) % 3);
  };

  const handleNextClick = () => {
    setStep((prevState) => (prevState + 1) % 3);
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
              if (e.key === 'Enter') {
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
    2: 'Add expenses',
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
          <Modal.Title>{step === 0 ? 'Create Group' : groupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{BodyContent[step]}</Modal.Body>
        <Modal.Footer>
          {step !== 0 && (
            <div className="prev-step" onClick={handlePrevClick}>
              <IoChevronBackCircle className="back-icon" />
              <IoChevronBackCircleOutline className="back-icon-hover" />
            </div>
          )}
          {step !== 2 && (
            <div
              className={classNames('next-step', {
                disabled:
                  (step === 0 && groupName === '') ||
                  (step === 1 && !members.length),
              })}
              onClick={handleNextClick}
            >
              <IoChevronForwardCircle className="next-icon" />
              <IoChevronForwardCircleOutline className="next-icon-hover" />
            </div>
          )}
          {step === 2 && (
            <div className="confirm-step" onClick={handleClose}>
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
