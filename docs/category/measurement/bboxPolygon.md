# 计算边界多边形(bboxPolygon)

> Takes a bbox and returns an equivalent polygon.
> 
> 获取一个`bbox`并返回一个等价的多边形。

**参数**

| 参数    | 类型     | 描述                                   |
| :------ | :------- | :------------------------------------- |
| bbox    | BBox     | extent in minX, minY, maxX, maxY order |
| options | (Object) | Optional parameters: see below         |

**options 选项**

| 属性       | 类型             | 默认值 | 描述                            |
| :--------- | :--------------- | :----- | :------------------------------ |
| properties | Properties       | {}     | Translate properties to Polygon |
| id         | (string\|number) | {}     | Translate Id to Polygon         |

**返回**

Feature `<Polygon>` - a Polygon representation of the bounding box

**示例**

```js
var bbox = [105.361046, 35.356724, 111.59974, 30.934089]; // 左上右下经纬度

var poly = turf.bboxPolygon(bbox);
```

npm install @turf/bbox-polygon

**基础用法**
::: demo

```vue
<template>
  <base-map>
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
    };
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
    {{ extent
    }}<select v-model="type">
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="Polygon"
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
    };
  },
  watch: {
    geometry() {
      this.init();
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
    },
  },
};
</script>
```

:::
