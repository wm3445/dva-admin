import React, {PropTypes} from 'react';
import Header from '../components/MainLayout/Header';
import Lefter from '../components/MainLayout/Lefter';
import TopBreadcrumb from '../components/MainLayout/TopBreadcrumb';
// 引入 connect 工具函数
import {connect} from 'dva';
import styles from './MainLayout.less';


class MainLayout extends React.Component {


  componentWillMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'menus/getAllMenu',
    });
  }

  render() {
    const {menus, location, dispatch} = this.props;
    const lefterProps = {
      menus: menus.items,
      location: location,
      updateNavPath (key, keyPath){
        dispatch({
          type: 'menus/updateNavPath',
          payload: {
            data: keyPath,
            key: key
          }
        })
      }
    }

    const headProps={
      loginOut(){
        dispatch({
          type: 'login/loginOut',
        })
      }
    }
    const navpath = {
      navpath: menus.navpath
    }
    return (
      <div className={styles.box}>


        <div className={styles.menu}>
          <div className={styles.logo}>
          </div>
          <Lefter {...lefterProps}  />

        </div>
        <div className={styles.main}>
          <Header {...headProps} />
          <div className={styles.container}>
            <div className={styles.top_breadcrumb}>
              <TopBreadcrumb {...navpath}  />

            </div>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>

        </div>

      </div>
    );
  }

}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

// 指定订阅数据，这里关联了 users
function mapStateToProps(state) {
  return {
    menus: state.menus
  }
}
export default connect(mapStateToProps)(MainLayout);
