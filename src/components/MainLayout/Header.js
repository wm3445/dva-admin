import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;
import './Header.less';

function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
    console.log(key)

  } catch (e) {}
  return key;
}

function Header({ location }) {
  return (
    <div className='ant-layout-header'style={{width:"100%"}}>
      <Menu className="header-menu" style={{float:"right"}}
            mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="question" />帮助
        </Menu.Item>
        <SubMenu title={<span><Icon type="user" />11111</span>}>
          <Menu.Item key="setting:1">选项1</Menu.Item>
          <Menu.Item key="setting:2">选项2</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="setting:3">注销</Menu.Item>
        </SubMenu>

      </Menu>
    </div>

  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
