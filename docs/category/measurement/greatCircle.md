# 计算 2 点间的弧线(greatCircle)

```
npm install @turf/great-circle
```

> Calculate great circles routes as LineString
>
> 接收两个点，计算并二者的大圆路线`Feature<LineString>`

**参数**

| 参数    | 类型                            | 描述     |
| :------ | :------------------------------ | :------- |
| start   | [Coor](../other/type.html#coor) | 起始点   |
| end     | [Coor](../other/type.html#coor) | 目标点   |
| options | Object                          | 可配置项 |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                                           |
| :--------- | :----- | :----- | :--------------------------------------------- |
| properties | Object | {}     | 输出 GeoJSON 的 properties 属性                |
| npoints    | number | 100    | 大圆弧的点的数量                               |
| offset     | number | 10     | 控制行与日期线交叉的可能性，数值越高可能性越高 |

**返回**

[Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\> - great circle line feature

[Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\> - 大圆线

**示例**

```js
var start = turf.point([-122, 48]);
var end = turf.point([-77, 39]);

var greatCircle = turf.greatCircle(start, end, { name: "Seattle to DC" });
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/greatCircle.5d38447e.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map :center="[-100, 44]" :zoom="1">
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
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-point
            :coordinates="startCoordinates"
          ></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="endCoordinates"></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature :geometry="geometry"></vue2ol-feature>
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
      startCoordinates: [-122, 48],
      endCoordinates: [-77, 39],
      geometry: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.greatCircle(
  turf.point(${JSON.stringify(this.startCoordinates)}),
  turf.point(${JSON.stringify(this.endCoordinates)})
);`;
    },
  },
  mounted() {
    this.result = turf.greatCircle(
      turf.point(this.startCoordinates),
      turf.point(this.endCoordinates)
    );

    this.geometry = new GeoJSON().readGeometry(
      JSON.stringify(this.result.geometry)
    );
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
      <a-row
        ><a-button type="primary" @click="handleStart">绘制起点</a-button>
        <a-button type="primary" @click="handleEnd">绘制终点</a-button></a-row
      >
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="startStyle">
      <vue2ol-source-vector @ready="handleReadyStartSource">
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawStart"
          @drawend="handleDrawEndStart"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector :style-obj="endStyle">
      <vue2ol-source-vector @ready="handleReadyEndSource">
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawEnd"
          @drawend="handleDrawEndEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="geometry" :geometry="geometry"></vue2ol-feature>
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
      isDrawEnd: false,
      isDrawStart: false,
      result: null,
      startStyle: null,
      endStyle: null,
      startGeometry: null,
      endGeometry: null,
      startSource: null,
      endSource: null,
      geometry: null,
      visible: true,
    };
  },
  watch: {
    startGeometry() {
      this.init();
    },
    endGeometry() {
      this.init();
    },
  },
  mounted() {
    this.startStyle = new Style({
      image: new Circle({
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        radius: 4,
      }),
      text: new Text({
        text: "起点",
        overflow: true,
        fill: new Fill({
          color: "#ffffff",
        }),
        font: "20px sans-serif",
      }),
    });
    this.endStyle = new Style({
      image: new Circle({
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        radius: 4,
      }),
      text: new Text({
        text: "终点",
        overflow: true,
        fill: new Fill({
          color: "#ffffff",
        }),
        font: "20px sans-serif",
      }),
    });
  },
  computed: {
    code() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      return `let result = turf.greatCircle(
  turf.point(${JSON.stringify(this.startGeometry.getCoordinates())}),
  turf.point(${JSON.stringify(this.endGeometry.getCoordinates())})
);`
    },
  },
  methods: {
    init() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      this.result = turf.greatCircle(
        turf.point(this.startGeometry.getCoordinates()),
        turf.point(this.endGeometry.getCoordinates())
      );

      this.geometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
    handleStart() {
      this.isDrawStart = !this.isDrawStart;
      this.isDrawEnd = false;
    },
    handleEnd() {
      this.isDrawEnd = !this.isDrawEnd;
      this.isDrawStart = false;
    },
    handleDrawEndStart(e) {
      this.startSource.clear();
      this.startGeometry = e.feature.getGeometry();
    },
    handleDrawEndEnd(e) {
      this.endSource.clear();
      this.endGeometry = e.feature.getGeometry();
    },
    handleReadyStartSource(mapObject) {
      console.log(mapObject);
      this.startSource = mapObject;
    },
    handleReadyEndSource(mapObject) {
      this.endSource = mapObject;
    },
  },
};
</script>
```

:::
