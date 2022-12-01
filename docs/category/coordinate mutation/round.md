# 四舍五入(round)

```
npm install @turf/helpers
```

> Round number to precision
>
> 接收入参的数字和精确度数，返回四舍五入后的数字

**参数**

| 参数      | 类型   | 描述                               |
| :-------- | :----- | :--------------------------------- |
| num       | number | 需要四舍五入的数字                 |
| precision | number | 坐标的小数点精确位数，不传则不保留 |

**返回**

number - rounded number

number - 四舍五入后的数值

**示例**

```js
turf.round(120.4321);
//=120

turf.round(120.4321, 2);
//=120.43
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
          >输入(num)：<a-input-number v-model="origin"></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >小数位数(precision)：<a-input-number
            v-model="precision"
          ></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >输出：<a-input-number
            :value="dest"
            disabled
          ></a-input-number></a-space
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
      origin: -120.4321,
      result: null,
      visible: true,
      precision: 2,
    };
  },
  computed: {
    code() {
      return `let result = turf.round(${this.origin},${this.precision});`;
    },
    dest() {
      return turf.round(this.origin, this.precision);
    },
  },
};
</script>
```

:::
