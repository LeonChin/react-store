import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "../../utility/axios";
import { toast } from "react-toastify";

export default function Register() {
  let navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { nickname, email, password } = data;
      const res = await axios.post("/auth/register", {
        email,
        password,
        nickname,
        type: 0,
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success("Register Success");
      navigate("/");
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              placeholder="nickname"
              name="nickname"
              {...register("nickname", {
                required: "A nickname is required",
              })}
            />

            <ErrorMessage
              errors={errors}
              name="nickname"
              render={({ message }) => (
                <p className="helper has-text-danger">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              placeholder="e.g. alexsmith@gmail.com"
              name="email"
              {...register("email", {
                required: "A proper email is required",
                pattern: {
                  value:
                    /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                  message: "invalid email",
                },
              })}
            />

            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="helper has-text-danger">{message}</p>
              )}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="password"
              name="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "cannot be less than 6 digits",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="helper has-text-danger">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary is-fullwidth">Submit</button>
        </div>
      </form>
    </div>
  );
}
