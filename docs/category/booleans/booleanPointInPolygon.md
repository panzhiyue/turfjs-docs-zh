# 判断点是否在多边形内(booleanPointInPolygon)

```
> npm install @turf/boolean-point-in-polygon
```

> Takes a Point and a Polygon or MultiPolygon and determines if the point resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
>
> 接收一个点要素和一个面要素，判断点要素是否在面要素内

**参数**

| 参数    | 类型               | 描述            |
| :------ | :----------------- | :-------------- | ------ |
| point   | Coord              | 点要素          |
| polygon | `Feature <(Polygon | MultiPolygon)>` | 面要素 |
| options | Object             | 可配置项        |

**options 选项**

| 属性           | 类型    | 默认值 | 描述                                                            |
| :------------- | :------ | :----- | :-------------------------------------------------------------- |
| ignoreBoundary | boolean | false  | 是否忽略面要素的边界，false 则点在边界上也算在边界内，true 反之 |

**返回**

boolean - 如果点位于多边形内部，则为 true；如果点不在多边形内，则为 false

**示例**

```js
var pt = turf.point([-72, 41]);
var poly = turf.polygon([
  [
    [-81, 41],
    [-81, 47],
    [-72, 47],
    [-72, 41],
    [-81, 41],
  ],
]);

var boolean = turf.booleanPointInPolygon(pt, poly, {
  ignoreBoundary: false,
});
//= true

var boolean2 = turf.booleanPointInPolygon(pt, poly, {
  ignoreBoundary: true,
});
//= false 忽略边界，点不在面要素内
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
        ><a-checkbox v-model="ignoreBoundary"
          >是否忽略边界(ignoreBoundary)</a-checkbox
        ></a-row
      >
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates1"
          ></vue2ol-geom-polygon>
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
        [
          [119.72452640533449, 27.981138706207275],
          [119.79044437408449, 28.0978684425354],
          [119.89481449127199, 28.1857590675354],
          [120.06235599517824, 28.06765604019165],
          [120.16397953033449, 27.871275424957275],
          [119.94287967681886, 27.9715256690979],
          [119.72452640533449, 27.981138706207275],
        ],
      ],
      coordinates2: [120.06235599517824, 28.06765604019165],

      result: null,
      visible: true,
      ignoreBoundary: false,
    };
  },
  watch: {
    ignoreBoundary() {
      this.init();
    },
  },
  computed: {
    code() {
      return `let result = turf.booleanPointInPolygon(
      turf.polygon(${JSON.stringify(this.coordinates1)}),
      turf.point(${JSON.stringify(this.coordinates2)})
    );`;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.result = turf.booleanPointInPolygon(
        turf.point(this.coordinates2),
        turf.polygon(this.coordinates1),
        {
          ignoreBoundary: this.ignoreBoundary,
        }
      );
    },
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
      <a-row>
        <select v-model="type1">
          <option value=""></option>
          <option value="Point">点</option>
        </select>
      </a-row>
      <a-row>
        <select v-model="type2">
          <option value=""></option>
          <option value="Polygon">面</option>
        </select>
      </a-row>
      <a-row
        ><a-checkbox v-model="ignoreBoundary"
          >是否忽略边界(ignoreBoundary)</a-checkbox
        ></a-row
      >
      <a-row><a-button type="primary" @click="btnSure">确定</a-button></a-row>
      <a-row> {{ result }}</a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource1">
        <vue2ol-interaction-draw
          v-if="type1"
          :active="true"
          :type="type1"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource2">
        <vue2ol-interaction-draw
          v-if="type2"
          :active="true"
          :type="type2"
          @drawend="handleDrawEnd2"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Text, Circle, Fill } from "ol/style";
export default {
  data() {
    return {
      geometry1: null,
      geometry2: null,
      source1: null,
      source2: null,
      result: null,
      visible: true,
      type1: "",
      type2: "",
      ignoreBoundary: false,
    };
  },
  watch: {
    type1() {
      if (this.type1) {
        this.type2 = "";
      }
    },
    type2() {
      if (this.type2) {
        this.type1 = "";
      }
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.geometry1 || !this.geometry2) {
        return;
      }
      return `let point = ${new GeoJSON().writeGeometry(this.geometry1)};
let polygon = ${new GeoJSON().writeGeometry(this.geometry2)};
let result = turf.booleanPointInPolygon(point,polygon,{ignoreBoundary: ${this.ignoreBoundary}});`;
    },
  },
  methods: {
    btnSure() {
      this.init();
    },
    init() {
      if (!this.geometry1 || !this.geometry2) {
        return;
      }
      this.result = turf.booleanPointInPolygon(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry1)),
        JSON.parse(new GeoJSON().writeGeometry(this.geometry2)),
        {
          ignoreBoundary: this.ignoreBoundary,
        }
      );
    },
    handleDrawEnd1(e) {
      this.source1.clear();
      this.geometry1 = e.feature.getGeometry();
    },
    handleDrawEnd2(e) {
      this.source2.clear();
      this.geometry2 = e.feature.getGeometry();
    },
    handleReadySource1(mapObject) {
      this.source1 = mapObject;
    },
    handleReadySource2(mapObject) {
      this.source2 = mapObject;
    },
  },
};
</script>
```

:::
