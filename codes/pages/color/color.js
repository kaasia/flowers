//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: [{
        keys: 'Red',
        colors: [
          { key: '100', color: '#FFCDD2' }, 
          { key: '200', color: '#EF9A9A' },
          { key: '300', color: '#E57373' }, 
          { key: '400', color: '#EF5350' },
          { key: '500', color: '#F44336' }
        ]
      }, {
        keys: 'Pink',
        colors: [
          { key: '100', color: '#F8BBD0' },
          { key: '200', color: '#F48FB1' },
          { key: '300', color: '#F06292' },
          { key: '400', color: '#EC407A' },
          { key: '500', color: '#E91E63' }
        ]
      }, {
        keys: 'Purple',
        colors: [
          { key: '100', color: '#E1BEE7' },
          { key: '200', color: '#CE93D8' },
          { key: '300', color: '#BA68C8' },
          { key: '400', color: '#AB47BC' },
          { key: '500', color: '#9C27B0' }
        ]
      // }, {
      //   keys: 'Deep Purple',
      //   colors: [
      //     { key: '100', color: '#D1C4E9' },
      //     { key: '200', color: '#B39DDB' },
      //     { key: '300', color: '#9575CD' },
      //     { key: '400', color: '#7E57C2' },
      //     { key: '500', color: '#673AB7' }
      //   ]
      }, {
        keys: 'Indigo',
        colors: [
          { key: '100', color: '#C5CAE9' },
          { key: '200', color: '#9FA8DA' },
          { key: '300', color: '#7986CB' },
          { key: '400', color: '#5C6BC0' },
          { key: '500', color: '#3F51B5' }
        ]
      }, {
        keys: 'Blue',
        colors: [
          { key: '100', color: '#BBDEFB' },
          { key: '200', color: '#90CAF9' },
          { key: '300', color: '#64B5F6' },
          { key: '400', color: '#42A5F5' },
          { key: '500', color: '#2196F3' }
        ]
      // }, {
      //   keys: 'Light Blue',
      //   colors: [
      //     { key: '100', color: '#B3E5FC' },
      //     { key: '200', color: '#81D4FA' },
      //     { key: '300', color: '#4FC3F7' },
      //     { key: '400', color: '#29B6F6' },
      //     { key: '500', color: '#03A9F4' }
      //   ]
      }, {
        keys: 'Cyan',
        colors: [
          { key: '100', color: '#B2EBF2' },
          { key: '200', color: '#80DEEA' },
          { key: '300', color: '#4DD0E1' },
          { key: '400', color: '#26C6DA' },
          { key: '500', color: '#00BCD4' }
        ]
      }, {
        keys: 'Teal',
        colors: [
          { key: '100', color: '#B2DFDB' },
          { key: '200', color: '#80CBC4' },
          { key: '300', color: '#4DB6AC' },
          { key: '400', color: '#26A69A' },
          { key: '500', color: '#009688' }
        ]
      }, {
        keys: 'Green',
        colors: [
          { key: '100', color: '#C8E6C9' },
          { key: '200', color: '#A5D6A7' },
          { key: '300', color: '#81C784' },
          { key: '400', color: '#66BB6A' },
          { key: '500', color: '#4CAF50' }
        ]
      // }, {
      //   keys: 'Light Green',
      //   colors: [
      //     { key: '100', color: '#DCEDC8' },
      //     { key: '200', color: '#C5E1A5' },
      //     { key: '300', color: '#AED581' },
      //     { key: '400', color: '#9CCC65' },
      //     { key: '500', color: '#8BC34A' }
      //   ]
      }, {
        keys: 'Lime',
        colors: [
          { key: '100', color: '#F0F4C3' },
          { key: '200', color: '#E6EE9C' },
          { key: '300', color: '#DCE775' },
          { key: '400', color: '#D4E157' },
          { key: '500', color: '#CDDC39' }
        ]
      }, {
        keys: 'Yellow',
        colors: [
          { key: '100', color: '#FFF9C4' },
          { key: '200', color: '#FFF59D' },
          { key: '300', color: '#FFF176' },
          { key: '400', color: '#FFEE58' },
          { key: '500', color: '#FFEB3B' }
        ]
      }, {
        keys: 'Amber',
        colors: [
          { key: '100', color: '#FFECB3' },
          { key: '200', color: '#FFE082' },
          { key: '300', color: '#FFD54F' },
          { key: '400', color: '#FFCA28' },
          { key: '500', color: '#FFC107' }
        ]
      }, {
        keys: 'Orange',
        colors: [
          { key: '100', color: '#FFE0B2' },
          { key: '200', color: '#FFCC80' },
          { key: '300', color: '#FFB74D' },
          { key: '400', color: '#FFA726' },
          { key: '500', color: '#FF9800' }
        ]
      // }, {
      //   keys: 'Deep Orange',
      //   colors: [
      //     { key: '100', color: '#FFCCBC' },
      //     { key: '200', color: '#FFAB91' },
      //     { key: '300', color: '#FF8A65' },
      //     { key: '400', color: '#FF7043' },
      //     { key: '500', color: '#FF5722' }
      //   ]
      }, {
        keys: 'Brown',
        colors: [
          { key: '100', color: '#D7CCC8' },
          { key: '200', color: '#BCAAA4' },
          { key: '300', color: '#A1887F' },
          { key: '400', color: '#8D6E63' },
          { key: '500', color: '#795548' }
        ]
      }, {
        keys: 'Grey',
        colors: [
          { key: '100', color: '#F5F5F5' },
          { key: '200', color: '#EEEEEE' },
          { key: '300', color: '#E0E0E0' },
          { key: '400', color: '#BDBDBD' },
          { key: '500', color: '#9E9E9E' }
        ]
      // }, {
      //   keys: 'Blue Grey',
      //   colors: [
      //     { key: '100', color: '#CFD8DC' },
      //     { key: '200', color: '#B0BEC5' },
      //     { key: '300', color: '#90A4AE' },
      //     { key: '400', color: '#78909C' },
      //     { key: '500', color: '#607D8B' }
      //   ]
      }
    ]
  },

  onColorTab: function(e) {
    var color = e.currentTarget.dataset.color
    console.log('color  = ' + color)
    app.globalData.colorSelected = color
    wx.navigateBack({
      delta: 1
    })
  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
  // }
})