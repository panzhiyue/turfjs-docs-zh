# 方位角转为 0-360 的角度(bearingToAzimuth)

```
> npm install @turf/helpers
```

> Converts any bearing angle from the north line direction (positive clockwise) and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
> 转换从正北方向(顺时针正方向)开始的任何方位角度，并返回 0-360 度(顺时针正方向)之间的角度，0 为正北

**参数**

| 参数    | 类型   | 描述                  |
| :------ | :----- | :-------------------- |
| bearing | number | 介于 -180 至 180 之间 |

**返回**

number - 介于 0 至 360 之间的角度

**示例**

```js
turf.bearingToAzimuth(-50); // 310

turf.bearingToAzimuth(50); // 50
```

**基础用法**
::: demo

```vue
<template>
  <div style="position:relative;width:100%;height:400px; overflow: hidden;">
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
          >方位角：<a-input-number v-model="origin"></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >角度：<a-input-number :value="dest" disabled></a-input-number></a-space
      ></a-row>
      <a-row> {{ result }}</a-row>
    </drawer>
  </div>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      origin: -50,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.bearingToAzimuth(${this.origin});`;
    },
    dest() {
      return turf.bearingToAzimuth(this.origin);
    },
  },
};
</script>
```

:::
