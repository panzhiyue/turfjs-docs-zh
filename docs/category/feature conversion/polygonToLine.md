# 多边形转换多段线(polygonToLine)

```
> npm install @turf/polygon-to-line
```

> Converts a Polygon to (Multi)LineString or MultiPolygon to a FeatureCollection of (Multi)LineString.
> 
> 接收`Feature<Polygon|MultiPolygon>`,转换并返回`FeatureCollection<LineString|MultiLineString>`

**参数**

| 参数    | 类型                               | 描述         |
| :------ | :--------------------------------- | :----------- |
| polygon | `Feature <(Polygon|MultiPolygon)>` | 需转换的要素 |
| options | Object                             | 可配置项     |

**options选项**

| 属性       | 类型   | 默认值 | 描述                         |
| :--------- | :----- | :----- | :--------------------------- |
| properties | Object | {}     | 输出GeoJSON的properties 属性 |

**返回**

(`FeatureCollection`|`Feature <(LineString|MultiLinestring)>`) - converted (Multi)Polygon to (Multi)LineString

(`FeatureCollection`|`Feature <(LineString|MultiLinestring)>`) - 转后的结果

**示例**

```js
var poly = turf.polygon([[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]);

var line = turf.polygonToLine(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/polygonToLine.54099e58.webp)


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
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
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
      type1: "Polygon",
      styleRed,
      turfObj1: null,
      features1: [],
      features: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.polygonToLine(${JSON.stringify(this.turfObj1)});`;
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

        this.result = turf.polygonToLine(this.turfObj1);
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