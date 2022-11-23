# 平面点(planepoint)

```
> npm install @turf/planepoint
```

> Takes a triangular plane as a Polygon and a Point within that triangle and returns the z-value at that point. The Polygon should have properties a , b , and c that define the values at its three corners. Alternatively, the z-values of each triangle point can be provided by their respective 3rd coordinate if their values are not provided as properties.
>
> 接收一个三角形平面要素(`Feature<Polygon>`)与内部一点(`Feature<Point>`),计算并返回该点的 z 值，面要素应该包含 a,b,c 三个属性值来定义它的三个角的值。或者，如果没有以属性的形式提供每个三角形点的值，则可以通过它们各自的第三坐标提供它们的 z 值。

**参数**

| 参数     | 类型                | 描述                |
| :------- | :------------------ | :------------------ |
| point    | Coord               | 需要被计算 z 值的点 |
| triangle | `Feature <Polygon>` | 三角形平面要素      |

**返回**

number - the z-value for interpolatedPoint

number - z 值数值

**示例**

```js
var point = turf.point([-75.3221, 39.529]);
// "a", "b", and "c" values represent the values of the coordinates in order.
var triangle = turf.polygon(
  [
    [
      [-75.1221, 39.57],
      [-75.58, 39.18],
      [-75.97, 39.86],
      [-75.1221, 39.57],
    ],
  ],
  {
    a: 11,
    b: 122,
    c: 44,
  }
);

var zValue = turf.planepoint(point, triangle); // 37.43364475092331
point.properties.zValue = zValue;
```

**基础用法**
::: demo

```vue
<template>
  <base-map :center="[-75.3221, 39.529]" :zoom="8">
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
        <a-space>{{ result }}</a-space>
      </a-row>
    </drawer>
    <vue2ol-layer-vector :zIndex="20" v-if="features">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      coordinate: null,
      features: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `var point = turf.point([-75.3221, 39.529]);
// "a", "b", and "c" values represent the values of the coordinates in order.
var triangle = turf.polygon(
  [
    [
      [-75.1221, 39.57],
      [-75.58, 39.18],
      [-75.97, 39.86],
      [-75.1221, 39.57],
    ],
  ],
  {
    a: 11,
    b: 122,
    c: 44,
  }
);
var zValue = turf.planepoint(point, triangle);
point.properties.zValue = zValue;`;
    },
  },
  mounted() {
    var point = turf.point([-75.3221, 39.529]);
    // "a", "b", and "c" values represent the values of the coordinates in order.
    var triangle = turf.polygon(
      [
        [
          [-75.1221, 39.57],
          [-75.58, 39.18],
          [-75.97, 39.86],
          [-75.1221, 39.57],
        ],
      ],
      {
        a: 11,
        b: 122,
        c: 44,
      }
    );
    this.result = turf.planepoint(point, triangle);
    point.properties.zValue = this.result;

    this.features = [
      new GeoJSON().readFeature(JSON.stringify(point)),
      new GeoJSON().readFeature(JSON.stringify(triangle)),
    ];
  },
  methods: {},
};
</script>
```

:::

**动态设置**
::: demo

```vue
<template>
  <base-map :zoom="1">
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
        <a-space
          ><a-button @click="handleDrawTriangle" type="primary"
            >绘制三角形({{ isDrawTriangle ? "激活" : "未激活" }})</a-button
          ><a-button @click="handleDrawPoint" type="primary"
            >内部点({{ isDrawPoint ? "激活" : "未激活" }})</a-button
          ></a-space
        >
      </a-row>
      <a-row>
        <a-space>a:<a-input v-model="a"></a-input></a-space>
      </a-row>
      <a-row>
        <a-space>b:<a-input v-model="b"></a-input></a-space>
      </a-row>
      <a-row>
        <a-space>c:<a-input v-model="c"></a-input></a-space>
      </a-row>
      <a-row>
        <a-button type="primary" @click="handleSure">确定</a-button>
      </a-row>
      <a-row>
        <a-space>{{ result }}</a-space>
      </a-row>
    </drawer>
    <vue2ol-layer-vector @ready="handleReadyTriangleLayer">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          type="Polygon"
          :active="isDrawTriangle"
          @drawend="handleDrawEndTriangle"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector @ready="handleReadyPointLayer">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawPoint"
          @drawend="handleDrawEndPoint"
        ></vue2ol-interaction-draw>
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
      isDrawTriangle: false,
      isDrawPoint: false,
      triangleLayer: null,
      pointLayer: null,
      triangleFeature: null,
      pointFeature: null,
      result: null,
      visible: true,
      a: 11,
      b: 122,
      c: 44,
    };
  },
  computed: {
    code() {
      if (!this.triangleFeature || !this.pointFeature) {
        return "";
      }
      this.triangleFeature.set("a", this.a);
      this.triangleFeature.set("b", this.b);
      this.triangleFeature.set("c", this.c);
      let format = new GeoJSON();
      return `this.result = turf.planepoint(
  ${format.writeFeature(this.pointFeature)},
  ${format.writeFeature(this.triangleFeature)}
);`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      if (!this.triangleFeature || !this.pointFeature) {
        return;
      }
      this.triangleFeature.set("a", this.a);
      this.triangleFeature.set("b", this.b);
      this.triangleFeature.set("c", this.c);
      let format = new GeoJSON();
      this.result = turf.planepoint(
        JSON.parse(format.writeFeature(this.pointFeature)),
        JSON.parse(format.writeFeature(this.triangleFeature))
      );
    },
    handleDrawTriangle() {
      this.isDrawTriangle = true;
      this.isDrawPoint = false;
    },
    handleDrawPoint() {
      this.isDrawTriangle = false;
      this.isDrawPoint = true;
    },
    handleReadyTriangleLayer(mapObject) {
      this.triangleLayer = mapObject;
    },
    handleReadyPointLayer(mapObject) {
      this.pointLayer = mapObject;
    },
    handleDrawEndTriangle(e) {
      this.triangleLayer.getSource().clear();
      this.triangleFeature = e.feature;
    },
    handleDrawEndPoint(e) {
      this.pointLayer.getSource().clear();
      this.pointFeature = e.feature;
    },
  },
};
</script>
```

:::
