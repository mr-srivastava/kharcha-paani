import { useState } from 'react';
import './LandingPage.scss';
import walletImg from '../../assets/images/wallet.svg';
import { Button, ButtonGroup, Image, Stack } from 'react-bootstrap';
import { CreateGroup, NavBar } from 'src/components';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props: any) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="wrapper">
        <div className="background-shape" />
        <NavBar showIcon />
        <div className="content">
          <Stack gap={3}>
            <div className="main-content">
              Keep your <span>Kharcha</span> Paani Sorted
            </div>
            <div className="description">
              There will be no more fussing with change, misplaced receipts, or
              arguments about the amount. Simply enter all of your spending, and
              KharchaPaani will show you who owes what to whom and how much they
              owe.
            </div>
            <ButtonGroup aria-label="Landing Button Group">
              <Button className="cta-btn" onClick={() => setOpenModal(true)}>
                CREATE A GROUP
              </Button>
              <Button className="cta-btn" onClick={() => navigate(`/groups`)}>
                VIEW GROUPS
              </Button>
            </ButtonGroup>
          </Stack>
        </div>
        <Image className="wallet-img" src={walletImg} fluid />
      </div>

      {openModal && (
        <div className="create-group">
          <CreateGroup open={openModal} setOpen={setOpenModal} />
        </div>
      )}
    </>
  );
};

export { LandingPage };
