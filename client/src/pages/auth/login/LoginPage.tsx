import React, { useContext, useEffect, useState } from "react";
import { useLoginMutation } from "./useLoginMutation";
import { Link, useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Input,
  Flex,
  Typography,
  Checkbox,
  Button,
  Tooltip,
  Alert,
} from "antd";

const { Title } = Typography;

type Inputs = {
  username: string;
  password: string;
  remember?: boolean;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showLoginErr, setShowLoginErr] = useState(false);
  const { loginUser, isLoading } = useLoginMutation();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setShowLoginErr(false);
    try {
      const response = await loginUser(formData);
      return navigate("/dashboard");
    } catch (err) {
      console.log(err);
      reset();
      setShowLoginErr(true);
    }
  };

  const passwordErrMsg = errors.password?.message;
  const usernameErrMsg = errors.username?.message;

  return (
    <>
      <form style={{ maxWidth: 600 }} onSubmit={handleSubmit(onSubmit)}>
        <Title className="mb-15">Sign In</Title>
        <Title className="font-regular text-muted" level={5}>
          Enter your email and password to sign in
        </Title>
        <Flex vertical gap={12}>
          {showLoginErr && (
            <Alert
              message="Invalid credentials. Please try again."
              type="error"
            />
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
        </Flex>
        <Controller
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
        />
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Submit"}
        </Button>
      </form>
      <p className="font-semibold text-muted">
        Don't have an account?{" "}
        <Link to="/register" className="text-dark font-bold">
          Register now
        </Link>
      </p>
    </>
  );
};
