import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './Lefter.less';
const SubMenu = Menu.SubMenu;
function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */

  } catch (e) {
  }
  return key;
}
const Lefter = ({ location ,menus,updateNavPath}) => {
 /* const items = [
    {
      key: 1,
      name: 'Dashboard',
      icon: 'user',
      child: [
        {
          name: '系统',
          key: 101,
          child: [
            {
              name: '用户管理',
              key: 'users'
            },
            {
              name: '首页',
              key: 'home'
            }
          ]
        }
      ]
    }
  ];*/

  function menuClickHandle( {item, key, keyPath} ){

    updateNavPath(key,keyPath)
  }
  const items = menus;
  const menu = items.map((item) => {

    return (
      <SubMenu
        key={item.key}
        title={<span><Icon type={item.icon} />{item.name}</span>}
      >
        {
          item.child.map((node) => {
            return (
              <SubMenu key={node.key} title={<span><Icon type={node.icon} />{node.name}</span>}>
                {
                  node.child.map((node_son)=>{
                    return(
                      < Menu.Item key={node_son.key} >

                        <Link   to={'/'+node_son.key}><Icon type="bars" />{ node_son.name }</Link>

                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </SubMenu>
    )
  });
  return (
    <div className={styles.normal}>
      <Menu
        selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
        mode="inline"
        theme="dark"
        defaultOpenKeys={['1','101']}
        defaultSelectedKeys={['users']}
        onClick={menuClickHandle}
      >
        {menu}
      </Menu>
    </div>
  )
}

Lefter.propTypes = {

};

// 关联 model
export default Lefter;

