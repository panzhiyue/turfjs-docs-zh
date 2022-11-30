# 墨卡托转WGS84(toWgs84)

```
> npm install @turf/projection
```

> Converts a Mercator (EPSG:900913) GeoJSON object into WGS84 projection
>
> 接收 墨卡托(EPSG:900913，等效 EPSG:3857)坐标系 的 GeoJSON 对象，转换为 WGS84 坐标投影

**参数**

| 参数    | 类型                                                         | 描述                     |
| :------ | :----------------------------------------------------------- | :----------------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson)\|[Position](../other/type.html#position) | EPSG:3857 坐标系 GeoJSON |
| options | Object                                                       | 可配置项                 |

**options选项**

| 属性   | 类型    | 默认值 | 描述                                           |
| :----- | :------ | :----- | :--------------------------------------------- |
| mutate | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

[GeoJSON](../other/type.html#allgeojson) - 投影后的GeoJSON

**示例**

```js
var pt = turf.point([-7903683.846322424, 5012341.663847514]);
var converted = turf.toWgs84(pt);
/*
{
  type: "FeatureCollection",
  geometry: {
    type: "Point"
    coordinates: [-71, 41]
  },
  properties: {}
}
*/
```


**基础用法**
::: demo

```vue
<template>
  <div style="position:relative;width:100%;height:400px; overflow: hidden;">
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
        ><a-space>墨卡托：<position :value.sync="origin"></position></a-space
      ></a-row>
      <a-row
        ><a-space>WGS84：<position :value="dest" disabled></position></a-space
      ></a-row>
    </drawer>
  </div>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      origin: [-7903683.846322424, 5012341.663847514],
      unit: "kilometers",
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.toWgs84(${this.origin});`;
    },
    dest() {
      return turf.toWgs84(this.origin);
    },
  },
};
</script>
```

:::
