# 判断是否交叉(booleanCrosses)

```
> npm install @turf/boolean-crosses
```

> Boolean-Crosses returns True if the intersection results in a geometry whose dimension is one less than the maximum dimension of the two source geometries and the intersection set is interior to both source geometries.
>
> 接收2个要素，判断它们是否有相交点(相交产生的几何图形维度需要小于两个源几何图形的最大维度，并且相交集位于2个源图形的内部)。
>
> 注意：经过测试，只有在传入1个面与一条线时结果正确，不可传入点，不可传入2个面要素，2 条线就算相交返回结果可能也是 false，例如：
>
> ```javascript
> let result = turf.booleanCrosses(
>   {
>     type: "LineString",
>     coordinates: [
>       [119.9669122695923, 28.13561248779297],
>       [120.1262140274048, 28.027122497558594],
>       [120.25942325592042, 27.999656677246094],
>     ],
>   },
>   {
>     type: "LineString",
>     coordinates: [
>       [120.09737491607667, 28.11913299560547],
>       [120.02459049224855, 28.08068084716797],
>       [119.94905948638917, 28.08617401123047],
>     ],
>   }
> );
> ```

**参数**

| 参数     | 类型              | 描述    |
| :------- | :---------------- | :------ |
| feature1 | Geometry\|Feature | GeoJSON |
| feature2 | Geometry\|Feature | GeoJSON |

**返回**

boolean - true/false

**示例**

```js
var line1 = turf.lineString([
  [-2, 2],
  [4, 2],
]);
var line2 = turf.lineString([
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
]);

var cross = turf.booleanCrosses(line1, line2);
//=true
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
          <vue2ol-geom-linestring
            :coordinates="coordinates2"
          ></vue2ol-geom-linestring>
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
      coordinates2: [
        [119.9778985977173, 28.015878677368164],
        [119.94905948638917, 27.87717628479004],
      ],

      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.booleanCrosses(
      turf.polygon(${JSON.stringify(this.coordinates1)}),
      turf.lineString(${JSON.stringify(this.coordinates2)})
    );`;
    },
  },
  mounted() {
    this.result = turf.booleanCrosses(
      turf.polygon(this.coordinates1),
      turf.lineString(this.coordinates2)
    );
  },
};
</script>
```

:::

**面与他的边框线**
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
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates1"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature :style-obj="style">
          <vue2ol-geom-linestring
            :coordinates="coordinates2"
          ></vue2ol-geom-linestring>
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
      coordinates2: [
        [119.72452640533449, 27.981138706207275],
        [119.79044437408449, 28.0978684425354],
        [119.89481449127199, 28.1857590675354],
        [120.06235599517824, 28.06765604019165],
        [120.16397953033449, 27.871275424957275],
        [119.94287967681886, 27.9715256690979],
        [119.72452640533449, 27.981138706207275],
      ],

      result: null,
      visible: true,
      style: null,
    };
  },
  computed: {
    code() {
      return `let result = turf.booleanCrosses(
      turf.polygon(${JSON.stringify(this.coordinates1)}),
      turf.lineString(${JSON.stringify(this.coordinates2)})
    );`;
    },
  },
  mounted() {
    this.result = turf.booleanCrosses(
      turf.polygon(this.coordinates1),
      turf.lineString(this.coordinates2)
    );
    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#f00",
      }),
    });
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
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select>
      </a-row>
      <a-row>
        <select v-model="type2">
          <option value=""></option>
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select>
      </a-row>
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
    };
  },
  watch: {
    geometry1() {
      this.init();
    },
    geometry2() {
      this.init();
    },
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
      return `let result = turf.booleanCrosses(
  ${new GeoJSON().writeGeometry(this.geometry1)},
  ${new GeoJSON().writeGeometry(this.geometry2)}
);`;
    },
  },
  methods: {
    init() {
      if (!this.geometry1 || !this.geometry2) {
        return;
      }
      this.result = turf.booleanCrosses(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry1)),
        JSON.parse(new GeoJSON().writeGeometry(this.geometry2))
      );
      console.log(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry1)),
        JSON.parse(new GeoJSON().writeGeometry(this.geometry2))
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
