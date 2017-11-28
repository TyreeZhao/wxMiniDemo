// 标准Page定义Object
const config = {
  data: {
    projects: []
  },

  onReady(){
    // 哪里来的 loadProjects? 往下看
  },

  onStateChange(nextState){
    this.setData({projects: nextState})
  }
}

Page(config)
