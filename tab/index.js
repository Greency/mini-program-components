
Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    height: {
      type: Number,
      value: 80
    },
    activeColor: {
      type: String,
      value: '#ffe600'
    } 
  },
  data: {
    currentTabIndex: 0,
  },
  methods: {
    handleTabChange: function(e){
      let {index} = e.currentTarget.dataset;
      if(index !== this.data.currentTabIndex){
        this.setData({
          currentTabIndex: index
        })
        let detail = this.data.tabs[index];
        detail.index = index;
        this.triggerEvent('tabChange', detail);
      }
    }
  }
})
