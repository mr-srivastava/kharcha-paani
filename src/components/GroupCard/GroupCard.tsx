import { Card } from 'react-bootstrap';
import { IoOpenOutline, IoOptionsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './GroupCard.scss';

function GroupCard(props: any) {
  const navigate = useNavigate();
  const { data, handleEditClick } = props;
  const onLinkClick = () => {
    navigate(`/group/${data.id}`);
  };
  return (
    <div className="card-wrapper">
      <Card className="card-element">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div className="card-title">{data.name}</div>
            <div className="card-title-btns d-flex">
              <div
                className="edit-div"
                onClick={() => handleEditClick(data.id)}
              >
                <IoOptionsOutline className="edit-group" />
                <IoOptionsOutline
                  className="edit-group-hover"
                  stroke="#41b4a5"
                />
              </div>
              <div className="link-div" onClick={onLinkClick}>
                <IoOpenOutline className="link-to-group" />
                <IoOpenOutline
                  className="link-to-group-hover"
                  stroke="#41b4a5"
                />
              </div>
            </div>
          </Card.Title>

          {/* <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export { GroupCard };
