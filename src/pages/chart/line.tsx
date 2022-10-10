import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export default function Line() {
  useEffect(() => {
    const mychart = echarts.init(document.getElementById('line') as HTMLElement)
    const option: EChartsOption = {
      title: { text: '没有标题' },
      legend: {},
      tooltip: {
        show: true,
        trigger: 'axis'
      },

      xAxis: {
        type: 'category',
        data: Array(12).fill(1).map((_, i) => i + 1 + '月'),
      },
      yAxis: {
      },
      // axisPointer: {
      //   show: true
      // },
      series: [
        {
          name: '湿度',
          smooth: true,
          type: 'line',
          showSymbol: false,
          symbol: 'circle',  //设置折线拐点
          symbolSize: 8,
          itemStyle: { //设置折线拐点 样式
            borderColor: '#000c1933',
            borderWidth: 10
          },
          areaStyle: {},
          data: Array(12).fill(1).map(() => Math.random() * 30)
        },
        {
          name: '温度',
          smooth: true,
          type: 'line',
          areaStyle: {  //设置填充
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'red' },
              { offset: 0.5, color: '#eee' },
              { offset: 0.7, color: 'blue' },
              { offset: 1, color: 'orange' }

            ]),
          },
          data: Array(12).fill(1).map(() => Math.random() * 40)
        },
      ],
    }
    mychart.setOption(option)
  }, [])
  return <div id='line' className='chartContainer'>Line</div>
}
