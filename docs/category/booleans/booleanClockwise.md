# 判断是否是顺时针(booleanClockwise)

```
> npm install @turf/boolean-clockwise
```

> Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
>
> 接收一个 type 为 LineString 的线要素，判断该要素是否顺时针走向
>
> 注意：当为闭环时，顺时针为 true，当不为闭环时，顺时针为 false

**参数**

| 参数 | 类型                   | 描述   |
| :--- | :--------------------- | :----- |
| line | `Feature <LineString>` | 线要素 |

**返回**

boolean - true/false

**示例**

```js
var clockwiseRing = turf.lineString([
  [0, 0],
  [1, 1],
  [1, 0],
  [0, 0],
]);
var counterClockwiseRing = turf.lineString([
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 0],
]);

turf.booleanClockwise(clockwiseRing);
//=true
turf.booleanClockwise(counterClockwiseRing);
//=false
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
      <a-row> {{ result }}</a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature
          v-for="(coor, index) in coordinates"
          :style-obj="style"
          :options="{ index: index }"
        >
          <vue2ol-geom-point :coordinates="coor"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill, Text, Circle } from "ol/style";
export default {
  data() {
    return {
      coordinates: [
        [119.82697608925122, 28.20411200111616],
        [119.67655860065376, 27.864037679069753],
        [120.06895204916886, 27.71144022686944],
        [120.37414695356948, 27.927256623552736],
        [120.24552910100064, 28.193212183101853],
        [119.82697608925122, 28.20411200111616],
      ],
      style: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let value = turf.booleanClockwise(turf.lineString(${JSON.stringify(
        this.coordinates
      )}));`;
    },
  },
  mounted() {
    let value = turf.booleanClockwise(turf.lineString(this.coordinates));
    this.result = value;

    this.style = (feature) => {
      return new Style({
        text: new Text({
          text: feature.get("index") + "",
          overflow: true,
          fill: new Fill({
            color: "#ff0000",
          }),
          font: "20px sans-serif",
        }),
      });
    };
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
      <a-row><a-checkbox v-model="isClose">是否闭环</a-checkbox></a-row>
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="LineString"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector v-if="geometry">
      <vue2ol-source-vector>
        <vue2ol-feature
          v-for="(coor, index) in geometry.getCoordinates()"
          :style-obj="style"
          :options="{ index: index }"
        >
          <vue2ol-geom-point :coordinates="coor"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill, Text, Circle } from "ol/style";
export default {
  data() {
    return {
      geometry: null,
      result: null,
      visible: true,
      style: null,
      isClose: false,
    };
  },
  mounted() {
    this.style = (feature) => {
      return new Style({
        text: new Text({
          text: feature.get("index") + "",
          overflow: true,
          fill: new Fill({
            color: "#ff0000",
          }),
          font: "20px sans-serif",
        }),
      });
    };
  },
  watch: {
    geometry() {
      this.init();
    },
    isClose() {
      this.init();
    },
  },
  computed: {
    code() {},
  },
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let result = turf.booleanClockwise(
  turf.lineString(${JSON.stringify(this.geometry.getCoordinates())})
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
      let coordinates = this.geometry.getCoordinates();
      if (this.isClose) {
        coordinates.push(coordinates[0]);
      }
      let value = turf.booleanClockwise(turf.lineString(coordinates));
      this.result = value;
    },
  },
};
</script>
```

:::
