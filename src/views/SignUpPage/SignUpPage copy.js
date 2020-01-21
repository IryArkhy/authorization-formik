import React, { Component } from 'react';
import { connect } from 'react-redux';
import DummyForm from './dummyForm';
import {
  Formik,
  ErrorMessage,
  Form,
  Field,
  useField,
  FieldArray,
} from 'formik';
import authOperations from '../../redux/auth/authOperations';
import schema from './validationSchema';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import withAuthRedirect from '../../common/hoc/withAuthRedirect';
import {
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';

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
const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    // <FormControlLabel value={field.value} onChange={field.onChange} control={<Radio />} label={label} />
    // or
    <FormControlLabel {...field} control={<Radio />} label={label} />
  );
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      helperText={errText}
      placeholder={placeholder}
      error={!!errText}
    />
  );
};

const submitForm = (values, { setSubmitting, props, resetForm }) => {
  setSubmitting(true);
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    resetForm();
    setSubmitting(false);
    // props.updateUser(values);
  }, 400);
};

class SignUpPage extends Component {
  state = {
    user: { name: '', email: '', password: '' },
  };

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.onRegister({ ...this.state });
  //   // this.setState({name: '', email: '', password: '' })
  // };

  updateUser = user => {
    this.setState({ user });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <h1>Register Page</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            cookies: [],
            youghurt: '',
            pets: [{ name: 'barsik', type: 'dog', id: '' + Math.random() }],
          }}
          onSubmit={submitForm}
          // validate={values => {
          //   const errors = {};
          //   if (values.name.includes('fuck')) {
          //     errors.name = 'no Fuck';
          //   }
          //   return errors;
          // }}
          validationSchema={schema}
        >
          {({ values, isSubmitting, errors }) => (
            <Form className={styles.signUpForm}>
              {/* <div>
                <ErrorMessage name="name" />
              </div> */}
              <MyTextField
                type="input"
                name="name"
                placeholder="Name"
                // value={values.name}
              />
              {/* <Field
                type="input"
                name="name"
                placeholder="Name"
                autoComplete="on"
                value={values.name}
                as={TextField}
              /> */}

              <MyTextField
                type="input"
                name="email"
                placeholder="E-mail"

                // value={values.name}
              />

              {/* <Field
                type="input"
                name="email"
                placeholder="E-mail"
                autoComplete="on"
                value={values.email}
                as={TextField}
              /> */}

              <MyTextField type="input" name="password" placeholder="Пароль" />

              <div className="others">
                <div>Cookies: </div>
                <Field
                  name="cookies"
                  type="checkbox"
                  value="Snikers"
                  as={Checkbox}
                />
                <Field
                  name="cookies"
                  type="checkbox"
                  value="Esmeralda"
                  as={Checkbox}
                />
                <Field
                  name="cookies"
                  type="checkbox"
                  value="Milka"
                  as={Checkbox}
                />
                <div>Youghurt</div>

                <MyRadio
                  name="youghurt"
                  type="radio"
                  value="apple"
                  label="apple"
                />
                <MyRadio
                  name="youghurt"
                  type="radio"
                  value="blueberry"
                  label="blueberry"
                />
                <MyRadio
                  name="youghurt"
                  type="radio"
                  value="banana"
                  label="banana"
                />
                <FieldArray name="pets">
                  {arrayHelpers => (
                    <div>
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            type: 'cat',
                            name: '',
                            id: '' + Math.random(),
                          })
                        }
                      >
                        Add pet
                      </Button>
                      {values.pets.map((pet, index) => {
                        const name = `pets.${index}.name`;
                        return (
                          <div key={pet.id}>
                            <MyTextField name={name} placeholder="pet name" />
                            <Field
                              name={`pets.${index}.type`}
                              type="select"
                              as={Select}
                            >
                              <MenuItem value="cat">Cat</MenuItem>
                              <MenuItem value="dog">Dog</MenuItem>
                              <MenuItem value="fish">Fish</MenuItem>
                            </Field>
                            <Button onClick={() => arrayHelpers.remove(index)}>
                              X
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldArray>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sign Up
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   onRegister: credentials => dispatch(authOperations.registerUser(credentials)),
// });

export default compose(
  withAuthRedirect,
  connect(
    null,
    null,
  ),
)(SignUpPage);

// export default connect(
//   null,
//   mapDispatchToProps,
// )(SignUpPage);
