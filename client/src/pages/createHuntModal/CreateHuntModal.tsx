import React, { useState } from "react";
import { CreateHuntForm } from "./steps/HuntDetails/CreateHuntForm";
import { CreateCluesForm } from "./steps/Clues/CreateCluesForm";
import { CreateTeamsForm } from "./steps/Teams/CreateTeamsForm";

type CreateModalProps = {
  closeModal: () => void;
};

export const CreateHuntModal = ({ closeModal }: CreateModalProps) => {
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
      content: <CreateCluesForm />,
    },
    {
      key: "teams",
      title: "Teams",
      content: <CreateTeamsForm />,
    },
  ];

  return (
    // <Modal centered open={true} onCancel={closeModal} footer={[]} width={1000}>
    //   <Steps style={{ paddingTop: 16 }} current={current} items={steps} />
      <div style={{}}>{steps[current].content}</div>
  );
};
