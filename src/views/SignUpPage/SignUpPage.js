import React, { Component } from 'react';
import { connect } from 'react-redux';
import DummyForm from './dummyForm';
import formikEnhancer from './formik/formikEnhancer';
import authOperations from '../../redux/auth/authOperations';
import { Formik, ErrorMessage, Form, Field, useField } from 'formik';
import schema from './validationSchema';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import withAuthRedirect from '../../common/hoc/withAuthRedirect';

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
  },
};

//Working with Redux and Formik

const SignUpPage = ({ isSubmitting, errors, handleSubmit, values }) => {
  return (
    <div>
      <h1>Register Page</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" autoComplete="on" />
        <ErrorMessage name="email" />
        <Field
          type="email"
          name="email"
          placeholder="E-mail"
          autoComplete="on"
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="on"
        />
        <Button type="submit" disabled={isSubmitting}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

const mdtp = dispatch => ({
  onRegister: values => dispatch(authOperations.registerUser(values)),
});
export default compose(
  withAuthRedirect,
  connect(
    null,
    mdtp,
  ),
)(formikEnhancer(SignUpPage));
