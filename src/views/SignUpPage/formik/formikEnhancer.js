import { withFormik } from 'formik';
import schema from '../validationSchema';
import authOperations from '../../../redux/auth/authOperations';
import axios from 'axios';
import authActions from '../../../redux/auth/authActions';

axios.defaults.baseURL = 'https://lpj-tasker.herokuapp.com/users/';
// const BASE_URL = 'https://lpj-tasker.herokuapp.com/users/';

const setToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const unsetToken = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

const formikEnhancer = withFormik({
  validationSchema: schema,
  mapPropsToValues: ({ name, email, password }) => ({
    name: name || '',
    email: email || '',
    password: password || '',
  }),
  handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
    //test----------------------
    // await new Promise(resolve => setTimeout(resolve, 500));
    // alert(JSON.stringify(values, null, 2));
    // setSubmitting(false);
    // resetForm();

    props.dispatch(authActions.registerStart());
    axios
      .post('signup', values)
      .then(response => {
        setToken(response.data.token);
        props.dispatch(authActions.registerSuccess(response.data));
      })
      .catch(error => props.dispatch(authActions.registerFailure(error)));
    setSubmitting(false);
  },
  displayName: 'BasicForm',
});

export default formikEnhancer;

//{"user":{"name":"name","email":"name@mail.com"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI3NWY2YzM1NjIwMjAwMTc0MGQ4YWIiLCJpYXQiOjE1Nzk2Mzg2MzZ9.eGRNwOxocYz2XEvlVUO9LD11Bl2Kuoehu5l7h2bbzCc"}
