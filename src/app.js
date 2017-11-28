App({

  globalData: {
    userInfo: null,
    options: {},
    addressList: [],
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    console.log('----app onLaunch---- [options]', options)
    wx.showlLoading && wx.showlLoading({
      title: '载入中...',
      mask: true,
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log('----app onshow---- [optiosn]', options)
    this.globalData.options = options || {}
  },
})
