import React, {PropTypes} from "react";
import {connect} from "dva";
// 引入 connect 工具函数


class App extends React.Component{




  render(){

    return (
      <div>
        {this.props.children}
      </div>

    );
  }

}


export default connect()(App);
