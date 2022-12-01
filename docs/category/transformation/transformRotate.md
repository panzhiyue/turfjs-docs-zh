# 旋转(transformRotate)

```
> npm install @turf/transform-rotate
```

> Rotates any geojson Feature or Geometry of a specified angle, around its centroid or a given pivot point; all rotations follow the right-hand rule: https://en.wikipedia.org/wiki/Right-hand_rule
>
> 接收一个要素，围绕其质心或给定的轴心点旋转指定角度，并返回
>
> 所有的旋转都遵循右手规则:https://en.wikipedia.org/wiki/righthand_rule

**参数**

| 参数    | 类型    | 描述                                           |
| :------ | :------ | :--------------------------------------------- |
| geojson | GeoJSON | 需要旋转的要素                                 |
| angle   | number  | 旋转角度，与正北方向所形成的角度，正数为顺时针 |
| options | Object  | 可配置项                                       |

**options 选项**

| 属性   | 类型    | 默认值   | 描述                                                  |
| :----- | :------ | :------- | :---------------------------------------------------- |
| pivot  | Coord   | centroid | 围绕旋转的中心点                                      |
| mutate | boolean | false    | 是否返回入参的 GeoJSON。如果为 true，则可显着提高性能 |

**返回**

GeoJSON - the rotated GeoJSON feature

GeoJSON - 旋转后的要素

**示例**

```js
var poly = turf.polygon([
  [
    [0, 29],
    [3.5, 29],
    [2.5, 32],
    [0, 29],
  ],
]);
var options = { pivot: [0, 25] };
var rotatedPoly = turf.transformRotate(poly, 10, options);
/*
{
  type: "Feature",
  geometry: {
    type: "polygon",
    coordinates: [
      [
        [0.7795822621476418, 28.93923101204884],
        [4.215029062075928, 28.39787231953407],
        [3.8371754734060914, 31.512519272167843],
        [0.7795822621476418, 28.93923101204884]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformRotate.a9355690.webp)

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
        ><a-space
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text
        ></a-space>
      </a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "Polygon",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      if (!this.turfObj1) {
        return;
      }
      return `let f = ${JSON.stringify(this.turfObj1)};
let pivot = ${JSON.stringify(
        this.features1[0].getGeometry().getFirstCoordinate()
      )}
let result = turf.transformRotate(f, 60, {
  pivot: pivot,
});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
  },

  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.transformRotate(this.turfObj1, 60, {
          pivot: this.features1[0].getGeometry().getFirstCoordinate(),
        });
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
    handleChange(obj) {
      this.turfObj1 = obj;
      this.features1 = getFeaturesFromTurf(this.turfObj1);
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
        <select v-model="type">
          <option value=""></option>
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row
        ><a-button type="button" @click="handleClickPrvote"
          >pivot</a-button
        ></a-row
      >
      <a-row>angle：<a-input-number type="number" v-model="angle" /></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          v-if="type != ''"
          :active="true"
          :type="type"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="isDrawPivot"
          type="Point"
          @drawend="handleDrawEnd2"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector v-if="rotateGeometry">
        <vue2ol-feature :style-obj="style" :geometry="rotateGeometry">
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      feature1: null,
      feature2: null,
      type: "LineString",
      isDrawPivot: false,
      rotateGeometry: null,
      style: null,
      angle: 60,
      result: null,
      visible: true,
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    feature2() {
      this.init();
    },
    type() {
      if (this.type) {
        this.isDrawPivot = false;
      }
    },
    isDrawPivot() {
      if (this.isDrawPivot) {
        this.type = "";
      }
    },
    angle() {
      this.init();
    },
  },
  mounted() {
    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
  },
  computed: {
    code() {
      if (!this.feature1 || !this.feature2) {
        return;
      }
      return `let polygon = ${new GeoJSON().writeFeature(this.feature1)};
let pivot = ${JSON.stringify(this.feature2.getGeometry().getCoordinates())};
let result = turf.transformRotate(
  polygon,
  ${this.angle},
  { pivot: pivot }
);`;
    },
  },
  methods: {
    handleClickPrvote() {
      this.isDrawPivot = true;
    },
    handleDrawEnd1(e) {
      this.feature1 = e.feature;
    },
    handleDrawEnd2(e) {
      this.feature2 = e.feature;
    },
    init() {
      if (!this.feature1 || !this.feature2) {
        return;
      }

      this.result = turf.transformRotate(
        JSON.parse(new GeoJSON().writeFeature(this.feature1)),
        parseFloat(this.angle),
        { pivot: this.feature2.getGeometry().getCoordinates() }
      );
      this.rotateGeometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
  },
};
</script>
```

:::
