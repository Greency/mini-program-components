Component({
  properties: {
    headerHeight: {
      type: Number,
      value: 47
    },
    backgroundColor: {
      type: String,
      value: 'white'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    h: 0
  },

  attached: function(){
    let { statusBarHeight, windowHeight, screenHeight} = wx.getSystemInfoSync();
    this.setData({
      h: this.data.headerHeight + statusBarHeight
    })
    
    let param = {
      height: this.data.h
    }
    this.triggerEvent('headerInfo', param);
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
