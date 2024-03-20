import React, { useContext, useEffect, useState } from "react";
import { useRegisterMutation } from "./useRegisterMutation";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Typography, Checkbox, Button } from "antd";

const { Title } = Typography;

type Inputs = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  remember?: boolean;
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser } = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    const response = await registerUser(data);
    setIsSubmitting(false);

    if (response?.registerUser?.__typename === "AuthPayload") {
      return navigate("/dashboard");
    }
  };

  return (
    <>
      <form
        name="basic"
        style={{ maxWidth: 600 }}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off">
        <Title className="mb-15">Sign In</Title>
        <Title className="font-regular text-muted" level={5}>
          Enter your email and password to sign in
        </Title>
        <Input
          {...register("firstName", {
            required: "Please input your first name!",
          })}
        />

        <Input
          {...register("lastName", {
            required: "Please input your last name!",
          })}
        />

        <Input
          {...register("username", { required: "Please input your password!" })}
        />

        <Input
          {...register("password", { required: "Please input your password!" })}
        />

        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
      <p className="font-semibold text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-dark font-bold">
          Login now
        </Link>
      </p>
    </>
  );
};
