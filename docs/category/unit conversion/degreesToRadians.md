# 角度转弧度(degreesToRadians)

```
> npm install @turf/helpers
```

> Converts an angle in degrees to radians
> 接收一个角度数值，返回弧度数值

**参数**

| 参数    | 类型   | 描述                     |
| :------ | :----- | :----------------------- |
| degrees | number | 角度，介于 0 至 360 之间 |

**返回**

number - 弧度

**示例**

```js
turf.degreesToRadians(60); // 1.0471975511965976
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
          >角度：<a-input-number v-model="origin"></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >弧度：<a-input-number :value="dest"   style="width:100%" disabled></a-input-number></a-space
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
      return `let result = turf.degreesToRadians(${this.origin});`;
    },
    dest() {
      return turf.degreesToRadians(this.origin);
    },
  },
};
</script>
```

:::
