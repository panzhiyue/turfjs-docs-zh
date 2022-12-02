# 椭圆多边形(ellipse)

```
> npm install @turf/ellipse
```

> Takes a Point and calculates the ellipse polygon given two semi-axes expressed in variable units and steps for precision.
>
> 接收中心点与 2 个半轴，计算并返回椭圆多边形。

#### 参数

| 参数      | 类型                                                       | 描述                      |
| :-------- | :--------------------------------------------------------- | :------------------------ |
| center    | [Coord](https://tools.ietf.org/html/rfc7946#section-3.1.1) | 中心点                    |
| xSemiAxis | number                                                     | 沿 x 轴的椭圆的半（长）轴 |
| ySemiAxis | number                                                     | 椭圆沿 y 轴的半（短）轴   |
| options   | Object                                                     | 可配置项                  |

#### Options

| 属性 Prop  | 类型                                                       | 默认值       | 描述                                                       |
| :--------- | :--------------------------------------------------------- | :----------- | :--------------------------------------------------------- |
| angle      | number                                                     | 0            | 旋转角度（十进制度）, 顺时针为正                           |
| pivot      | [Coord](https://tools.ietf.org/html/rfc7946#section-3.1.1) | 'origin'     | 旋转将围绕的点                                             |
| steps      | number                                                     | 64           | 平滑度，数值越高越平滑                                     |
| units      | string                                                     | 'kilometers' | 轴的长度单位，可选的有 degrees、radians、miles、kilometers |
| properties | Object                                                     | {}           | 返回 GeoJSON 的 properties 属性                            |

#### 返回

`Feature<Polygon>` - ellipse polygon

`Feature<Polygon>` - 椭圆面

示例

```javascript
var center = [-75, 40];
var xSemiAxis = 5;
var ySemiAxis = 2;
var ellipse = turf.ellipse(center, xSemiAxis, ySemiAxis);
```

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
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text></a-space
      ></a-row>
      <a-row
        >xSemiAxis：<a-input-number v-model="xSemiAxis"></a-input-number
      ></a-row>
      <a-row
        >ySemiAxis：<a-input-number v-model="ySemiAxis"></a-input-number
      ></a-row>
      <a-row>angle：<a-input-number v-model="angle"></a-input-number></a-row>
      <a-row>steps：<a-input-number v-model="steps"></a-input-number></a-row>
      <a-row><length-units :value.sync="units"></length-units></a-row>
      <a-row><json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
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
      result: null,
      visible: true,
      type1: "Point",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
      xSemiAxis: 5,
      ySemiAxis: 2,
      angle: 0,
      steps: 64,
      units: "kilometers",
    };
  },
  computed: {
    code() {
      return `let result = turf.ellipse(${JSON.stringify(this.turfObj1)}, ${
        this.xSemiAxis
      },${this.ySemiAxis} {
  angle: ${this.angle},
  steps: ${this.steps},
  units: '${this.units}',
});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    xSemiAxis() {
      this.init();
    },
    ySemiAxis() {
      this.init();
    },
    angle() {
      this.init();
    },
    steps() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.ellipse(
          this.turfObj1,
          this.xSemiAxis,
          this.ySemiAxis,
          {
            angle: this.angle,
            steps: this.steps,
            units: this.units,
          }
        );
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
    handleChange(obj) {
      this.turfObj1 = obj;
      this.features1 = getFeaturesFromTurf(this.turfObj1);
    },
  },
};
</script>
```

:::
