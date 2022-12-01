# 坐标小数点处理(truncate)

```
> npm install @turf/truncate
```

> Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
>
> 接收 GeoJSON，返回四舍五入后的 GeoJSON。

**参数**

| 参数    | 类型                                     | 描述              |
| :------ | :--------------------------------------- | :---------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 任意 GeoJSON 对象 |
| options | Object                                   | 可配置项          |

**options 选项**

| 属性        | 类型    | 默认值 | 描述                                           |
| :---------- | :------ | :----- | :--------------------------------------------- |
| precision   | number  | 6      | 坐标的小数点精确位数                           |
| coordinates | number  | 3      | 最大坐标数(主要用于删除 z 坐标)                |
| mutate      | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

[GeoJSON](../other/type.html#allgeojson) - layer with truncated geometry

[GeoJSON](../other/type.html#allgeojson) - 四舍五入后的 GeoJSON

**示例**

```js
var point = turf.point([70.46923055566859, 58.11088890802906]);
var options = { precision: 3, coordinates: 2 };
var truncated = turf.truncate(point, options);
//=truncated.geometry.coordinates => [70.469, 58.111]
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
        >几何(geojson): <geojson-obj :value.sync="turfObj1"></geojson-obj
      ></a-row>
      <a-row
        >小数位数(precision):<a-input-number
          v-model="precision"
        ></a-input-number
      ></a-row>
      <a-row
        >最大坐标数(coordinates):<a-input-number
          v-model="coordinates"
        ></a-input-number
      ></a-row>
      <a-row> <input type="button" value="执行" @click="handleClick" /></a-row>
      <a-row>
        <a-space><json :data="result"></json></a-space>
      </a-row>
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
      turfObj1: turf.polygon([
        [
          [119.82697608925122, 28.20411200111616],
          [120.24552910100064, 28.193212183101853],
          [120.37414695356948, 27.927256623552736],
          [120.06895204916886, 27.71144022686944],
          [119.67655860065376, 27.864037679069753],
          [119.82697608925122, 28.20411200111616],
        ],
      ]),
      rewindCoordinates: null,
      type: "origin",
      features: [],
      result: null,
      visible: true,
      precision: 2,
      coordinates: 2,
      styleRed,
    };
  },
  computed: {
    features1() {
      if (this.turfObj1) {
        return getFeaturesFromTurf(this.turfObj1);
      } else {
        return [];
      }
    },
    code() {
      return `this.result = turf.truncate(${JSON.stringify(this.turfObj1)},
{
    precision:${this.precision},
    coordinates:${this.coordinates}
});`;
    },
  },
  mounted() {
  },
  methods: {
    handleClick() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.truncate(this.turfObj1, {
          precision: this.precision,
          coordinates: this.coordinates,
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
