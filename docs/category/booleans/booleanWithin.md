# 判断是否在线内(booleanWithin)

```
> npm install @turf/boolean-within
```

> Boolean-within returns true if the first geometry is completely within the second geometry. The interiors of both geometries must intersect and, the interior and boundary of the primary (geometry a) must not intersect the exterior of the secondary (geometry b). Boolean-within returns the exact opposite result of the @turf/boolean-contains.
>
> 接收两个任意类型的要素，判断第一个要素是否包含于第二个要素，即真子集。返回的值与@turf/boolean-contains 是完全相反的结果
>
> 注意：经过测试当几何1为面，几何2位线时，计算结果不准确。例如：
>
> ```javascript
> let result = turf.booleanWithin(
>   {"type":"LineString","coordinates":[[120.0767755508423,28.10035753250122],[120.09600162506105,28.08937120437622],[120.11385440826417,28.079758167266846],[120.15230655670167,28.07838487625122]]},
>   {"type":"Polygon","coordinates":[[[119.87078189849855,28.107223987579346],[119.94905948638917,28.16352891921997],[120.16191959381105,28.18824815750122],[120.13857364654542,28.055038928985596],[120.10286808013917,27.99873399734497],[119.87764835357667,28.019333362579346],[119.87078189849855,28.107223987579346]]]}
> );
> ```

**参数**

| 参数     | 类型              | 描述         |
| :------- | :---------------- | :----------- |
| feature1 | Geometry\|Feature | 内圈 GeoJSON |
| feature2 | Geometry\|Feature | 外圈 GeoJSON |

**返回**

boolean - true/false

**示例**

```js
var line = turf.lineString([
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
]);
var point = turf.point([1, 2]);

turf.booleanWithin(point, line);
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
      coordinates2: [119.80044437408449, 28.0778684425354],

      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.booleanWithin(
  turf.point(${JSON.stringify(this.coordinates2)}),
  turf.polygon(${JSON.stringify(this.coordinates1)}),
);`;
    },
  },
  mounted() {
    this.result = turf.booleanWithin(
      turf.point(this.coordinates2),
      turf.polygon(this.coordinates1)
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
      return `let result = turf.booleanWithin(
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
      this.result = turf.booleanWithin(
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
