import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
export default function Pie() {
  useEffect(() => {
    const mainDom = document.getElementById('pie') as HTMLElement
    const myChart = echarts.init(mainDom)
    window.onresize = () => myChart.resize()
    const option: EChartsOption = {
      title: {
        text: '饼啊饼',
        textAlign: 'center',
        left: '50%',
        top: 15
      },
      tooltip: { show: true, trigger: 'item' },
      legend: {

        bottom: '5%'
      },

      series: [
        {
          name: '饼啊饼',
          data: Array(5).fill(1).map((_, i) => ({ value: i + 1, name: i + 1 + '个饼' })),
          type: 'pie',
          radius: [20, 140],   // 设置 饼图内半径和外半径
          label: {
          },
          roseType: 'radius'
          // labelLine: { show: false }  // 标签和对应扇形的线
        }
      ]

    }
    myChart.setOption(option)

  }, [])
  return (
    <div id='pie' className='chartContainer'>Pie</div>
  )
}
