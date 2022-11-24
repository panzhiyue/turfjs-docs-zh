# 判断点是否在线上(booleanPointOnLine)

```
> npm install @turf/boolean-point-on-line
```

> Returns true if a point is on a line. Accepts a optional parameter to ignore the start and end vertices of the linestring.
>
> 接收一个点要素和一个线要素，判断点要素是否在线要素上

**参数**

| 参数    | 类型                   | 描述            |
| :------ | :--------------------- | :-------------- | --------------- | ------ |
| pt      | `Coord                 | Geometry<Point> | Feature<Point>` | 点要素 |
| line    | `Feature <LineString>` | 线要素          |
| options | Object                 | 可配置项        |

**options 选项**

| 属性              | 类型    | 默认值 | 描述                                                                |
| :---------------- | :------ | :----- | :------------------------------------------------------------------ |
| ignoreEndVertices | boolean | false  | 是否忽略线要素的起点和终点，false 则点在两点上也算在线上，true 反之 |

**返回**

boolean - true/false

**示例**

```js
var pt = turf.point([0, 0]);
var line = turf.lineString([
  [-1, -1],
  [1, 1],
  [1.5, 2.2],
]);
var isPointOnLine = turf.booleanPointOnLine(pt, line);
//=true

var pt = turf.point([-1, -1]);
var line = turf.lineString([
  [-1, -1],
  [1, 1],
  [1.5, 2.2],
]);
var isPointOnLine = turf.booleanPointOnLine(pt, line, {
  ignoreEndVertices: true,
});
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
      <a-row
        ><a-checkbox v-model="ignoreEndVertices"
          >是否忽略起点终点(ignoreEndVertices)</a-checkbox
        ></a-row
      >
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates1"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates2"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates1: [
        [119.72452640533449, 27.981138706207275],
        [119.79044437408449, 28.0978684425354],
        [119.89481449127199, 28.1857590675354],
        [120.06235599517824, 28.06765604019165],
        [120.16397953033449, 27.871275424957275],
        [119.94287967681886, 27.9715256690979],
      ],
      coordinates2: [119.72452640533449, 27.981138706207275],

      result: null,
      visible: true,
      ignoreEndVertices: false,
    };
  },
  watch: {
    ignoreEndVertices() {
      this.init();
    },
  },
  computed: {
    code() {
      return `let result = turf.booleanPointOnLine(
  turf.polygon(${JSON.stringify(this.coordinates1)}),
  turf.lineString(${JSON.stringify(
    this.coordinates2
  )}),
  {ignoreEndVertices: ${this.ignoreEndVertices}}
);`;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.result = turf.booleanPointOnLine(
        turf.point(this.coordinates2),
        turf.lineString(this.coordinates1),
        {
          ignoreEndVertices: this.ignoreEndVertices,
        }
      );
    },
  },
};
</script>
```
