import React from 'react';
import './LandingPage.scss';
import walletImg from '../../assets/wallet.svg';

const LandingPage = (props: any) => {
  return (
    <div className="wrapper">
      <div className="background-shape" />
      <div className="header">
        <span>Kharcha</span>Paani
      </div>
      <div className="content">
        <div className="main-content">
          Keep your <span>Kharcha</span> Paani Sorted
        </div>
        <div className="description">
          There will be no more fussing with change, misplaced receipts, or
          arguments about the amount. Simply enter all of your spending, and
          KharchaPaani will show you who owes what to whom and how much they
          owe.
        </div>
      <button className="cta-btn">CREATE A GROUP</button>

      </div>

      <img src={walletImg} alt="walletImg" />
    </div>
  );
};

export { LandingPage };
