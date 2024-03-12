<template>
  <el-card>
    <div class="charts" ref="charts"></div>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqEverydayPlay,reqEverydayLike,reqEverydayCollect,reqEverydayCoin } from '@/api/charts';
import type { EverydayPlayResponseData,EverydayLikeResponseData,EverydayCollectResponseData,EverydayCoinResponseData } from '@/api/charts/type.ts'
let props = defineProps(['activeIndex'])
let charts = ref<any>()
let pageNum = ref<number>(1)
let pageSize = ref<number>(7)
let data = ref<any[]>([])
let xAxisData: any[] = []
let yAxisData: any[] = []
onMounted(() => {
  if (props.activeIndex == 1) {
    getEverydayPlay()
  }
})
watch(() => props.activeIndex, (newValue) => {
  if (newValue == 1) {
    getEverydayPlay()
  }
  if (newValue == 3) {
    getEverydayLike()
  }
  if (newValue == 4) {
    getEverydayCollect()
  }
  if (newValue == 5) {
    getEverydayCoin()
  }
})
const getEverydayPlay = async () => {
  let result: EverydayPlayResponseData = await reqEverydayPlay(pageNum.value, pageSize.value)
  if (result.code == 200) {
    data.value = result.data.record
    xAxisData = data.value.map((item: any) => {
      return item.date
    })
    yAxisData = data.value.map((item: any) => {
      return item.everydayPlays
    })
    var myChart = echarts.init(charts.value)
    let option = {
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yAxisData,
          type: 'line',
          lineStyle: {
            normal: {
              color: '#FF4684',
              width: 5
            }
          },
          itemStyle: {
            normal: {
              color: '#FF4684',
              borderWidth: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}
const getEverydayLike = async () => {
  let result: EverydayLikeResponseData = await reqEverydayLike(pageNum.value, pageSize.value)
  if (result.code == 200) {
    data.value = result.data.record
    xAxisData = data.value.map((item: any) => {
      return item.date
    })
    yAxisData = data.value.map((item: any) => {
      return item.everydayLikes
    })
    var myChart = echarts.init(charts.value)
    let option = {
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yAxisData,
          type: 'line',
          lineStyle: {
            normal: {
              color: '#FF4684',
              width: 5
            }
          },
          itemStyle: {
            normal: {
              color: '#FF4684',
              borderWidth: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}
const getEverydayCollect = async () => {
  let result: EverydayCollectResponseData = await reqEverydayCollect(pageNum.value, pageSize.value)
  if (result.code == 200) {
    data.value = result.data.record
    xAxisData = data.value.map((item: any) => {
      return item.date
    })
    yAxisData = data.value.map((item: any) => {
      return item.everydayCollects
    })
    var myChart = echarts.init(charts.value)
    let option = {
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yAxisData,
          type: 'line',
          lineStyle: {
            normal: {
              color: '#FF4684',
              width: 5
            }
          },
          itemStyle: {
            normal: {
              color: '#FF4684',
              borderWidth: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}
const getEverydayCoin = async () => {
  let result: EverydayCoinResponseData = await reqEverydayCoin(pageNum.value, pageSize.value)
  if (result.code == 200) {
    data.value = result.data.record
    xAxisData = data.value.map((item: any) => {
      return item.date
    })
    yAxisData = data.value.map((item: any) => {
      return item.everydayCoins
    })
    var myChart = echarts.init(charts.value)
    let option = {
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yAxisData,
          type: 'line',
          lineStyle: {
            normal: {
              color: '#FF4684',
              width: 5
            }
          },
          itemStyle: {
            normal: {
              color: '#FF4684',
              borderWidth: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
}

</script>

<style scoped lang="scss">
.charts {
  height: 300px;
}
</style>