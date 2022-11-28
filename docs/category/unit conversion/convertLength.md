# 转换长度(convertLength)

```
> npm install @turf/helpers
```

> Converts a length to the requested unit. Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
>
> 接收一个长度数值，返回其指定单位的长度数值。单位有 kilometers(千米), nauticalmiles(海里), meters(米), metres(米), centimeters(厘米), miles(英里), yards(码), feet(英尺), inches(英寸)

**参数**

| 参数         | 类型   | 描述               |
| :----------- | :----- | :----------------- |
| length       | number | 要被转换的面积数值 |
| originalUnit | string | 初始单位           |
| finalUnit    | string | 转换后的指定单位   |

**返回**

number - 转换后的长度值

**示例**

```js
turf.convertLength(1000, 'meters', 'kilometers'); // 1
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
          >要被转换的长度数值：<a-input-number
            v-model="origin"
          ></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >初始单位：<length-units
            :value.sync="originalUnit"
          ></length-units></a-space
      ></a-row>
      <a-row
        ><a-space
          >转换后的指定单位<length-units
            :value.sync="finalUnit"
          ></length-units></a-space
      ></a-row>
      <a-row
        ><a-space
          >转换后的长度值：<a-input-number
            style="width:100%"
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
      origin: 1,
      originalUnit: "kilometers",
      finalUnit: "feet",
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.convertLength(${this.origin}, '${this.originalUnit}', '${this.finalUnit}');`;
    },
    dest() {
      return turf.convertLength(this.origin, this.originalUnit, this.finalUnit);
    },
  },
};
</script>
```

:::