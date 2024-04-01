import React, { useState } from "react";
import { Alert, Button, Form, Input, Modal, Typography } from "antd";
import { useCreateHuntMutation } from "./useCreateHuntMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import { FormItem } from "react-hook-form-antd";

const { Title } = Typography;

type CreateHuntModalProps = {
  closeModal: () => void;
};

type Inputs = {
  name: string;
  startDate: string;
  endDate: string;
};

export const CreateHuntModal = ({ closeModal }: CreateHuntModalProps) => {
  const [createHunt, { data, loading }] = useCreateHuntMutation();
  const [formErr, setformErr] = useState<null | string>(null);

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<Inputs>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      await createHunt(formData);
      // throw new Error("try try try");
    } catch (err) {
      if (err instanceof ApolloError) {
        setformErr(err.message);
      } else {
        setformErr("An unknown error occurred.");
      }
      reset();
    }
  };

  const nameErrMsg = formErrors.name?.message;
  const startDateErrMsg = formErrors.startDate?.message;
  const endDateErrMsg = formErrors.endDate?.message;

  return (
    <Modal
      // title={<Title>Create new hunt</Title>}
      centered
      open={true}
      onCancel={closeModal}
      onOk={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>,
        <Form.Item>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={!isValid || loading}
            onClick={closeModal}>
            Submit
          </Button>
        </Form.Item>,
      ]}
      width={1000}>
      <Form name="create-hunt">
        <Title data-testid="register-title">Create new hunt</Title>
        <Title level={5}>
          Fill out the below information to create a new scavenger hunt.
        </Title>
        {formErr && (
          <Form.Item>
            <Alert
              data-testid="register-alert-message"
              message={`${formErr} Please try again later.`}
              type="error"
            />
          </Form.Item>
        )}
        <FormItem control={control} name="name" label="Hunt name" required>
          <Input
            data-testid="register-firstname"
            status={nameErrMsg ? "error" : undefined}
            placeholder="Enter your first name"
          />
        </FormItem>
        <FormItem
          control={control}
          name="startDate"
          label="Start date"
          required>
          <Input
            data-testid="register-lastname"
            status={startDateErrMsg ? "error" : undefined}
            placeholder="Enter your last name"
          />
        </FormItem>
        <FormItem control={control} name="endDate" label="End date" required>
          <Input
            data-testid="register-username"
            status={endDateErrMsg ? "error" : undefined}
            placeholder="Enter a username"
          />
        </FormItem>
      </Form>
    </Modal>
  );
};
