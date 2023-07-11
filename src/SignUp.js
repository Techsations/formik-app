import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate()
  const onSubmit = (values) => {
    axios.post("http://localhost:1010/create", values).then((res)=>{
        console.log(res);
        navigate('/login')
    }).catch((err)=>{
        console.log(err);
    })
  };
  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        username: yup
          .string()
          .required("This input field cannot be empty")
          .min(5, "Cannot be less than 5 characters"),
        email: yup
          .string()
          .email()
          .required("Email field is required"),
        password: yup
          .string()
          .required("Password field cannot be empty")
          .min(8, "Cannot be less than 8 characters"),
      }),
      onSubmit,
    });
  return (
    <>
      <main>
        <h1 className="text-primary">Sign Up</h1>
        <form
          className="w-50 mx-auto my-5 p-3 rounded border shadow"
          onSubmit={handleSubmit}
          action=""
        >
          <div className="mb-3">
            <input
              name="username"
              type="text"
              className={errors.username? "is-invalid form-control" : "form-control"}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.username && errors.username && (
              <small className="text-danger fw-bold">{errors.username}</small>
            )}
          </div>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className={errors.email? "is-invalid form-control" : "form-control"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <small className="text-danger fw-bold">{errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className={errors.password? "is-invalid form-control" : "form-control"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <small className="text-danger fw-bold">{errors.password}</small>
            )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
};

export default SignUp;
