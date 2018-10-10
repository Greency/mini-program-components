
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: null
    },
    submitText: {
      type: String,
      value: "同意"
    },
    cancelText: {
      type: String,
      value: "拒绝"
    },
    isAuthorized: {
      type: Boolean,
      value: false
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _cancel: function(e){
      let detail = e.detail
      this.setData({
        isShow: false
      });
      this.triggerEvent('cancel', detail);
    },
    _submit: function(e){
      this.setData({
        isShow: false
      });
      let detail = e.detail;
      this.triggerEvent('submit', detail);
    }
  }
})
