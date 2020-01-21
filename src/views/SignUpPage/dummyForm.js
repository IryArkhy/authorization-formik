import React, { Component } from 'react';
import { ErrorMessage } from 'formik';
import formikEnhancer from './formik/formikEnhancer';

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

class Form extends Component {
  render() {
    console.log(this.props.values);

    // console.log(this.props.handleSubmit);
    const {
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      values,
    } = this.props;
    console.dir(handleSubmit);
    return (
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <div>
          <ErrorMessage name="email" />
        </div>
        <label htmlFor="name" style={styles.label}>
          Name
          <input
            type="text"
            name="name"
            placeholder="E-mail"
            autoComplete="on"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>

        <div className={styles.invalid}>
          <ErrorMessage className={styles.invalid} name="password" />
        </div>

        <label htmlFor="email" style={styles.label}>
          Email
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            autoComplete="on"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>

        <label htmlFor="password" style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            autoComplete="on"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </form>
    );
  }
}

export default formikEnhancer(Form);
