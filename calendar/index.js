const MAX_MONTH = [1, 3, 5, 7, 8, 10, 12];
const MIN_MONTH = [1, 4, 6, 9, 11];

Component({
  properties: {},
  data: {
    styleEnum: {
      'prev': 'day-prev',
      'active': 'day-active',
      'now': 'day-now',
      'next': 'day-next'
    },
    actual: {
      year: 2019,
      month: 19,
      day: 1,
      week: 1
    },
    weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    days: [],

    row: -1,
    column: -1,
    year: 2019,
    month: 3,
    day: 1,
    week: 1
  },
  lifetimes: {
    attached: function(){
      let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

      this.setData({
        year,
        month,
        day
      });
      this.renderDays(year, month, day);
    }
  },
  methods: {
    handleChangeYear: function (e) {
      let { type } = e.currentTarget.dataset,
          { year, month } = this.data;
      
      type === 'prev' ? --year : ++year;
      this.setData({ 
        year,
        row: -1,
        column: -1
      });
      this.renderDays(year, month, 1);
      this.handleTriggerEvent();
    },
    handleChangeMonth: function (e) {
      let { type } = e.currentTarget.dataset,
        { year, month } = this.data;

      if(type === 'prev'){
        if(month === 1){
          month = 12;
          --year;
        }else{
          --month;
        }
      }else{
        if (month === 12) {
          month = 1;
          ++year;
        } else {
          ++month;
        }
      }

      this.setData({ 
        year, 
        month,
        row: -1,
        column: -1 
      });
      this.renderDays(year, month, 1);
      this.handleTriggerEvent();
    },
    //切换天
    handleChangeDay: function (e) {
      let { year, month, day, week } = e.currentTarget.dataset;
      this.setData({ year, month, day, week });
      this.renderDays(year, month, day);
      this.handleTriggerEvent();
    },
    //渲染数据
    renderDays: function(year, month, day){
      let prevDays = this.getDays(year, month - 1),
          nowDays = this.getDays(year, month),
          week = new Date(`${year}/${month}/1`).getDay();  //计算指定日期是星期几

      this.setData({
        days: this.formatDays(year, month, day)
      });
    },
    //判断指定年份是否是闰年
    isLeapYear: function (year) {
      if (typeof year !== 'number') {
        console.error(`isLeapYear 接受的参数必须为数字`);
        return;
      }

      return (year % 4 === 0 && year % 100 > 0) || (year % 400 === 0)
    },
    //获取指定年，月的天数
    getDays: function (year, month) {
      if (typeof month !== 'number') {
        console.error(`getDays 接受的参数必须为数字`);
        return;
      }

      if (MAX_MONTH.includes(month)) {
        return 31;
      } else if (MIN_MONTH.includes(month)) {
        return 30;
      } else if (month === 2) {
        return this.isLeapYear(year) ? 29 : 28;
      }
    },
    formatDays: function(year, month, day){
      let week = new Date(`${year}/${month}/${1}`).getDay(),
          prevMaxDay = this.getDays(year, month - 1),
          nowMaxDay = this.getDays(year, month),
          prevDays = [],
          nowDays = [],
          nextDays = [],
          weekDays = [],
          days = [],
          temp = [];

      if(week === 0) week = 7;

      for(let i = 0; i < week - 1; i++){
        prevDays.push({
          status: 'prev',
          year: month === 1 ? year - 1 : year,
          month: month === 1 ? 12 : month - 1,
          value: prevMaxDay - week - i,
        });
      }
      for (let i = 0; i < nowMaxDay; i++) {
        nowDays.push({
          status: (day === i + 1) ? 'active' : 'now',
          year,
          month,
          value: i + 1
        });
      }
      for (let i = 0, len = (7 - ((week - 1) + nowMaxDay) % 7); i < len; i++) {
        nextDays.push({
          status: 'next',
          year: month === 12 ? year + 1 : year,
          month: month === 12 ? 1 : month + 1,
          value: i + 1,
        });
      }

      temp = temp.concat(prevDays).concat(nowDays).concat(nextDays);
      temp.forEach((item, index) => {
        item.week = index + 1;
        weekDays.push(item);
        if ((index + 1) % 7 === 0) {
          days.push(weekDays);
          weekDays = [];
        }
      });
      return days;
    },
    handleTriggerEvent: function(){
      let { year, month, day, week } = this.data,
          detail = {year, month, day, week};

      this.triggerEvent('onChange', detail);
    }
  }
})
