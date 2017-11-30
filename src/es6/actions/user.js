import {
  USER_LOGIN,
} from '../constants'

export const loadProjects = (org) => {
  return (dispatch) => {
    wx.request({
      url: `/orgs/${org}/repos`, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        // 让store去广播'PROJECTS_LOADED'这件事情发生了
        dispatch({
          type: 'PROJECTS_LOADED',
          payload: res.data,
        })
      }
    })
  }
}
