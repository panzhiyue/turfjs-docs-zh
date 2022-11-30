# WGS84 转墨卡托(toMercator)

```
> npm install @turf/projection
```

> Converts a WGS84 GeoJSON object into Mercator (EPSG:900913) projection
> 接收 WGS84 坐标系 的 GeoJSON 对象，转换为墨卡托(EPSG:900913，等效 EPSG:3857)坐标投影

**参数**

| 参数    | 类型                                                         | 描述                  |
| :------ | :----------------------------------------------------------- | :-------------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson)\|[Position](../other/type.html#position) | WGS-84 坐标系 GeoJSON |
| options | Object                                                       | 可配置项              |

**options 选项**

| 属性   | 类型    | 默认值 | 描述                                           |
| :----- | :------ | :----- | :--------------------------------------------- |
| mutate | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

[GeoJSON](../other/type.html#allgeojson) - 投影后的 GeoJSON

**示例**

```js
var pt = turf.point([-71, 41]);
var converted = turf.toMercator(pt);
/*
{
  type: "FeatureCollection",
  geometry: {
    type: "Point"
    coordinates: [-7903683.846322424, 5012341.663847514]
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
        ><a-space>WGS84：<position :value.sync="origin"></position></a-space
      ></a-row>
      <a-row
        ><a-space>墨卡托：<position :value="dest" disabled></position></a-space
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
      origin: [-71, 41],
      unit: "kilometers",
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.toMercator(${this.origin});`;
    },
    dest() {
      return turf.toMercator(this.origin);
    },
  },
};
</script>
```

:::
