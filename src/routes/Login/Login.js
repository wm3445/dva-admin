import React,{PropTypes} from 'react';
import {notification, message ,Form, Icon, Input, Button, Checkbox  } from 'antd';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
import styles from './Login.less';
// 引入 connect 工具函数
import { connect } from 'dva';


const propTypes = {
  user: PropTypes.string,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps.login.loginErrors;
    const isLoggingIn = nextProps.login.loggingIn;
    const loginInfo = nextProps.login.loginInfo
    console.log("data", nextProps.login.loginInfo)

    if (error != this.props.login.loginErrors && error) {
      notification.error({
        message: 'Login Fail',
        description: error
      });
    }

    if (!isLoggingIn && !error && loginInfo)  {
      notification.success({
        message: 'Login Success',
        description: 'Welcome ' + loginInfo
      });
    }

    if (loginInfo) {
      this.context.router.replace('/home');
    }
  }

  handleSubmit() {
    const {dispatch} =this.props;
    const { getFieldsValue } = this.props.form
    const fieldsValue = getFieldsValue();
    dispatch({
      type: 'login/login',
      payload: fieldsValue
    })

  }

  render(){

    const { getFieldDecorator } = this.props.form

    return(
      <div className={styles.normal}>

        <Form onSubmit={this.handleSubmit.bind(this)} className={styles.login_form}>

          <FormItem>
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入用户名!'}],
            })(
              <Input  addonBefore={<Icon type="user" />} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {(
              <Input type="password" style={{display:"none"}}/>
            )}
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码!'}],
            })(
              <Input   addonBefore={<Icon type="lock" />} type="password" placeholder="Password"/>
            )}

          </FormItem>

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住登陆</Checkbox>
            )}

            <a className={styles.login_forgot}>忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles.login_button}>
              登陆
            </Button>
            或者 <a>现在注册!</a>
          </FormItem>

        </Form>
      </div>
    )
  }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;



// 指定订阅数据，这里关联了 users
function mapStateToProps({login}) {

  return {login};
}
Login = Form.create()(Login);

export default connect(mapStateToProps)(Login);
