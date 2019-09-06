import { Button, Form, Icon, Input } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { lazyInject } from "../../ioc";
import { UserState } from "../../state/user.state";
import { TYPE } from "../../types";


interface IState {
  loginError?: string;
}

function hasErrors(fieldsError: Record<string, string[] | undefined>) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@observer
class HorizontalLoginForm extends React.Component<{} & FormComponentProps & RouteComponentProps, IState> {
  public state = {
        loginError: ''
    };

  @lazyInject(TYPE.IUserInfo) private userState: UserState;

  public componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.userState, "userState");
        if(values.username === this.userState.username && values.password === this.userState.password){
          this.props.history.push("/dashboard");
        } else if (values.username !== this.userState.username && values.password === this.userState.password){
          console.log("name wrong");
          this.setState(() => ({loginError: this.state.loginError || "Wrong username!"}));
        } else if (values.username === this.userState.username && values.password !== this.userState.password){
          this.setState({loginError: this.state.loginError || "Wrong password!"});
        }
      }
      this.setState({loginError: err});
    });
  };

  public render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div>
        {this.state.loginError}
      </div>
      </>
    );
  }
}

const WithRouterLoginForm = withRouter(HorizontalLoginForm);

export const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(WithRouterLoginForm);
