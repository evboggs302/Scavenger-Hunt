import React, { useState } from "react";
import { useLoginMutation } from "./useLoginMutation";
import { FormItem } from "react-hook-form-antd";
import { Link } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input, Flex, Typography, Button, Tooltip, Alert, Form } from "antd";
import { ApolloError } from "@apollo/client";
import { Spinner } from "../../../shared/components/Spinner";
import { formItemLayout } from "../../../shared/components/auth/AuthLayout";
import { useLoginResolver } from "./useLoginResolver";

const { Title, Text } = Typography;

type Inputs = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const [loginErr, setLoginErr] = useState<null | string>(null);
  const [loginMutation, { loading }] = useLoginMutation();
  const [resolver] = useLoginResolver();

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
    setLoginErr(null);
    try {
      await loginMutation(formData);
    } catch (err) {
      if (err instanceof ApolloError) {
        setLoginErr(err.message);
      } else {
        setLoginErr("An unknown error occurred.");
      }
      reset();
    }
  };

  const passwordErrMsg = formErrors.password?.message;
  const usernameErrMsg = formErrors.username?.message;

  return (
    <>
      <Form
        name="login"
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)}>
        <Title className="mb-15">Sign In</Title>
        <Title className="font-regular text-muted" level={5}>
          Enter your email and password to sign in
        </Title>
        {loginErr && (
          <Alert message={`${loginErr} Please try again.`} type="error" />
        )}
        <FormItem control={control} name="username" label="Username" required>
          <Input
            required
            status={usernameErrMsg ? "error" : undefined}
            placeholder="Enter what you'd like your username to be"
          />
        </FormItem>
        <FormItem control={control} name="password" label="Password" required>
          <Input.Password
            required
            status={passwordErrMsg ? "error" : undefined}
            placeholder="Enter what you'd like your username to be"
          />
        </FormItem>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid || loading}>
            Login
            {loading && <Spinner />}
          </Button>
        </Form.Item>
        <Text type="secondary">
          Don't have an account?{" "}
          <Link to="/register" className="text-dark font-bold">
            Register now
          </Link>
        </Text>
      </Form>
    </>
  );
};
