import React, { useState } from "react";
import { Modal, Steps } from "antd";
import { CreateHuntForm } from "./CreateHuntForm";

type CreateHuntModalProps = {
  closeModal: () => void;
};

export const CreateHuntModal = ({ closeModal }: CreateHuntModalProps) => {
  const [current, setCurrent] = useState(0);
  const [huntId, setHuntId] = useState<string | null>(null);

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      key: "details",
      title: "Hunt details",
      content: (
        <CreateHuntForm
          closeModal={closeModal}
          nextStep={nextStep}
          setHuntId={setHuntId}
        />
      ),
    },
    {
      key: "clues",
      title: "Clues",
      content: "Clues-content",
    },
    {
      key: "teams",
      title: "Teams",
      content: "Teams-content",
    },
  ];

  return (
    <Modal centered open={true} onCancel={closeModal} footer={[]} width={1000}>
      <Steps style={{ paddingTop: 16 }} current={current} items={steps} />
      <div style={{}}>{steps[current].content}</div>
    </Modal>
  );
};
