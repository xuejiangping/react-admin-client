import React,{ useRef,useEffect,useState } from 'react'
import { Card,Button } from 'antd'
import * as echarts from 'echarts'
// console.log(echarts)


export default function Column() {
  const mainRef = useRef()
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(mainRef.current)
    window.myChart = myChart
    window.onresize = () => myChart.resize()
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5,20,36,10,10,20]
        }
      ]
    })

    return () => {
      // 页面关闭时 销毁实例
      myChart.dispose()
    }
  },[])
  const title = (
    <Button>144</Button>
  )
  return (
    <Card title={title}
    >
      <div ref={mainRef}
        style={{ width: '100%',height: 500 }}
      >column</div>
    </Card>

  )
}
