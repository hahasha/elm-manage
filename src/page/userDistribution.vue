<template>
  <div class="fillContain">
    <Header></Header>
    <div class="chart-container">
      <div id="chart" style="width: 100%; height: 450px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import Header from "@/components/header";
export default {
  mounted() {
    this.myChart = echarts.init(document.getElementById("chart"));
    this.drawLine();
  },
  methods: {
    drawLine() {
      const option = {
        title: {
          text: "用户分布",
          x: 'center'
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "上海", "广州", "深圳", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 400, name: "北京" },
              { value: 250, name: "上海" },
              { value: 200, name: "广州" },
              { value: 100, name: "深圳" },
              { value: 900, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.chart-container {
  padding: 25px 85px;
  box-sizing: border-box;
  width: 100%;
  height: 450px;
}
</style>