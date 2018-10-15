// mini-program-components/c-input/index.js
Component({
  properties: {
    value:{
      type: String,
      value: ''
    },
    type:{
      type: String,
      value: 'text'
    },
    name: {
      type: String,
      value: ''
    },
    clearable: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    }
  },
  data: {
  },
  lifetimes: {
    attached: function(){
      console.log('value: ', this.properties.value);
    }
  },
  methods: {
    change: function(){
      let res = {};
      res.value = this.data.value;
      this.triggerEvent('change', res);
    },
    input: function(e){
      let value = e.detail.value.trim();
      this.setData({
        value,
      })
      this.change();
      this.triggerEvent('input', e.detail);
    },
    focus: function(e){
      this.triggerEvent('focus', e.detail);
    },
    blur: function(e){
      this.triggerEvent('blur', e.detail);
    },
    confirm: function(e){
      this.triggerEvent('confirm', e.detail);
    },
    clear: function(){
      this.setData({
        value: ''
      })
      this.change();
      this.triggerEvent('clear', this.data.value);
    }
  }
})
