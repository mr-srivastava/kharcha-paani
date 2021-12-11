import React, { useState } from 'react';

import './CreateGroup.scss';
import { Button, Modal } from 'react-bootstrap';
import {
  IoChevronBackCircle,
  IoChevronForwardCircle,
  IoCheckmarkCircle,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
  IoCheckmarkCircleOutline
} from 'react-icons/io5';

type CreateGroupProps = {
  open: boolean;
  setOpen: Function;
};

function CreateGroup({ open, setOpen }: CreateGroupProps) {
  const [step, setStep] = useState<number>(0);
  const handleClose = () => setOpen(false);

  const handlePrevClick = () => {
    setStep((prevState) => (prevState - 1) % 3);
  };

  const handleNextClick = () => {
    setStep((prevState) => (prevState + 1) % 3);
  };

  const BodyContent: any = {
    0: 'Name the group',
    1: 'Add members',
    2: 'Add expenses',
  };

  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>{BodyContent[step]}</Modal.Body>
        <Modal.Footer>
          {step !== 0 && (
            <div className="prev-step" onClick={handlePrevClick}>
              <IoChevronBackCircle className="back-icon" />
              <IoChevronBackCircleOutline className="back-icon-hover" />
            </div>
          )}
          {step !== 2 && (
            <div className="next-step" onClick={handleNextClick}>
              <IoChevronForwardCircle className="next-icon" />
              <IoChevronForwardCircleOutline className="next-icon-hover" />
            </div>
          )}
          {step === 2 && (
            <div className="confirm-step" onClick={handleClose}>
              <IoCheckmarkCircle className="confirm-icon" />
              <IoCheckmarkCircleOutline className="confirm-icon-hover" />
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { CreateGroup };
