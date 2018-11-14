// mini-program-components/c-slider/index.js
Component({
  relations:{
    '../slider/index': {
      type: 'parent',
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    index: Number,  //当前单项的索引
    style: String,
    //单个按钮的宽度
    singleBtnW: { 
      type: Number,
      value: 0
    },
  },
  data: {
    startX: 0,
    sliderStatus: false,
    sliderClickNum: 0,
  },
  lifetimes: {
    attached: function(){
      console.log('slider-item-index: ',  this.data.index)
    }
  },
  methods: {
    touchS: function (e) {
      console.log('attached: ', this.properties.lists);
      if (e.touches.length === 1) {
        this.data.startX = e.touches[0].clientX;
        this.properties.lists.forEach(item => {
          item.style = 'left: 0';
        });
        this.setData({
          lists: this.properties.lists
        });
      }
    },
    touchM: function (e) {
      if (e.touches.length === 1) {
        this.data.sliderStatus = true;

        let disX = this.data.startX - e.touches[0].clientX,
          index = e.currentTarget.dataset.index,
          style = '';
        if (disX <= 0) {
          style = 'left: 0';
        } else if (disX > 0) {
          style = `left: -${disX}rpx`;
          if (disX >= this.properties.singleBtnW) {
            style = `left: -${this.properties.singleBtnW}rpx`;
          }
        }
        this.properties.lists[index].style = style;
        this.setData({
          lists: this.properties.lists
        });
      }
    },
    touchE: function (e) {
      if (e.changedTouches.length === 1) {
        let disX = this.data.startX - e.changedTouches[0].clientX,
          index = e.currentTarget.dataset.index,
          style = (disX > this.properties.singleBtnW / 2) ? `left: -${this.properties.singleBtnW}rpx` : 'left: 0';
        this.properties.lists[index].style = style;
        this.setData({
          lists: this.properties.lists
        });
      }
    },
  }
})
