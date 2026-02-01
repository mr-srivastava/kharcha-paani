import { useState } from 'react';
import walletImg from '../../assets/images/wallet.svg';
import { Button } from '@/components/ui/button';
import { GroupModal, NavBar } from 'src/components';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="relative min-h-screen">
        <div
          className="absolute z-[-1] w-full h-[782px] bg-blue-dark rounded-br-[492px] shadow-lg"
          style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        />
        <NavBar showIcon />
        <div className="pl-10 text-gray-200 font-quando">
          <div className="flex flex-col gap-3 pt-[110px]">
            <div
              className="main-content h-[315px] w-[557px] text-[71px] font-normal leading-[105px]"
              style={{ maxWidth: '557px' }}
            >
              Keep your <span className="text-green-primary">Kharcha</span> Paani
              Sorted
            </div>
            <div className="description w-[617px] mt-[105px] h-[90px] text-base">
              There will be no more fussing with change, misplaced receipts, or
              arguments about the amount. Simply enter all of your spending, and
              KharchaPaani will show you how mouch each person owes and to whom.
            </div>
            <div className="flex gap-2 mt-[53px]" aria-label="Landing Button Group">
              <Button
                variant="outline"
                className="max-w-[275px] h-[70px] rounded-lg font-quando text-[25px] font-normal leading-8 border border-gray-200 text-gray-200 bg-transparent hover:bg-transparent hover:border-green-primary hover:text-green-primary"
                onClick={() => setOpenModal(true)}
              >
                CREATE A GROUP
              </Button>
              <Button
                variant="outline"
                className="max-w-[275px] h-[70px] rounded-lg font-quando text-[25px] font-normal leading-8 border border-gray-200 text-gray-200 bg-transparent hover:bg-transparent hover:border-green-primary hover:text-green-primary"
                onClick={() => navigate('/groups')}
              >
                VIEW GROUPS
              </Button>
            </div>
          </div>
        </div>
        <img
          src={walletImg}
          alt="Wallet"
          className="absolute h-[446px] w-[690px] left-[672px] top-[369px]"
        />
      </div>

      <GroupModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export { LandingPage };
