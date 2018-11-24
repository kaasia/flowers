//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sideLength: 0,
    measureRate: 1.0,
    imageResource: '',
    isDrawingCircles: true,
    colorSelected: '',

    radiusA: 0,
    pointA: {
      x: 0,
      y: 0
    },
    radiusB: 0,
    sliderValueB: 0,
    radiusBMax: 0,
    pointB: {
      x: 0,
      y: 0
    }, 
    radiusC: 0,
    sliderValueC: 0,
    radiusCMax: 0,
    pointC: {
      x: 0,
      y: 0
    },
  },

  getPointInCircle: function(center, radius, radian) {
    var point = {};
    point.x = center.x + radius * Math.cos(radian);
    point.y = center.y - radius * Math.sin(radian);
    console.log('point.x = ' + point.x + ', point.y = ' + point.y)
    return point;
  },

  getPointInChildCircle: function(centerA, radiusA, radiusB, radiusC, radian) {
    var centerB = this.getPointInCircle(centerA, radiusA - radiusB, radian);
    var radianC = 2.0 * Math.PI - ((radiusA / radiusB * radian) % (2.0 * Math.PI));
    return this.getPointInCircle(centerB, radiusC, radianC);
  },

  setupPointB: function() {
    this.setData({
      pointB: this.getPointInCircle(this.data.pointA, this.data.radiusA - this.data.radiusB, this.data.radian)
    })
  },

  setupPointC: function () {
    if (this.data.radian == 0) {
      return
    }
    this.setData({
      pointC: this.getPointInChildCircle(this.data.pointA, this.data.radiusA, this.data.radiusB, this.data.radiusC, this.data.radian)
    })
  },

  startDrawCircles: function() {
    this.setData({
      isDrawingCircles: true
    })

    var ctx = wx.createCanvasContext('myCanvas');

    // drawImage
    var imageResource = this.data.imageResource
    var sideLength = this.data.sideLength
    if (imageResource != '') {
      ctx.drawImage(imageResource, 0, 0, sideLength, sideLength)
    }

    // drawCircleA
    ctx.setStrokeStyle("#C0C0C0")
    ctx.setLineWidth(1)
    ctx.arc(this.data.pointA.x, this.data.pointA.y,
      this.data.radiusA, 0, 2 * Math.PI, true)
    ctx.stroke()

    // drawCircleB
    ctx.moveTo(this.data.pointB.x + this.data.radiusB, this.data.pointB.y)
    ctx.setLineWidth(1)
    ctx.arc(this.data.pointB.x, this.data.pointB.y,
      this.data.radiusB, 0, 2 * Math.PI, true)
    ctx.stroke()

    // drawLine
    ctx.moveTo(this.data.pointB.x, this.data.pointB.y)
    ctx.lineTo(this.data.pointC.x, this.data.pointC.y)
    ctx.stroke()

    // drawPoint
    ctx.beginPath()
    ctx.setFillStyle(this.data.colorSelected)
    var radiusP = 3;
    ctx.moveTo(this.data.pointC.x + radiusP, this.data.pointC.y)
    ctx.arc(this.data.pointC.x, this.data.pointC.y,
      radiusP, 0, 2 * Math.PI, true)
    ctx.fill()

    ctx.draw()
  },

  startDrawFlowerLines: function() {
    this.setData({
      isDrawingCircles: false
    })

    var ctx = wx.createCanvasContext('myCanvas');

    // drawImage
    var imageResource = this.data.imageResource
    var sideLength = this.data.sideLength
    if (imageResource != '') {
      ctx.drawImage(imageResource, 0, 0, sideLength, sideLength)
    }

    // drawFlowers
    ctx.beginPath()
    var isHaveMove = false;
    var tr = 0;
    while (tr < this.data.radian) {
      tr += 0.1;
      var tp = this.getPointInChildCircle(this.data.pointA, this.data.radiusA, this.data.radiusB, this.data.radiusC, tr)
      if (!isHaveMove) {
        ctx.moveTo(tp.x, tp.y)
        isHaveMove = true
      } else {
        ctx.lineTo(tp.x, tp.y)
      }
    }
    ctx.setStrokeStyle(this.data.colorSelected)
    ctx.stroke()

    ctx.draw()
  },

  chooseImage: function () {
    const ctx = wx.createCanvasContext('myCanvas')
    var me = this
    var sideLength = me.data.sideLength
    var isDrawingCircles = me.data.isDrawingCircles

    wx.chooseImage({
      success: function (res) {
        console.log('选择图片成功')
        me.setData({
          imageResource: res.tempFilePaths[0]
        })
        if (isDrawingCircles) {
          me.startDrawCircles()
        } else {
          me.startDrawFlowerLines()
        }
      }
    })
  },

  chooseColor: function() {
    wx.navigateTo({
      url: '/pages/color/color'
    })
  },

  saveCanvas: function() {
    var width = this.data.sideLength
    var height = width
    var dest = 2.0

    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: width,
      height: height,
      destWidth: width * dest,
      destHeight: height * dest,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
            success: function (res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1000
              })
            },
            fail: function (res) {
              // do noting
            }
        })  
      },
      fail: function() {
        // do noting
      }
    })
  },

  onRadiusBChange: function(e) {
    // 画点半径需要小于小圆半径，否则部分繁花曲线会绘制在画布之外
    this.setData({
      radiusB: e.detail.value * this.data.measureRate,
      // radiusCMax: e.detail.value * this.data.measureRate
    })
    this.setupPointB()
    this.setupPointC()
    this.startDrawCircles()
  },

  onRadiusCChange: function (e) {
    this.setData({
      radiusC: e.detail.value * this.data.measureRate
    })
    this.setupPointB()
    this.setupPointC()
    this.startDrawCircles()
  },

  onRadiusBLongPress: function (e) {
    wx.showModal({
      title: '子尺半径',
      content: '通过控制子尺半径可约算出小圆的自转数，以间接控制繁花曲线的花瓣数（滑动选择器发生变化时，画布中的子尺（小圆）辅助线会也作出相应变化）',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onRadiusCLongPress: function (e) {
    wx.showModal({
      title: '绘点半径',
      content: '通过控制绘点半径，可以绘制出更多样的繁花曲线（滑动选择器发生变化时，画布中的绘点半径（线段）辅助线也会作出相应变化）',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onImageLongPress: function(e) {
    wx.showModal({
      title: '底图',
      content: '可通过拍照或相册，选择一张照片作为繁花曲线的底图。推荐使用风景，或你喜欢的人（推荐中的推荐）',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onColorLongPress: function (e) {
    wx.showModal({
      title: '颜色',
      content: '选择将要绘制的繁花曲线的颜色，共支持 14 * 5 种颜色（选择颜色后，画布中的绘点和上方的滑动选择器会做出相应颜色变化）',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onDrawLongPress: function (e) {
    wx.showModal({
      title: '绘制',
      content: '根据你选择的小圆半径、画点半径、底图、颜色，开始绘制繁花曲线（此时不再大小圆等辅助线，绘制可能需要点时间，稳住我们能赢）',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onSaveLongPress: function (e) {
    wx.showModal({
      title: '保存',
      content: '将当前画布中的图像保存到相册，然后就可以设为头像，或作为其它用途',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onSendLongPress: function (e) {
    wx.showModal({
      title: '发送',
      content: '发送当前画布的图像给好友或到微信群，好友点击后会自动打开此小程序，再自动在画布中绘制与当前一样的图像，好玩的小程序别忘了与好友分享噢',
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  onTipLongPress: function (e) {
    // 1 - 8 的随机数
    var random = Math.floor(Math.random() * (8 - 1 + 1) + 1)
    var content = ''
    switch(random) {
      case 1: 
        content = '英雄不问出路，流氓不看岁数' 
        break;
      case 2:
        content = '人又不聪明，还学人家秃顶'
        break;
      case 3:
        content = '要在江湖混，最好是光棍'
        break;
      case 4:
        content = '怀才就像怀孕，时间久了才能让人看出来'
        break;
      case 5:
        content = '人怕出名猪怕壮，男怕没钱女怕胖'
        break;
      case 6:
        content = '好久没有人把牛皮吹的这么清新脱俗'
        break;
      case 7:
        content = '钞票不是万能的，有时还需要信用卡'
        break;
      case 8:
        content = '爱情就像便便，来了之后挡也挡不住'
        break;
      default:
        content = '驴是的念来过倒' 
        break;
    }
    wx.showModal({
      title: '彩蛋',
      content: content,
      showCancel: false,
      confirmText: '哈哈'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isFromShare = '1' == options.isFromShare
    if (isFromShare) {
      app.globalData.colorSelected = options.colorSelected
      this.data.isDrawingCircles = options.isDrawingCircles == 'true'
    }
    
    console.log(options)
    console.log('isFromShare = ' + isFromShare)

    var res = wx.getSystemInfoSync()
    var mr = res.windowWidth / 750
    var sl = mr * 750
    var ra = sl / 2;
    var rb = isFromShare ? options.radiusB : (sl / 7 * 3);
    var rc = isFromShare ? options.radiusC : (sl / 3);

    this.setData({
      measureRate: mr,
      sideLength: sl,
      radiusA: ra,
      pointA: {
        x: sl / 2,
        y: sl / 2
      },
      radiusB: rb,
      radiusBMax: sl,
      sliderValueB: rb,
      pointB: {
        x: rb,
        y: sl / 2
      },
      radiusC: rc,
      radiusCMax: sl,
      sliderValueC: rc,
      pointC: {
        x: rb + rc,
        y: sl / 2
      },
      radian: 300
    })
    this.setupPointB()
    this.setupPointC()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // do nothing
  },

  onShow: function() {
    if (app.globalData.colorSelected != this.data.colorSelected) {
      this.setData({
        colorSelected: app.globalData.colorSelected
      })
      this.setupPointB()
      this.setupPointC()
      if (this.data.isDrawingCircles) {
        this.startDrawCircles()
      } else {
        this.startDrawFlowerLines()
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // 先保存图片
    var me = this
    var width = this.data.sideLength
    var height = width
    var dest = 2.0

    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: width,
      height: height,
      destWidth: width * dest,
      destHeight: height * dest,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log('canvasToTempFilePath success')
        me.setData({
          imageResource: res.tempFilePath
        })
      },
      fail: function () {
        console.log('canvasToTempFilePath fail')
        me.setData({
          imageResource: ''
        })
      }
    })

    // 再返回分享对象
    var radiusB = this.data.radiusB
    var radiusC = this.data.radiusC
    var colorSelected = this.data.colorSelected
    var isDrawingCircles = this.data.isDrawingCircles
    var imageResource = this.data.imageResource
    return {
      title: '给爱的人画「一个繁花曲线」',
      path: '/pages/index/index?isFromShare=1&radiusB=' + radiusB + '&radiusC=' + radiusC + '&colorSelected=' + colorSelected + '&isDrawingCircles=' + isDrawingCircles,
      imageUrl: imageResource,
      success: function (res) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: function (res) {
        // do nothing  
      }
    }
  },
})
