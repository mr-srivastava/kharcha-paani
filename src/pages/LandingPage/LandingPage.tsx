import { useState } from 'react';
import walletImg from '../../assets/images/wallet.svg';
import { GroupModal, PageLayout } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <PageLayout className="relative flex flex-col overflow-hidden">
        {/* Hero content - reference layout */}
        <div className="relative z-10 flex-grow flex items-center justify-center w-full max-w-7xl mx-auto px-6 pt-10 pb-32 lg:pb-48">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-center w-full">
            {/* Left column: text */}
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-2">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight leading-[1.1]">
                  Keep your
                  <br />
                  <span className="text-primary">Kharcha</span> Paani
                  <br />
                  Sorted
                </h1>
              </div>

              <p className="font-sans text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
                Say goodbye to fussing with change or misplaced receipts. Simply
                enter your spending, and let KharchaPaani settle the debts
                seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8" aria-label="Landing actions">
                <Button
                  type="button"
                  className="px-8 py-4 bg-primary text-primary-foreground font-sans font-semibold rounded-full shadow-glow hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setOpenModal(true)}
                >
                  Create a Group
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 py-4 bg-transparent text-foreground font-sans font-medium rounded-full border border-border hover:border-border/80 hover:bg-white/5 transition-all duration-300"
                  onClick={() => navigate('/groups')}
                >
                  View Groups
                </Button>
              </div>
            </div>

            {/* Right column: illustration */}
            <div className="relative w-full flex justify-center lg:justify-end items-end mt-12 lg:mt-0">
              <img
                src={walletImg}
                alt="Wallet illustration"
                className="w-full max-w-[320px] sm:max-w-md lg:max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </PageLayout>
      <GroupModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export { LandingPage };
