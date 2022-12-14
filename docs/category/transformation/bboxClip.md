# 边界裁切(bboxClip)

```
> npm install @turf/bbox-clip
```

> Takes a Feature and a bbox and clips the feature to the bbox using lineclip. May result in degenerate edges when clipping Polygons.
>
> 接收一个`Feature`和一个`bbox`，裁剪超出 bbox 的范围并返回新的要素。在裁剪多边形时可能导致退化边缘。
>
> 注意:计算结果不是很准确,例如
>
> ![image-20221201090343087](C:/Users/Admin/AppData/Roaming/Typora/typora-user-images/image-20221201090343087.png)
>
> ![image-20221201092310065](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/image-20221201092310065.png)
>
> ```javascript
> let extent = [119.77396488189699,27.771647453308105,120.16010990142824,28.22620677947998];
> let result = turf.bboxClip({"type":"MultiPolygon","coordinates":[[[[119.47705507278444,28.205113887786865],[119.43173646926881,28.12134313583374],[119.42624330520631,28.01971960067749],[119.48392152786256,27.97577428817749],[119.60202455520631,27.98401403427124],[119.56631898880006,28.111730098724365],[119.47705507278444,28.205113887786865]]],[[[119.84509706497194,28.130956172943115],[119.86432313919069,27.908483028411865],[120.22549867630006,27.92358922958374],[120.26257753372194,28.12408971786499],[120.11563539505006,28.17078161239624],[120.02362489700319,28.17352819442749],[119.84509706497194,28.130956172943115]]]]}, extent);
> //={
> 	error:"RangeError: Invalid array length"
> }
> ```

**参数**

| 入参    | 类型                                                         | 描述                   |
| ------- | ------------------------------------------------------------ | ---------------------- |
| feature | [Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\|[MultiLineString](../other/type.html#multilinestring)\|[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\> | 需要与 bbox 裁剪的要素 |
| bbox    | [bbox](../other/type.html#bbox)                              | [xmin,ymin,xmax,ymax]  |

**返回**

[Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\|[MultiLineString](../other/type.html#multilinestring)\|[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\> - 裁剪后的 feature

**示例**

```js
var bbox = [0, 0, 10, 10];
var poly = turf.polygon([
  [
    [2, 2],
    [8, 4],
    [12, 8],
    [3, 7],
    [2, 2],
  ],
]);

var clipped = turf.bboxClip(poly, bbox);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [2, 2],
        [8, 4],
        [10,6],
        [10, 7.777777777777778],
        [3, 7],
        [2, 2]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bboxClip.f58ca074.webp)

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
      <a-row>
        <bbox :value.sync="extent"></bbox>
      </a-row>
      <a-row
        ><a-space
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text></a-space
      ></a-row>
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="bboxFeatures"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      extent: [
        119.77396488189699, 27.771647453308105, 120.16010990142824,
        28.22620677947998,
      ],
      bboxGeometry: null,
      result: null,
      visible: true,
      type1: "LineString",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `let extent = ${JSON.stringify(this.extent)};
let result = turf.bboxClip(${JSON.stringify(this.turfObj1)}, extent);`;
    },
    bboxFeatures() {
      let bboxPolygon = turf.bboxPolygon(this.extent);
      return getFeaturesFromTurf(bboxPolygon);
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    extent(){
      this.init();
    }
  },
  mounted() {},
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.bboxClip(this.turfObj1, this.extent);
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
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row><json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadyDrawSource">
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="bboxGeometry" key="2" :geometry="bboxGeometry">
        </vue2ol-feature>
        <vue2ol-feature
          v-if="clipGeometry"
          key="3"
          :geometry="clipGeometry"
          :style-obj="clipStyle"
        >
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
      extent: [
        119.77396488189699, 27.771647453308105, 120.26010990142824,
        28.22620677947998,
      ],
      bboxGeometry: null,
      drawGeometry: null,
      clipGeometry: null,
      clipStyle: null,
      type: "LineString",
      source: null,
      result: null,
      visible: true,
    };
  },
  watch: {
    drawGeometry() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.drawGeometry) {
        return;
      }
      return `let polygon=${new GeoJSON().writeGeometry(this.drawGeometry)};
let extent = ${JSON.stringify(this.extent)}
let result = turf.bboxClip(polygon,extent);`;
    },
  },
  mounted() {
    this.clipStyle = new Style({
      stroke: new Stroke({
        color: "#ff0000",
        width: 2,
      }),
    });

    let bboxPolygon = turf.bboxPolygon(this.extent);

    this.bboxGeometry = new GeoJSON().readGeometry(
      JSON.stringify(bboxPolygon.geometry)
    );
  },
  methods: {
    handleDrawEnd(e) {
      this.source.clear();
      this.drawGeometry = e.feature.getGeometry();
    },
    init() {
      this.result = turf.bboxClip(
        JSON.parse(new GeoJSON().writeGeometry(this.drawGeometry)),
        this.extent
      );
      this.clipGeometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
    handleReadyDrawSource(mapObject) {
      this.source = mapObject;
    },
  },
};
</script>
```

:::
