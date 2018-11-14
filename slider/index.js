// mini-program-components/slider/index.js
Component({
  relations: {
    '../slider-item/index': {
      type: 'child',
      linked: function (target) {
        console.log('child insert target: ', target)
      },
      linkChanged: function (target) {
        console.log('child change: ', target);
      },
      unlinked: function (target) {
        
      }
    }
  },
  properties: {

  },
  data: {

  },
  methods: {

  }
})
