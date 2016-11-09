import "./index.html";
import "./index.less";
import dva from "dva";
import "antd/dist/antd.css";
import {useRouterHistory} from "dva/router";
import {createHashHistory} from "history";

// 1. Initialize
const app = dva({

  onError(e) {
    console.log("dva-", e.message);
  },
  history: useRouterHistory(createHashHistory)({queryKey: false}),
});


// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));
app.model(require('./models/menus'));
app.model(require('./models/users'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
