import React, { PropTypes } from 'react';
import { Menu, Icon,Breadcrumb } from 'antd';
import { Link } from 'dva/router';



function TopBreadcrumb({navpath}) {

  let bread = navpath.map((item)=>{
    return (
      <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
    )
  })
  if(!navpath || navpath.length == 0){
    bread = (<Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>);
  }
  return (
    <Breadcrumb separator=">">
      {
        bread
      }
    </Breadcrumb>
  );
}

TopBreadcrumb.propTypes = {
  navpath: PropTypes.array,
};

export default TopBreadcrumb;
