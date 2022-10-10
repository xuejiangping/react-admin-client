import React, { useEffect, useState } from 'react'
import { Card, Button } from 'antd'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
// 将下载的 主题(js格式) 引入，js中已registerTheme注册了主题
import './theme/测试主题-紫色.js'
// import('./theme/测试主题-紫色.json').then(console.log)
const color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

export default function Column() {

  useEffect(() => {
    // 将下载的 主题(json格式) 通过 registerTheme注册后使用
    // echarts.registerTheme('我的主题',require('./theme/测试主题-紫色.json'))
    //======================================================================
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('column') as HTMLElement)
    window.myChart = myChart
    window.onresize = () => myChart.resize()
    // 绘制图表
    const option: EChartsOption = {
      // 设置线条颜色
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      // 设置图表标题
      title: {
        text: '柱形图',
        link: 'https://www.baidu.com',
        textStyle: {
          color: 'red',
        },
      },
      // 设置提示框组件
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      // 提供图表工具栏，可自定义工具
      toolbox: {},
      yAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        name: '品类',
        axisLabel: {
          //轴标签设置
          show: true,
        },
        axisTick: {
          // 轴刻度
          show: false,
          alignWithLabel: true, //刻度和标签对齐
        },
        axisLine: {
          show: false,
        },
      },
      xAxis: {
        //线条和坐标轴缝隙
        // boundaryGap:true
        show: false,
      },
      // 图例组件
      legend: {
        /**
         * 若series 中存在name 属性，可不需要配置data
         * 会自动根据series中的name生成图例
         */
        // data:[]
      },
      grid: {
        left: '5%',
        top: '15%',
        containLabel: true,
        show: true,
        // backgroundColor: 'silver',
      },
      // 系列图表配置
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            borderRadius: [0, 5, 5, 0],
            color: ({ dataIndex }) => color[dataIndex],
          },
          // barWidth:'20%'
          label: {
            //设置柱子上的标签
            show: true,
            formatter: '{c}%', //标签 格式
            position: 'inside',
          },
          // barGap: '-100%', //不同系列柱子间的间距,百分比按柱子宽度算
          barCategoryGap: '20%', //不同系列柱子间的间距,百分比按类目间距算
        },
        {
          name: '单价',
          type: 'bar',
          data: [10, 20, 34, 30, 23, 43],
          itemStyle: {
            color: 'none',
            borderColor: 'blue',
          },
          label: {
            show: true,
            position: 'right',
          },
        },
      ],
    }

    myChart.setOption(option)

    return () => {
      // 页面关闭时 销毁实例
      myChart.dispose()
    }
  }, [])
  const title = <Button>144</Button>
  return (
    <Card title={title}>
      <div id='column' className='chartContainer'>
        column
      </div>
    </Card>
  )
}
