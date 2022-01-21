import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  CloseButton,
  FloatingLabel,
  Form,
  FormControl,
  ListGroup,
  Modal,
} from 'react-bootstrap';
import { IoPerson, IoInformationCircleOutline } from 'react-icons/io5';
import { useAppDispatch } from '../../state/stateHooks';

import './GroupModal.scss';
import { Group, Member } from 'src/indexTypes';

type GroupModalProps = {
  edit?: boolean;
  open: boolean;
  setOpen: Function;
  data?: Group;
};

function GroupModal({ open, setOpen, data, edit }: GroupModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const onDoneClick = async () => {
    if (edit && data) {
      const payload = {
        id: data._id,
        payloadData: {
          name: groupName,
          members,
        },
      };
      const response: any = new Promise((resolve, reject) => {
        dispatch({
          type: 'UPDATE_GROUP',
          payload,
          resolve,
          reject,
        });
      });
      const temp = await response;
      console.log(temp);
    } else {
      const groupData = {
        name: groupName,
        members,
      };
      const response: any = new Promise((resolve, reject) => {
        dispatch({
          type: 'ADD_GROUP',
          payload: groupData,
          resolve,
          reject,
        });
      });
      const { id } = await response;
      handleClose();
      navigate(`/group/${id}`);
    }
    handleClose();
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
      paid: 0,
    };
    setMembers((prev) => [...prev, newMember]);
    setMemberText('');
  };

  const handleMemberRemove = (id: string) => {
    const updatedList = members.filter((mem) => mem.id !== id);
    setMembers(updatedList);
  };

  return (
    <div className="create-group-modal-wrapper">
      <Modal
        show={open}
        dialogClassName="create-group-modal"
        contentClassName="create-group-modal-content"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header className="create-group-modal-header" closeButton>
          <Modal.Title>{`${edit ? 'Edit' : 'Create'} Group`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="group-name-section">
            <div className="group-name">
              <Form.Group className="mb-3" controlId="formGroupName">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name of group"
                  className="mb-3"
                >
                  <FormControl
                    value={groupName}
                    placeholder="Enter a name for the group."
                    aria-label="GroupName"
                    aria-describedby="basic-addon1"
                    onChange={handleGroupNameChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </div>
          </div>
          <div className="add-member-section">
            <Form.Group
              className="add-member-form mb-3 d-flex align-items-center"
              controlId="formAddMember"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Add Members"
                className="add-member-input flex-fill"
              >
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
              </FloatingLabel>
              <Button
                className="ml-1"
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleMemberAdd}
                disabled={memberText.trim() === ''}
              >
                Add
              </Button>
            </Form.Group>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDoneClick}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { GroupModal };
