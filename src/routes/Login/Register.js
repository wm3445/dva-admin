import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
import {routerRedux} from 'dva/router';

import styles from './Register.less';

const FormItem = Form.Item;
const Option = Select.Option;


function Register({

  form:{
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    validateFields
  }
}) {
  const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
  }
  const tailFormItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 6,
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select className="icp-selector">
      <Option value="86">+86</Option>
    </Select>
  );

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  function handlePasswordBlur(e) {
    const value = e.target.value;
  }

  function checkPassowrd(rule, value, callback) {
    if (value && value !== getFieldValue('password')) {
      callback('两次填写密码不一致!');
    } else {
      callback();
    }
  }

  function checkConfirm(rule, value, callback) {
    if (value && this.state.passwordDirty) {
      validateFields(['confirm'], {force: true});

    }
    callback();
  }

  function goBackToLogin() {
    alert(11)
    routerRedux.push();
  }

  return (
    <div className={styles.normal}>
      <Form horizontal onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '请填写正确的邮箱!',
            }, {
              required: true, message: '请填写邮箱!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请填写你的密码!',
            }, {
              validator: checkConfirm,
            }],
          })(
            <Input type="password" onBlur={handlePasswordBlur}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请填写确认密码!',
            }, {
              validator: checkPassowrd,
            }],
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              姓名&nbsp;
              <Tooltip title="请填写你真实姓名！">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{required: true, message: '请填写姓名!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="城市"
        >
          {getFieldDecorator('residence', {
            initialValue :[""],
            rules: [{ required: true, message: '请选择你的所在城市!'}],
          })(
            <Select >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{required: true, message: '请填写你的手机号!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{required: true, message: '请填写验证码!'}],
              })(
                <Input size="large"/>
              )}
            </Col>
            <Col span={12}>
              <Button size="large">获取验证码</Button>
            </Col>
          </Row>
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" style={{ marginRight: 8 }} htmlType="submit" size="large">注册</Button>
          <Button  onClick={goBackToLogin} size="large">返回登录</Button>
        </FormItem>
      </Form>
    </div>

  );
}

Register.propTypes = {};
Register = Form.create()(Register);
export default connect()(Register);
