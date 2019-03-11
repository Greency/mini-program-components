Component({
  properties: {
    content: String,
    cancelStyle: String,
    submitStyle: String,
    show: Boolean,
    type: {
      type: String,
      value: 'normal'
    },
    title: {
      type: String,
      value: '提示'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    submitText: {
      type: String,
      value: '确定'
    },
  },
  data: {
  },
  methods: {
    handleTouchMove: function(){},
    handleSubmit: function(e){
      this.setData({
        show: false
      });
      this.triggerEvent('onSubmit', e.detail);
    },
    handleCancel: function(e){
      this.setData({
        show: false
      });
      this.triggerEvent('onCancel', e.detail);
    },
    //【陈勇 2019-03-11 093855】获取用户信息
    handleGetUserInfo: function(e){
      this.triggerEvent('onSubmit', e.detail);
    }
  }
})
