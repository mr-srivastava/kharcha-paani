import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupModal } from 'src/components';
import { LandingPageView } from './LandingPageView';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <LandingPageView
        onCreateGroup={() => setOpenModal(true)}
        onViewGroups={() => navigate('/groups')}
      />
      <GroupModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export { LandingPage };
