import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { compose } from "redux";

class Signup extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label htmlFor="">Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="off"
          />
        </fieldset>
        <button>Sign Up!</button>
      </form>
    );
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: "signup" })
)(Signup);
