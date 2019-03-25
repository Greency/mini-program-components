Component({
  properties: {
    show: Boolean,
    cancel: {
      type: Boolean,
      value: true
    },
    lists: Array
  },
  lifetimes: {
    attached:function(){
      let { cancel, lists } = this.data,
          hasCancel = false;

      if(cancel){
        for(let i = 0, len = lists.length; i < len; i++){
          if(lists[i].type === 'cancel'){
            hasCancel = true;
            break;
          }
        }

        if(!hasCancel){
          lists.push({ type: 'cancel', text: '取消' });
          this.setData({ lists });
        }
      }
    }
  },
  data: {},
  methods: {
    handleClose: function(e){
      this.setData({ show: false });
    },
    handleAction: function(e){
      let { index, type } = e.currentTarget.dataset,
        detail = {
          index,
          type
        };

      this.setData({ show: false });
      this.triggerEvent('onTap', detail);
    }
  }
})
