import React, { useState } from "react";
import { useRegisterMutation } from "./useRegisterMutation";
import { Link } from "react-router-dom";
import { FormItem } from "react-hook-form-antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Typography, Button, Alert, Form } from "antd";
import { ApolloError } from "@apollo/client";
import { useRegisterResolver } from "./useRegisterResolver";
import { Spinner } from "../../../shared/components/Spinner";
import {
  authFormButtonLayout,
  authFormItemLayout,
} from "../../../shared/components/auth/AuthLayout";

const { Title, Text } = Typography;

type Inputs = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const RegisterPage = () => {
  const [registerErr, setRegisterErr] = useState<null | string>(null);
  const [registerMutation, { loading }] = useRegisterMutation();
  const [resolver] = useRegisterResolver();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<Inputs>({
    mode: "onTouched",
    resolver,
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      await registerMutation(formData);
      // throw new Error("try try try");
    } catch (err) {
      if (err instanceof ApolloError) {
        setRegisterErr(err.message);
      } else {
        setRegisterErr("An unknown error occurred.");
      }
      reset();
    }
  };

  const passwordErrMsg = formErrors.password?.message;
  const usernameErrMsg = formErrors.username?.message;
  const firstNameErrMsg = formErrors.firstName?.message;
  const lastNameErrMsg = formErrors.lastName?.message;

  return (
    <>
      <Form
        name="register"
        {...authFormItemLayout}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off">
        <Title className="mb-15">Register</Title>
        <Title className="font-regular text-muted" level={5}>
          Fill out the below information to create an acccount.
        </Title>
        {registerErr && (
          <Form.Item>
            <Alert
              message={`${registerErr} Please try again later.`}
              type="error"
            />
          </Form.Item>
        )}
        <FormItem
          control={control}
          name="firstName"
          label="First name"
          required>
          <Input
            status={firstNameErrMsg ? "error" : undefined}
            placeholder="Enter your first name"
          />
        </FormItem>
        <FormItem control={control} name="lastName" label="Last name" required>
          <Input
            status={lastNameErrMsg ? "error" : undefined}
            placeholder="Enter your last name"
          />
        </FormItem>
        <FormItem control={control} name="username" label="Username" required>
          <Input
            status={usernameErrMsg ? "error" : undefined}
            placeholder="Enter a username"
          />
        </FormItem>
        <FormItem control={control} name="password" label="Password" required>
          <Input.Password
            status={passwordErrMsg ? "error" : undefined}
            placeholder="Enter a password"
          />
        </FormItem>
        <Form.Item {...authFormButtonLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid || loading}>
            Register
            {loading && <Spinner />}
          </Button>
        </Form.Item>
        <Text className="font-semibold text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-dark font-bold">
            Login now
          </Link>
        </Text>
      </Form>
    </>
  );
};
