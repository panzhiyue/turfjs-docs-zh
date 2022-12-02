# 多段线转换为多边形(lineToPolygon)

```
> npm install @turf/line-to-polygon
```

> Converts (Multi)LineString(s) to Polygon(s).
> 将`(Multi)LineString`转换为`(Multi)Polygon`。

> 值得注意的是，入参只能接收线要素，否则报错

**参数**

| 参数    | 类型                                   | 描述               |
| :------ | :------------------------------------- | :----------------- | -------------- |
| line    | `FeatureCollectionFeature <(LineString | MultiLineString)>` | 需转换的线要素 |
| options | Object                                 | 可配置项           |

**options 选项**

| 属性         | 类型    | 默认值 | 描述                            |
| :----------- | :------ | :----- | :------------------------------ |
| properties   | Object  | {}     | 输出 GeoJSON 的 properties 属性 |
| autoComplete | boolean | true   | 匹配首尾坐标来自动完成面的规则  |
| orderCoords  | boolean | true   | 外圈的线优先放置在坐标组的前面  |

**返回**

`Feature <(Polygon|MultiPolygon)>` - converted to Polygons

`Feature <(Polygon|MultiPolygon)>` - 转换后的多边形

**示例**

```js
var line = turf.lineString([
  [125, -30],
  [145, -30],
  [145, -20],
  [125, -20],
  [125, -30],
]);

var polygon = turf.lineToPolygon(line); // type 为 Polygon 的面要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineToPolygon.97eb8b3f.webp)

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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getTestOL, getTestTurf, getTestFeatures } from "../../utils/index.js";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "LineString",
      styleRed,
      turfObj1: null,
      features1: [],
      features: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.lineToPolygon(${JSON.stringify(
        this.turfObj1
      )});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.result = null;
        this.features = [];

        this.result = turf.lineToPolygon(this.turfObj1);
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
