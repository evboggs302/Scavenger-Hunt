import React, { useState } from "react";
import { useLoginMutation } from "./useLoginMutation";
import { Link, useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input, Flex, Typography, Button, Tooltip, Alert } from "antd";
import { useTokenContext } from "../../../shared/context/tokenContext/useTokenContext";
import { ApolloError } from "@apollo/client";

const { Title, Text } = Typography;

type Inputs = {
  username: string;
  password: string;
  remember?: boolean;
};

export const LoginPage = () => {
  const [loginErr, setLoginErr] = useState<null | string>(null);
  const [loginMutation, { loading }] = useLoginMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setLoginErr(null);
    try {
      await loginMutation(formData);
    } catch (err) {
      if (err instanceof ApolloError) {
        setLoginErr(err.message);
      } else {
        setLoginErr("Invalid credentials.");
      }
      reset();
    }
  };

  const passwordErrMsg = formErrors.password?.message;
  const usernameErrMsg = formErrors.username?.message;

  return (
    <>
      <form style={{ maxWidth: 600 }} onSubmit={handleSubmit(onSubmit)}>
        <Title className="mb-15">Sign In</Title>
        <Title className="font-regular text-muted" level={5}>
          Enter your email and password to sign in
        </Title>
        <Flex vertical gap={12}>
          {loginErr && (
            <Alert message={`${loginErr} Please try again.`} type="error" />
          )}
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Please enter your username!",
            }}
            render={({ field }) => (
              <Tooltip
                trigger={usernameErrMsg ? ["focus"] : undefined}
                title={usernameErrMsg}
                placement="topLeft"
                overlayClassName="numeric-input">
                <Input
                  status={usernameErrMsg ? "error" : undefined}
                  {...field}
                />
              </Tooltip>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Please enter your password!",
            }}
            render={({ field }) => (
              <Tooltip
                trigger={passwordErrMsg ? ["focus"] : undefined}
                title={passwordErrMsg}
                placement="topLeft"
                overlayClassName="numeric-input">
                <Input.Password
                  status={passwordErrMsg ? "error" : undefined}
                  {...field}
                />
              </Tooltip>
            )}
          />
          {/* <Controller
            name="remember"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <Checkbox checked={field.value} {...field}>
                Remember me
              </Checkbox>
            )}
          /> */}
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid || loading}>
            {loading ? "Logging in..." : "Submit"}
          </Button>
          <Text type="secondary">
            Don't have an account?{" "}
            <Link to="/register" className="text-dark font-bold">
              Register now
            </Link>
          </Text>
        </Flex>
      </form>
    </>
  );
};
