# 计算边界多边形(bboxPolygon)

```
> npm install @turf/bbox-polygon
```

> Takes a bbox and returns an equivalent polygon.
>
> 传入一个`bbox`并返回一个等价的`Feature<Polygon>`。

**参数**

| 参数    | 类型     | 描述                   |
| :------ | :------- | :--------------------- |
| bbox    | BBox     | [minX,minY,maxX,maxY ] |
| options | (Object) | 可配置项               |

**options 选项**

| 属性       | 类型             | 默认值 | 描述                                |
| :--------- | :--------------- | :----- | :---------------------------------- |
| properties | Properties       | {}     | 返回 GeoJSON 的 properties 属性对象 |
| id         | (string\|number) | {}     | 返回 GeoJSON 的 id                  |

**返回**

Feature `<Polygon>` - a Polygon representation of the bounding box

Feature `<Polygon>` - 表示边界框的多边形要素

**示例**

```js
var bbox = [0, 0, 10, 10];

var poly = turf.bboxPolygon(bbox);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [0, 0], [10, 0], [10, 10], [0, 10], [0, 0]
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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
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
export default {
  data() {
    return {
      geometry: null,
      visible: true,
      result: null,
    };
  },
  computed: {
    code() {
      return `let extent = [
  119.74649906158449, 27.858744144439697, 120.13926029205324,
  28.134775638580322,
];
let bboxPolygon = turf.bboxPolygon(extent);`;
    },
  },
  mounted() {
    let extent = [
      119.74649906158449, 27.858744144439697, 120.13926029205324,
      28.134775638580322,
    ];
    let bboxPolygon = turf.bboxPolygon(extent);

    this.geometry = new GeoJSON().readGeometry(
      JSON.stringify(bboxPolygon.geometry)
    );
    this.result = this.geometry;
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
        ><select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="bboxGeometry" :geometry="bboxGeometry">
        </vue2ol-feature>
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
      extent: null,
      geometry: null,
      type: "LineString",
      bboxGeometry: null,
      visible: true,
      result: null,
    };
  },
  watch: {
    geometry() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
       let extent = turf.bbox(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry))
      );
      return `let extent = ${JSON.stringify(extent)};
let bboxPolygon = turf.bboxPolygon(extent);`;
    },
  },
  mounted() {},
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      let value = turf.bbox(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry))
      );
      this.extent = value;

      let bboxPolygon = turf.bboxPolygon(this.extent);

      this.bboxGeometry = new GeoJSON().readGeometry(
        JSON.stringify(bboxPolygon.geometry)
      );
      this.result = this.bboxGeometry;
    },
  },
};
</script>
```

:::
