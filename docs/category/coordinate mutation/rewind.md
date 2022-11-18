# 重新定义环顺序(rewind)

> Rewind (Multi)LineString or (Multi)Polygon outer ring counterclockwise and inner rings clockwise (Uses Shoelace Formula ).
>
> `LineString`或`Polygon`外圈逆时针`Rewind`，内圈顺时针`Rewind`(采用[Shoelace formula 公式 (opens new window)](https://blog.csdn.net/zhangll98/article/details/84150535))。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | input GeoJSON Polygon          |
| options | Object  | Optional parameters: see below |

**options 选项**

| 属性    | 类型    | 默认值 | 描述                                                                          |
| :------ | :------ | :----- | :---------------------------------------------------------------------------- |
| reverse | boolean | false  | enable reverse winding                                                        |
| mutate  | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - rewind Polygon

**示例**

```js
var polygon = turf.polygon([
  [
    [121, -29],
    [138, -29],
    [138, -18],
    [121, -18],
    [121, -29],
  ],
]);

var rewind = turf.rewind(polygon);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/rewind.91a2c211.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map v-if="rewindCoordinates">
    <input type="radio" v-model="type" value="origin" />源
    <input type="radio" v-model="type" value="dest" />修改后
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon :coordinates="coordinates"></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature
          v-for="(coor, index) in coordinates[0]"
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
      coordinates1: [
        [
          [119.82697608925122, 28.20411200111616],
          [120.24552910100064, 28.193212183101853],
          [120.37414695356948, 27.927256623552736],
          [120.06895204916886, 27.71144022686944],
          [119.67655860065376, 27.864037679069753],
          [119.82697608925122, 28.20411200111616],
        ],
      ],
      rewindCoordinates: null,
      type: "origin",
      style: null,
    };
  },
  computed: {
    coordinates() {
      if (this.type == "origin") {
        return this.coordinates1;
      } else {
        return this.rewindCoordinates;
      }
    },
  },
  mounted() {
    this.rewindCoordinates = turf.rewind(
      turf.polygon(this.coordinates1)
    ).geometry.coordinates;

    console.log(this.coordinates);

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
  methods: {},
};
</script>
```

:::

**动态绘制**
::: demo

```vue
<template>
  <base-map>
    <input type="radio" v-model="type" value="origin" />源
    <input type="radio" v-model="type" value="dest" />修改后
    <vue2ol-layer-vector
      :visible="type == 'origin'"
      @ready="handleReadyDrawLayer"
    >
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="Polygon"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector v-if="type == 'dest'">
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="rewindCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector v-if="coordinates">
      <vue2ol-source-vector>
        <vue2ol-feature
          v-for="(coor, index) in coordinates[0]"
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
      coordinates1: null,
      rewindCoordinates: null,
      type: "origin",
      style: null,
      drawLayer: null,
    };
  },
  computed: {
    coordinates() {
      if (this.type == "origin") {
        return this.coordinates1;
      } else {
        return this.rewindCoordinates;
      }
    },
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
  methods: {
    handleDrawEnd(e) {
      this.drawLayer.getSource().clear();
      this.coordinates1 = e.feature.getGeometry().getCoordinates();

      this.rewindCoordinates = turf.rewind(
        turf.polygon(this.coordinates1)
      ).geometry.coordinates;
    },
    handleReadyDrawLayer(mapObject) {
      this.drawLayer = mapObject;
    },
  },
};
</script>
```

:::
