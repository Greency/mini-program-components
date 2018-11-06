Component({
  properties: {
    value: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '选择时间'
    },
    placeholderStyle: {
      type: String,
      value: 'color: #DDDDDD'
    },
    valueStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    currentDateArr: [0, 0, 0, 0, 0],
    dateArr: [],

    years: [],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    days: [],
    hours: [],
    minutes: [],

    currentY: '',
    currentM: '',
    currentD: '',
  },
  lifetimes: {
    attached: function() {
      let {hours, minutes, years, months, days, currentY, currentM, currentD} = this.data,
        date = new Date();
        
      currentY = date.getFullYear();
      currentM = date.getMonth() + 1;
      currentD = date.getDate();
      years = [`${currentY}年`, `${currentY + 1}年`];
      //组装“天”
      for (let i = 1; i <= new Date(currentY, currentM, 0).getDate(); i++) {
        days.push(`${i}日`);
      }
      //组装“时”
      for (let i = 0; i <= 23; i++) {
        let temp = (i < 10) ? '0' + i : i;
        hours.push(`${temp}时`);
      }
      //组装“分”
      for (let i = 0; i <= 59; i++) {
        let temp = (i < 10) ? '0' + i : i;
        minutes.push(`${temp}分`);
      }
      this.setData({
        years,
        hours,
        minutes,
        currentY,
      })

      //初始化数据
      this.combineDate();
      this.changeDate(currentY, currentM);

      //打开时间选择器，默认显示当前的日期
      if (this.data.value === '') {
        let { currentDateArr } = this.data;

        months.forEach((item, index) => {
          if (item === currentM + '月') currentDateArr[1] = index;
        })
        days.forEach((item, index) => {
          if (item === currentD + '日') currentDateArr[2] = index;
        })

        debugger;
        this.setData({
          currentDateArr
        })
      }
    }
  },
  methods: {
    //列的改变执行的事件
    handleColumnChange: function(e) {
      let {column, value} = e.detail, 
          {dateArr, currentY, currentM} = this.data;

      switch (column) {
        case 0:
          currentY = dateArr[column][value].match(/(\w+)/)[0];
          break;
        case 1:
          currentM = dateArr[column][value].match(/(\w+)/)[0];
          break;
      }
      this.changeDate(currentY, currentM);
    },
    //选择时间后的回调
    handleTimeChange: function(e) {
      let {value} = e.detail,
        time = '';

      value.forEach((item, index) => {
        time += this.formateDate(this.data.dateArr[index][item]);
      })
      this.setData({
        value: time
      })
      this.triggerEvent('timeChange', time);
    },
    /**
     * 改变日期数据
     * @param {Number} year 年
     * @param {Number} month 月
    */
    changeDate: function(year, month){
      //重新组装天数
      for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
        this.data.dateArr[2].push(`${i}日`);
      }
      this.setData({
        dateArr: this.data.dateArr
      })
    },  
    //将年月日时分组合在数组中
    combineDate: function(){
      let dateArr = [],
          {years, months, days, hours, minutes} = this.data;

      dateArr.push(years);
      dateArr.push(months);
      dateArr.push(days);
      dateArr.push(hours);
      dateArr.push(minutes);
      this.setData({
        dateArr
      })
    },
    //格式化时间
    formateDate: function(time) {
      let reg = /分/,
        replaceStr = '';

      if (/年|月/.test(time)) {
        reg = /年|月/;
        replaceStr = '-';
      } else if (/日/.test(time)) {
        reg = /日/;
        replaceStr = ' ';
      } else if (/时/.test(time)) {
        reg = /时/;
        replaceStr = ':';
      }

      return time.replace(reg, () => {
        return replaceStr;
      });
    },
  },
})