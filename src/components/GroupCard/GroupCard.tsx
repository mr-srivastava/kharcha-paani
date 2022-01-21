import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { IoOpenOutline, IoOptionsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Group } from 'src/indexTypes';
import { useAppSelector } from 'src/state/stateHooks';
import { formatCurrency, getTotal } from 'src/utils';
import './GroupCard.scss';

interface GroupCardProps {
  data: Group;
  handleEditClick: Function;
}

function GroupCard(props: GroupCardProps) {
  const { expenses } = useAppSelector((state) => state.group);
  const navigate = useNavigate();
  const { data, handleEditClick } = props;
  const onLinkClick = () => {
    navigate(`/group/${data._id}`);
  };
  return (
    <div className="card-wrapper">
      <Card className="card-element">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div className="card-title">{data.name}</div>
            <DropdownButton className="card-options" title="...">
              <Dropdown.Item
                className="edit-div d-flex align-items-center"
                onClick={() => handleEditClick(data._id)}
              >
                <IoOptionsOutline className="edit-group" />
                <IoOptionsOutline
                  className="edit-group-hover"
                  stroke="#41b4a5"
                />
                <p>Edit group</p>
              </Dropdown.Item>
              <Dropdown.Item
                className="link-div d-flex align-items-center"
                onClick={onLinkClick}
              >
                <IoOpenOutline className="link-to-group" />
                <IoOpenOutline
                  className="link-to-group-hover"
                  stroke="#41b4a5"
                />
                <p>Go to group</p>
              </Dropdown.Item>
            </DropdownButton>
          </Card.Title>
          <hr />

          <div className="card-content">
            <div className="total-expenses">
              <div className="value">
                {formatCurrency().format(getTotal(data._id, expenses))}
              </div>
              <div className="heading">Total expenses</div>
            </div>
            <div className="members">
              <div className="value">{data.members.length}</div>

              <div className="heading">Members</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export { GroupCard };
