// import {
//   loadProjects,
// } from '../../es6/actions'
import {
  weapp,
  connect,
  bindActionCreators,
  store,
  actions
} from '../../es6/myapp'

const config = {
  data: {
    projects: [] //for init-render
  },

  onReady(){
    // 哪里来的 loadProjects? 往下看
    // this.loadProjects('octokit')
  },

  click: () => {
    console.log('click');
    this.loadProjects('lukastong')
  },

  onStateChange(nextState){
    // this.setData({projects: nextState})
  }
}

const mapStateToProps = (state) => ({
  resultCode: state.user.resultCode,
})

// connect store with page
const page = connect.Page(
  store, // required
  // 这个页面只关注projects变化
  mapStateToProps,

  // 将Action定义与Store.dispatch binding在一起, 这样就是一个可以发起对github API的请求了
  // (dispatch) => {
  //   return {
  //     loadProjects: bindActionCreators(actions.loadProjects, dispatch)
  //   }
  // }
)

// 启动被connect过的页面
Page(page(config))
