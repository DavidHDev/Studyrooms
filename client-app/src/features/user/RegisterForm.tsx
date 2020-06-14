import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/Models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
  username: isRequired('Username'),
  displayName: isRequired('DisplayName'),
  email: isRequired('Email'),
  password: isRequired('Password')
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Create Account'
            color='teal'
            textAlign='center'
          />
          <p className="input-label">Username</p>
          <Field name='username' component={TextInput} placeholder='Username' />
          <p className="input-label">Public Name</p>
          <Field
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
          />
          <p className="input-label">E-Mail Address</p>
          <Field name='email' component={TextInput} placeholder='Email' />
          <p className="input-label">Password</p>
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
            />
          )}
          <Button className="login-btn"
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='Register'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
