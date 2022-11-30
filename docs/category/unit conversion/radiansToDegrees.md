# 弧度转角度(radiansToDegrees)

```
> npm install @turf/helpers
```

> Converts an angle in radians to degrees
> 接收一个弧度数值，返回其对应的角度数值

**参数**

| 参数    | 类型   | 描述       |
| :------ | :----- | :--------- |
| radians | number | 角度的弧度 |

**返回**

number - 介于 0 至 360 之间

**示例**

```js
turf.radiansToDegrees(1.0471975511965976); // 60
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
          >弧度：<a-input-number v-model="origin"></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >角度：<a-input-number :value="dest"   style="width:100%" disabled></a-input-number></a-space
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
      origin: 60,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.radiansToDegrees(${this.origin});`;
    },
    dest() {
      return turf.radiansToDegrees(this.origin);
    },
  },
};
</script>
```

:::
