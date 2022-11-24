# 计算缓冲区(buffer)

```
npm install @turf/buffer
```

> Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
>
> 为给定半径的`Feature`计算一个缓冲区。支持的单位是英里、公里和度数。

**参数**

| 参数    | 类型                                    | 描述                       |
| :------ | :-------------------------------------- | :------------------------- |
| geojson | (FeatureCollection\|Geometry\|Feature ) | 任意类型 的 GeoJSON        |
| radius  | number                                  | 绘制缓冲区的距离(允许负值) |
| options | Object                                  | 可配置项                   |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| steps | number | 64         | 步数                                               |

**返回**

(`FeatureCollection`|`Feature <(Polygon|MultiPolygon)>`|`undefined`) - buffered features

(`FeatureCollection`|`Feature <(Polygon|MultiPolygon)>`|`undefined`) - 缓冲要素

**示例**

```js
var point = turf.point([-90.54863, 14.616599]);
var buffered = turf.buffer(point, 500, { units: "miles" });
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/buffer.7bed7069.webp)

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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>

        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="bufferCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
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
      bufferCoordinates: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let line = turf.lineString(${JSON.stringify(this.coordinates)});
let result = turf.buffer(line, 2, {
  units: "miles",
});`;
    },
  },
  mounted() {
    this.result = turf.buffer(turf.lineString(this.coordinates), 2, {
      units: "miles",
    });
    this.bufferCoordinates = this.result.geometry.coordinates;
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
      <a-row>距离：<a-input-number v-model="length" /></a-row>
      <a-row>单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row>
        <select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row><json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="bufferCoordinates">
          <vue2ol-geom-polygon
            :coordinates="bufferCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      geometry: null,
      type: "LineString",
      bufferCoordinates: null,
      length: 2,
      units: "kilometers",
      result: null,
      visible: true,
    };
  },
  watch: {
    geometry() {
      this.init();
    },
    length() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let geometry = ${new GeoJSON().writeGeometry(this.geometry)};
let result = turf.buffer(
  geometry,
  ${this.length},
  {
    units: '${this.units}'',
  }
);`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      this.result = turf.buffer(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry)),
        this.length,
        {
          units: this.units,
        }
      );
      this.bufferCoordinates = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
