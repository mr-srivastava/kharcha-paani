import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  CloseButton,
  Form,
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
import { useAppDispatch } from '../../state/stateHooks';
import { currencies, formatCurrency } from '../../utils';

import './CreateGroup.scss';
import { Group } from 'src/indexTypes';

type CreateGroupProps = {
  edit?: boolean;
  open: boolean;
  setOpen: Function;
  data?: Group;
};

type Member = {
  id: string;
  name: string;
  share: number;
};

function CreateGroup({ open, setOpen, data, edit }: CreateGroupProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);
  const [groupName, setGroupName] = useState<string>('');
  const [memberText, setMemberText] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (data) {
      setGroupName(data.name);
      setMembers(data.members);
    }
  }, [data]);

  const handleClose = () => setOpen(false);
  const onDoneClick = () => {
    if (!edit) {
      const groupData = {
        id: uuidv4(),
        groupName,
        members,
      };
      dispatch({
        type: 'ADD_GROUP',
        payload: groupData,
      });
      navigate(`/group/${groupData.id}`);
    } else {
      const groupData = {
        id: data ? data.id : uuidv4(),
        groupName,
        members,
      };
      dispatch({
        type: 'UPDATE_GROUP',
        payload: groupData,
      });
    }
    handleClose();
  };

  const handlePrevClick = () => {
    setPage((prevState) => (prevState - 1) % 2);
  };

  const handleNextClick = () => {
    setPage((prevState) => (prevState + 1) % 2);
  };

  const handleGroupNameChange = (e: any) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };

  const handleMemberTextChange = (e: any) => {
    e.preventDefault();
    setMemberText(e.target.value);
  };

  const handleMemberAdd = () => {
    const newMember = {
      id: uuidv4(),
      name: memberText,
      share: 0,
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
        <Form.Select
          aria-label="Default select example"
          className="currency-select"
          defaultValue={'Indian rupee (\u20B9)'}
        >
          {currencies.map((curr) => (
            <option key={curr.cc}>{formatCurrency(curr)}</option>
          ))}
        </Form.Select>
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
        <Alert className="add-member-note" variant="warning">
          <IoInformationCircleOutline />
          <div className="add-member-note-text">
            Add atleast one member in the group
          </div>
        </Alert>
        <ListGroup className="member-group-wrap">
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
        contentClassName={classNames({ 'custom-height': page === 1 })}
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
                disabled: page === 0 && groupName.trim() === '',
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
