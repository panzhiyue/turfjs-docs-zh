# 重新定义环顺序(rewind)

```
> npm install @turf/rewind
```

> Rewind (Multi)LineString or (Multi)Polygon outer ring counterclockwise and inner rings clockwise (Uses Shoelace Formula ).
>
> 接收(Multi)LineString 或(Multi)Polygon，将外环顺序修改为逆时针，内环顺序修改为顺时针(采用[Shoelace formula 公式 (opens new window)](https://blog.csdn.net/zhangll98/article/details/84150535))。

**参数**

| 参数    | 类型                                     | 描述                      |
| :------ | :--------------------------------------- | :------------------------ |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 类型为 Polygon 的 GeoJSON |
| options | Object                                   | 可配置项                  |

**options 选项**

| 属性    | 类型    | 默认值 | 描述                                           |
| :------ | :------ | :----- | :--------------------------------------------- |
| reverse | boolean | false  | 启用反向绕组，即坐标组使用 reverse 方法        |
| mutate  | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

[GeoJSON](../other/type.html#allgeojson) - rewind Polygon

[GeoJSON](../other/type.html#allgeojson) - 重绕后的 Polygon

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
/*
本来就是顺时针顺序，所以坐标顺序未发生变化
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [121, -29],
        [138, -29],
        [138, -18],
        [121, -18],
        [121, -29]
      ]
    ]
  },
  properties: {}
}
*/
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
      <a-row> <geojson-obj :value.sync="turfObj1"></geojson-obj></a-row>
      <a-row>
        <input type="radio" v-model="type" value="origin" />源
        <input type="radio" v-model="type" value="dest" />修改后</a-row
      >
      <a-row> <input type="button" value="执行" @click="handleClick" /></a-row>
      <a-row>
        <a-space><json :data="result"></json></a-space>
      </a-row>
    </drawer>

    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
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
import { getFeaturesFromTurf } from "../../utils/index.js";
import { Style, Stroke, Fill, Text, Circle } from "ol/style";
export default {
  data() {
    return {
      turfObj1: turf.polygon([
        [
          [119.82697608925122, 28.20411200111616],
          [120.24552910100064, 28.193212183101853],
          [120.37414695356948, 27.927256623552736],
          [120.06895204916886, 27.71144022686944],
          [119.67655860065376, 27.864037679069753],
          [119.82697608925122, 28.20411200111616],
        ],
      ]),
      rewindCoordinates: null,
      type: "origin",
      style:null,
      features: [],
      result: null,
      visible: true,
    };
  },
  computed: {
    features1() {
      if (this.turfObj1) {
        return getFeaturesFromTurf(this.turfObj1);
      } else {
        return [];
      }
    },
    coordinates() {
      if (this.type == "origin") {
        return this.features1[0].getGeometry().getCoordinates();
      } else {
        return this.features[0].getGeometry().getCoordinates();
      }
    },
    code() {
      return `this.result = turf.rewind(${JSON.stringify(this.turfObj1)});`;
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
    handleClick() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.rewind(this.turfObj1);
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
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
