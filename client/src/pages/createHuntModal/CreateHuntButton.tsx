import React, { useState } from "react";
import { CreateHuntModal } from "./CreateHuntModal";

export const CreateHuntButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <Flex
        justify="flex-end"
        align="center"
        style={{
          width: "100%",
          padding: 8,
        }}>
        <Button icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          Create hunt
        </Button>
      </Flex>
      {isOpen && <CreateHuntModal closeModal={() => setIsOpen(false)} />} */}
    </>
  );
};
