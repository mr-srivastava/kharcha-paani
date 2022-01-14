import { Card } from 'react-bootstrap';
import { IoExitOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './GroupCard.scss';

function GroupCard(props: any) {
  const navigate = useNavigate();
  const { data } = props;
  const onLinkClick = () => {
    navigate(`/group/${data.id}`);
  };
  return (
    <div className="card-wrapper">
      <Card className="card-element">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div className="card-title">{data.name}</div>
            <div className="link-div" onClick={onLinkClick}>
              <IoExitOutline className="link-to-group" />
              <IoExitOutline className="link-to-group-hover" stroke="#41b4a5" />
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
