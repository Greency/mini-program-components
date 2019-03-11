
Component({
  properties: {
    maxPullDownHeight: {
      type: Number,
      value: 40
    },
    loading: Boolean
  },
  data: {
    animation: null,
    loadingShow: false,
    status: 'init',
    startY: 0,
    scrollY: 0,
  },
  lifetimes: {
    attached: function () {
      let { windowHeight } = wx.getSystemInfoSync();
      this.setData({
        h: windowHeight
      });
    }
  },
  methods: {
    handleTouchStart: function(e){
      this.setData({
        loading: false
      });
      this.data.startY = e.changedTouches[0].clientY;
    },
    handleTouchMove: function(e){
      if(this.data.status === 'init'){
        this.data.status = 'doing';
        var scrollY = (e.changedTouches[0].clientY - this.data.startY) / 2;
        console.log('scrollY: ', scrollY)
        if (scrollY < this.data.maxPullDownHeight && scrollY > 0) {
          this.setData({
            scrollY,
          });
        }
      }
    },
    handleTouchEnd: function(e){
      if (this.data.status === 'doing'){
        let { scrollY, maxPullDownHeight } = this.data;
        if (scrollY < maxPullDownHeight && scrollY > 0) {
          this.setData({
            scrollY: maxPullDownHeight
          });
        }
        this.data.status = 'init';
        setTimeout(()=>{
          this.setData({
            //loading: true
          });
          this.triggerEvent('onPullDown', {});
        }, 1000);
      }
    }
  }
})
