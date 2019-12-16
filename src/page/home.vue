<template>
  <div class="home-container fillcontain">
    <Header></Header>
    <section class="data-collection">
      <header class="data-c-title">数据统计</header>
      <el-row>
        <el-col :span="4">
          <div class="data-list list-head list-head-day">当日数据：</div>
        </el-col>
        <el-col :span="4">
          <div class="data-list">
            <span>1</span> 新增用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data-list">
            <span>0</span> 新增订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data-list">
            <span>0</span> 新增管理员
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="data-list list-head list-head-all">总数据：</div>
        </el-col>
        <el-col :span="4">
          <div class="data-list">
            <span>321316</span>注册用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data-list">
            <span>42411</span>订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="data-list">
            <span>87684</span>管理员
          </div>
        </el-col>
      </el-row>
    </section>
    <div id="chart"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import Header from "@/components/header";
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById("chart"));
      myChart.setOption({
        title: { text: "走势图" },
        color: ["#5793f3", "#675bba", "#d14a61"],
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"]
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            // saveAsImage: {},
            dataZoom: {},
            dataView: {},
            magicType: {
              type: ["bar", "line"]
            },
            restore: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2019-12-01",
            "2019-12-02",
            "2019-12-03",
            "2019-12-04",
            "2019-12-05",
            "2019-12-06",
            "2019-12-07"
          ]
        },
        yAxis: [
          {
            type: "value",
            name: "用户",
            min: 0,
            max: 200,
            position: "left",
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "订单",
            min: 0,
            max: 200,
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "新注册用户",
            type: "line",
            data: [5, 20, 46, 50, 90, 200, 100],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max"
                },
                {
                  name: "最小值",
                  type: "min"
                }
              ]
            }
          },
          {
            name: "新增订单",
            type: "line",
            data: [10, 40, 56, 60, 80, 100, 120],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max"
                },
                {
                  name: "最小值",
                  type: "min"
                }
              ]
            }
          },
          {
            name: "新增管理员",
            type: "line",
            data: [30, 60, 90, 120, 150, 160, 180],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max"
                },
                {
                  name: "最小值",
                  type: "min"
                }
              ]
            }
          }
        ]
      });
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.home-container {
  .data-collection {
    padding: 0 20px;
    .data-c-title {
      font-size: 30px;
      text-align: center;
      margin: 26px 0 14px;
    }
    .data-list {
      height: 36px;
      line-height: 36px;
      margin-right: 20px;
      margin-bottom: 10px;
      border-radius: 6px;
      text-align: center;
      background: #e5e9f2;
      font-size: 14px;
      color: #666;
    }
    .data-list span {
      font-size: 26px;
      color: #333;
    }
    .list-head {
      font-size: 22px;
      color: #fff;
    }
    .list-head-day {
      background: #ff9800;
    }
    .list-head-all {
      background: #20a0ff;
    }
  }
  #chart {
    width: 90%;
    height: 450px;
    margin: 60px auto 0 auto;
  }
}
</style>