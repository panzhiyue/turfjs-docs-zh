# 计算最短路径(shortestPath)

```
> npm install @turf/shortest-path
```

> Returns the shortest path from start to end without colliding with any Feature in obstacles
>
> 接收两个点，返回这两个点的最短距离路径，且不与传入的障碍物碰撞

**参数**

| 参数    | 类型                    | 描述     |
| :------ | :---------------------- | :------- |
| start   | Coord\|`Feature<Point>` | 起点     |
| end     | Coord\|`Feature<Point>` | 重点     |
| options | Object                  | 可配置项 |

**options 选项**

| 属性        | 类型      | 默认值     | 描述                                               |
| :---------- | :-------- | :--------- | :------------------------------------------------- | --------- | ------------------ |
| obstacles   | `Geometry | Feature    | FeatureCollection<Polygon>`                        | `Feature` | 路径无法通过的区域 |
| minDistance | (number)  |            | 路径与障碍物之间的最小距离(v5.1.6 暂不支持)        |
| units       | string    | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| resolution  | number    | 100        | 路径与障碍物之间的可以容忍的阈值距离               |

**返回**

`Feature <LineString>` - shortest path between start and end

`Feature <LineString>` - 最短路线线段

**示例**

```js
var start = [-5, -6];
var end = [9, -6];
var options = {
  obstacles: turf.polygon([
    [
      [0, -7],
      [5, -7],
      [5, -3],
      [0, -3],
      [0, -7],
    ],
  ]),
};

var path = turf.shortestPath(start, end, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/shortestPath.e64f233c.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <a-button
      type="primary"
      @click="
        () => {
          visible = true;
        }
      "
      >打开</a-button
    >
    <drawer :visible.sync="visible" :code="code">
      <a-row
        ><a-space
          >障碍物：<geojson-obj :value.sync="turfObj1"></geojson-obj
        ></a-space>
      </a-row>
      <a-row
        ><a-space
          >点1：<geojson-obj :value.sync="turfObj2"></geojson-obj
        ></a-space>
      </a-row>
      <a-row
        ><a-space
          >点2：<geojson-obj :value.sync="turfObj3"></geojson-obj
        ></a-space>
      </a-row>

      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector key="1">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector key="2" :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
export default {
  data() {
    return {
      features: [],
      result: null,
      visible: true,
      styleRed,
      turfObj1: turf.polygon([
        [
          [119.7307062149048, 28.1473069190979],
          [119.68401432037355, 27.9880051612854],
          [119.94219303131105, 27.934446811676025],
          [120.1646661758423, 27.948179721832275],
          [120.13033390045167, 28.10610818862915],
          [119.7307062149048, 28.1473069190979],
        ],
      ]),
      turfObj2: turf.point([119.68401432037355, 28.1880051612854]),
      turfObj3: turf.point([120.1646661758423, 27.848179721832275]),
    };
  },
  computed: {
    code() {
      return `let result = turf.shortestPath(${JSON.stringify(
        this.turfObj2
      )},${JSON.stringify(this.turfObj3)},
{
  obstacles:${JSON.stringify(this.turfObj1)},
  minDistance:0,
  units:'kilometers'
});`;
    },
    features1() {
      return getFeaturesFromTurf(this.turfObj1)
        .concat(getFeaturesFromTurf(this.turfObj2))
        .concat(getFeaturesFromTurf(this.turfObj3));
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    turfObj2() {
      this.init();
    },
    turfObj3() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1 || !this.turfObj2 || !this.turfObj3) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.shortestPath(this.turfObj2, this.turfObj3, {
          obstacles: this.turfObj1,
          minDistance: 0,
          units: "kilometers",
        });

        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
};
</script>
```

:::

**动态绘制**
::: demo

```vue
<template>
  <base-map>
    <a-button
      type="primary"
      @click="
        () => {
          visible = true;
        }
      "
      >打开</a-button
    >
    <drawer :visible.sync="visible" :code="code">
      <a-row>
        障碍物:<draw :type.sync="type1" @draw-end="handleDrawEnd1"></draw>
      </a-row>
      <a-row>
        点1:<draw :type.sync="type2" @draw-end="handleDrawEnd2"></draw>
      </a-row>
      <a-row>
        点2:<draw :type.sync="type3" @draw-end="handleDrawEnd3"></draw>
      </a-row>
      <a-row
        >路径与障碍物之间的最小距离：<a-input-number
          v-model="minDistance"
        ></a-input-number
      ></a-row>
      <a-row>单位:<length-units :value.sync="units"></length-units></a-row>
      <a-row
        >阈值距离(resolution)：<a-input-number
          v-model="resolution"
        ></a-input-number
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="styleRed" key="2">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
export default {
  data() {
    return {
      type1: "",
      type2: "",
      type3: "",
      features: [],
      feature1: null,
      feature2: null,
      feature3: null,

      result: null,
      visible: true,
      styleRed,
      minDistance: 0,
      units: "kilometers",
      resolution: 0.1,
    };
  },
  mounted() {},
  watch: {
    feature1() {
      this.init();
    },
    feature2() {
      this.init();
    },
    feature3() {
      this.init();
    },
    minDistance() {
      this.init();
    },
    units() {
      this.init();
    },
    resolution() {
      this.init();
    },
    type1() {
      if (this.type1) {
        this.type2 = "";
        this.type3 = "";
      }
    },
    type2() {
      if (this.type2) {
        this.type1 = "";
        this.type3 = "";
      }
    },
    type3() {
      if (this.type3) {
        this.type1 = "";
        this.type2 = "";
      }
    },
  },
  computed: {
    code() {
      if (!this.turfObj1 || !this.turfObj2 || !this.turfObj3) {
        return;
      }
      return `let result = turf.shortestPath(${JSON.stringify(
        this.turfObj2
      )},${JSON.stringify(this.turfObj3)},
{
  obstacles:${JSON.stringify(this.turfObj1)},
  minDistance:${this.minDistance},
  units:'${this.units}',
  resolution:${this.resolution}
});`;
    },
    turfObj1() {
      if (this.feature1) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature1));
      }
    },
    turfObj2() {
      if (this.feature2) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature2));
      }
    },
    turfObj3() {
      if (this.feature3) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature3));
      }
    },
  },
  methods: {
    handleDrawEnd1(feature) {
      this.feature1 = feature;
    },
    handleDrawEnd2(feature) {
      this.feature2 = feature;
    },
    handleDrawEnd3(feature) {
      this.feature3 = feature;
    },
    init() {
      if (!this.turfObj1 || !this.turfObj2 || !this.turfObj3) {
        return;
      }

      try {
        this.features = [];
        this.result = null;
        console.log(this.turfObj2, this.turfObj3, {
          obstacles: this.turfObj1,
          minDistance: this.minDistance,
          units: this.units,
          resolution: this.resolution,
        });
        this.result = turf.shortestPath(this.turfObj2, this.turfObj3, {
          obstacles: this.turfObj1,
          minDistance: this.minDistance,
          units: this.units,
          resolution: this.resolution,
        });

        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
};
</script>
```

:::
