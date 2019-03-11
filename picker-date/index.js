const REG_FORMAT = /(Y{2,4})|(M{1,2})|(D{1,2})|(h{1,2})|(m{1,2})|(s{1,2})/g;

Component({
  properties: {
    format: String,
    value: String,
    valueStyle: String,
    disabled: Boolean,

    mode: {
      type: String,
      value: 'dateTime'
    },
    placeholder: {
      type: String,
      value: '选择时间'
    },
    placeholderStyle: {
      type: String,
      value: 'color: #DDDDDD'
    }
  },
  data: {
    currentDateArr: [0, 0, 0, 0, 0],
    dateArr: [],
    currentDateValue: []
  },
  lifetimes: {
    attached: function () {
      console.log('format: ', this.data.format === '');
      this.init();
    }
  },
  methods: {
    init: function () {
      let {mode} = this.data;
      //先判断用户mode值是否正确
      if(!(mode === 'dateTime' || mode === 'date' || mode === 'time')){
        console.error(`"${mode}"不是正确的mode值`);
        return;
      }
      if(mode === 'dateTime' || mode === 'date'){
        this.createYears();
        this.createMonths();
        this.createDays();
      }
      if(mode === 'dateTime' || mode === 'time'){
        this.createHours();
        this.createMinutesAndSeconds();
      }
      //设置时间选择器的默认值
      this.setDefault();
      //将年月日时分秒组合成数组
      this.combineDate();
    },
    //设置默认值
    setDefault: function () {
      let currentDateArr = [],
        date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        mi = date.getMinutes(),
        s = date.getSeconds();

      switch(this.data.mode){
        case 'dateTime':currentDateArr = [0, m - 1, d - 1, h, mi, s];break;
        case 'date': currentDateArr = [0, m - 1, d - 1];break;
        case 'time': currentDateArr = [h, mi, s];break;
        default:
          console.error(`"${this.data.mode}"不是正确的mode值`);
          return;
      }
      this.setData({
        currentDateArr
      })
    },
    /**
     * 改变日期数据
     * @param {Number} year 年
     * @param {Number} month 月
    */
    changeDate: function (year, month) {
      let days = [];
      for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
        days.push(`${i}日`);
      }
      this.data.dateArr[2] = days;
      this.setData({
        dateArr: this.data.dateArr
      })
    },
    //生成“年”的数组
    createYears: function () {
      let y = new Date().getFullYear();
      this.setData({
        years: [`${y}年`, `${y + 1}年`]
      })
    },
    //生成“月”的数组
    createMonths: function () {
      this.setData({
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      })
    },
    //生成“日”的数组
    createDays: function(){
      let date = new Date(),
        days = [];
      for (let i = 1; i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
        days.push(`${i}日`);
      }
      this.setData({
        days
      })
    },
    //生成“时”的数组
    createHours: function(){
      let hours = [];
      for (let i = 0; i <= 23; i++) {
        let temp = (i < 10) ? '0' + i : i;
        hours.push(`${temp}时`);
      }
      this.setData({
        hours
      })
    },
    //生成“分”，“秒”的数组
    createMinutesAndSeconds: function(){
      let minutes = [],
          seconds = [];
      for (let i = 0; i <= 59; i++) {
        let temp = (i < 10) ? '0' + i : i;
        minutes.push(`${temp}分`);
        seconds.push(`${temp}秒`);
      }
      this.setData({
        minutes,
        seconds
      })
    },
    //将年月日时分组合在数组中
    combineDate: function () {
      let dateArr = [],
        { mode, years, months, days, hours, minutes, seconds } = this.data;

      if (mode === 'dateTime' || mode === 'date') {
        dateArr.push(years);
        dateArr.push(months);
        dateArr.push(days);
      }
      if (mode === 'dateTime' || mode === 'time') {
        dateArr.push(hours);
        dateArr.push(minutes);
        dateArr.push(seconds);
      }
      this.setData({
        dateArr
      })
    },
    //列的改变执行的事件
    handleColumnChange: function (e) {
      let date = new Date(), 
        y = date.getFullYear(),
        m = date.getMonth(), 
        { column, value } = e.detail,
        { dateArr, mode, currentDateArr } = this.data;
     
      switch (column) {
        case 0:
          y = dateArr[column][value].match(/(\w+)/)[0];
          break;
        case 1:
          m = dateArr[column][value].match(/(\w+)/)[0];
          break;
      }
      currentDateArr[column] = value; 
      //用户只要滑动了某一列，那么这一列之后的所有列都回到初始状态
      for (let i = 0; i < currentDateArr.length; ++i) {
        if (i > column) {
          currentDateArr[i] = 0;
        }
      }
      this.setData({
        currentDateArr
      })
      
      this.changeDate(y, m);
    },
    //选择时间后的回调
    handleTimeChange: function (e) {
      let { value } = e.detail,
        time = '',
        detail = {},
        currentDateValue = [];

      value.forEach((item, index) => {
        let temp = this.formatToStandardDate(this.data.dateArr[index][item]);
        currentDateValue.push(temp);
        time += temp;
      })
      this.setData({
        value: time,
        currentDateValue
      })
      detail.data = time;
      detail.formatData = (this.data.format.trim() === '') ? time : this.formatResult(this.data.format);
      console.log('detail: ',detail);
      this.triggerEvent('timeChange', detail);
    },
    //将时间格式化成标准格式
    formatToStandardDate: function (time) {
      let reg = /秒/,
        replaceStr = '';

      if (/年|月/.test(time)) {
        reg = /年|月/;
        replaceStr = '-';
      } else if (/日/.test(time)) {
        reg = /日/;
        replaceStr = ' ';
      } else if (/时|分/.test(time)) {
        reg = /时|分/;
        replaceStr = ':';
      }

      return time.replace(reg, () => {
        return replaceStr;
      });
    },
    //格式化结果日期
    formatResult(reg) {
      if (this.data.mode === 'Date') return this.formatDateResult(reg);
      if (this.data.mode === 'Time') return this.formatTimeResult(reg);

      return this.formatDateResult(reg) + this.formatTimeResult(reg);
    },
    //格式化 Date 结果
    formatDateResult(reg) {
      if (!typeof reg === 'string') new Error(` '${reg}' 不是一个字符串！`);
      let Y = this.data.currentDateValue[0],
          M = this.data.currentDateValue[1],
          D = this.data.currentDateValue[2];

      return reg.replace(REG_FORMAT, (match) => {
        switch (match) {
          case 'YYYY':
            return Y;
          case 'YY':
            return String(Y).slice(-2);
          case 'MM':
            return M < 10 ? `0${M}` : M;
          case 'M':
            return M;
          case 'DD':
            return D < 10 ? `0${D}` : D;
          case 'D':
            return D;
          default:
            new Error(` '${match}' 解析出错！`);
        }
      });
    },
    //格式化 Time 结果
    formatTimeResult(reg) {
      if (!typeof reg === 'string') new Error(` '${reg}' 不是一个字符串！`);
      let h = this.data.currentDateValue[0],
        m = this.data.currentDateValue[1],
        s = this.data.currentDateValue[2];
      return reg.replace(REG_FORMAT, (match) => {
        switch (match) {
          case 'hh':
            return h < 10 ? `0${h}` : h;
          case 'h':
            return h;
          case 'mm':
            return m < 10 ? `0${m}` : m;
          case 'm':
            return m;
          case 'ss':
            return s < 10 ? `0${s}` : s;
          case 's':
            return s;
          default:
            new Error(` '${match}' 解析出错！`);
        }
      });
    }
  }
})