import { Button, Checkbox, Form, Icon, Input, Select, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { UserAction } from "../../actions/user.action";
import { lazyInject } from "../../ioc";
import { TYPE } from "../../types";
  
  const { Option } = Select;
  
  @observer
  class RegistrationForm extends React.Component<{} & FormComponentProps & RouteComponentProps> {
    public state = {
      confirmDirty: false,
    };
    
    @lazyInject(TYPE.IUserAction) private userAction: UserAction;

    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const inputValues = {
            email: values.email,
            password: values.password,
            phone: values.phone,
            username: values.username,
          }
          this.userAction.register(inputValues);
          this.props.history.push("/login");
        }
      });
    };
  
    public handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    public compareToFirstPassword = (rule: object, value: string, callback: (str?:string)=>void) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    public validateToNextPassword = (rule: object, value: string, callback: ()=>void) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    public render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          sm: { span: 8 },
          xs: { span: 24 },
        },
        wrapperCol: {
          sm: { span: 16 },
          xs: { span: 24 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          sm: {
            offset: 8,
            span: 16,
          },
          xs: {
            offset: 0,
            span: 24,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '7',
      })(
        <Select style={{ width: 70 }}>
          <Option value="1">+1</Option>
          <Option value="7">+7</Option>
          <Option value="34">+34</Option>
        </Select>,
      );
      console.log(this.state.confirmDirty, "dirty");
  
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  message: 'The input is not valid E-mail!',
                  type: 'email',
                },
                {
                  message: 'Please input your E-mail!',
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback={true}>
            {getFieldDecorator('password', {
              rules: [
                {
                  message: 'Please input your password!',
                  required: true,
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback={true}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  message: 'Please confirm your password!',
                  required: true,
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

  const WithRouterRegistrationForm = withRouter(RegistrationForm);
  
  export const WrappedRegistrationForm = Form.create({ name: 'register' })(WithRouterRegistrationForm);