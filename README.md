# mini-program-components

tips: 本厂库存放的是本人在开发小程序时封装的一些小的组件。

### 组件列表

- 模态框（c-modal）
- 输入框（c-input）
- 侧滑单项（c-slider）
- tab组件（c-tab）
- 时间选择器（c-picker-date）

### 模态框
#### 属性

属性名称 | 默认值|描述
---|---
title |null|模态框的标题
submitText|'同意'|”确认按钮“的文案
cancelText|'拒绝'|“取消按钮”的文案
isAuthorized|false|是否是微信授权登录的模态框
isShow|false|是否显示

#### 方法

方法名 | 返回值|描述
---|---
submit |e.detail|
cancel|e.detail|

### tab组件
#### 属性

属性名称 | 默认值|描述
---|---
tabs | []|此值得类型为[{id: xx, text: xx}]
height:|80(rpx)|显示高度
activeColor|'#ffe600'|选中时文字的样式

#### 方法

方法名 | 返回值|描述
---|---
tabChange |e.detail|tab切换时的回调

### 时间选择器
#### 属性

属性名称 | 默认值|描述
---|---
mode | 'dateTime'|其他值：date, time
value|''|
valueStyle|''|
placeholder|'选择时间'|
placehoslderStyle|'color: #DDDDDD'|
disabled|false|

#### 方法

方法名 | 返回值|描述
---|---
timeChange |e.detail|返回当前选中的时间
