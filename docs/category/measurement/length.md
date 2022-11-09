# 计算多段线长度(length)

> Takes a GeoJSON and measures its length in the specified units, (Multi)Point 's distance are ignored.
>
> 取一个 GeoJSON 并以指定的单位测量其长度，(Multi)Point 的距离被忽略。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | GeoJSON to measure             |
| options | Object  | Optional parameters: see below |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                          |
| :---- | :----- | :--------- | :-------------------------------------------- |
| units | string | kilometers | can be degrees, radians, miles, or kilometers |

**返回**

number - length of GeoJSON

**示例**

```js
var line = turf.lineString([
  [115, -32],
  [131, -22],
  [143, -25],
  [150, -34],
]);
var length = turf.length(line, { units: "miles" });
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/length.c8974652.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    {{ value }}
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      value: null,
    };
  },
  mounted() {
    let options = { units: "miles" };

    this.value = turf.length(turf.lineString(this.coordinates), 10, options);
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
    单位：<length-units :value.sync="units"></length-units>
    {{ value }}
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="LineString"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      geometry: null,
      units: "kilometers",
      value: null,
    };
  },
  mounted() {},
  watch: {
    geometry() {
      this.initMarker();
    },
    units() {
      this.initMarker();
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    initMarker() {
      if (!this.geometry) {
        return;
      }
      let options = { units: this.units };
      this.value = turf.length(
        turf.lineString(this.geometry.getCoordinates()),
        options
      );
    },
  },
};
</script>
```

:::
