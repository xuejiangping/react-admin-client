import { mock,Random } from 'mockjs'
window.mock = mock

// 自定义Mock.Random 中的模板数据
Random.extend({
  constellation: function (date) {
    console.log('date的值----',date)
    var constellations = ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座']
    return this.pick(constellations)
  }
})

mock('/api/mock',{ code: 0,msg: 'ok','star|1-5': '♥' })
mock('/api/login',{
  'status|0-1': 1,msg: '登录成功',data: {
    name: mock('@cname'),
    uid: mock('@id'),
    picUrl: mock('@image')
  }
})


//商品目录
mock('/api/cat-list',{

  'status|0-1': 1,msg: 'ok',
  'data|10-20': [
    {
      cat: '@cword(2,5)',
      'key|+1': 1,
      'subCat|3-6': [
        {
          cat: '@cword(2,4)',
          'key|+1': 1,
        }
      ]
    },
  ],

})
Random.guid()
//商品管理
mock('/api/product',{
  'status|0-1': 1,msg: 'ok',
  'data|20-30': [{
    pname: /[\u4E00-\u9FA5\w]{10,20}/,
    key: '@guid()',
    desc: '@cparagraph(1,3)',
    price: '@natural(3000,20000)'

  }]
})