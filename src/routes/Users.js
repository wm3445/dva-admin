// ./src/routes/Users.jsx
import React, {Component, PropTypes} from 'react';
import {routerRedux} from 'dva/router';

// 引入 connect 工具函数
import {connect} from 'dva';

// Users 的 Presentational Component
// 暂时都没实现
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';

// 引入对应的样式
// 可以暂时新建一个空的
import styles from './Users.less';

function Users({location, dispatch, users}) {
  const {field, keyword} = location.query;
  const {
    loading, list, total, current,
    currentItem, visible, modalType
  } = users;

  const userSearchProps = {
    field,
    keyword,
    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        }
      });
    },
    onSearch(fieldsValue){
      dispatch({
        type: 'users/query',
        payload: fieldsValue
      })
    }
  };
  const userListProps = {
    dataSource: list,
    total,
    loading,
    current,
    onDeleteItem(id){
      dispatch({
        type: 'users/delete',
        payload: id
      });
    },
    onEditItem(item){
      console.log("item", item)
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname: '/users',
        query: {page},
      }));
    }
  };
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: visible,
    onOk(data) {
      console.log("data", data)
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal',
      });
    },
  };

  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (
    <div className={styles.normal}>
      {/* 用户筛选搜索框 */}
      <UserSearch {...userSearchProps} />
      {/* 用户信息展示列表 */}
      <UserList {...userListProps} />
      {/* 添加用户 & 修改用户弹出的浮层 */}
      <UserModalGen {...userModalProps} />
    </div>


  );
}

Users.propTypes = {
  users: PropTypes.object,
};

// 指定订阅数据，这里关联了 users
function mapStateToProps({users}) {

  return {users};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Users);
