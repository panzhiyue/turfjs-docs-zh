# 转换区域(convertArea)

```
> npm install @turf/helpers
```

> Converts a area to the requested unit. Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
>
> 接收一个面积数值，返回其指定单位的面积数值。单位有 kilometers(千米), kilometres(千米), meters(米), metres(米), centimetres(厘米), millimeters(毫米), acres(英亩), miles(英里), yards(码), feet(英尺), inches(英寸)

**参数**

| 参数         | 类型   | 描述               |
| :----------- | :----- | :----------------- |
| area         | number | 要被转换的面积数值 |
| originalUnit | string | 初始单位           |
| finalUnit    | string | 转换后的指定单位   |

**返回**

number - 转换后的面积值

**示例**

```js
turf.convertArea(1, "kilometers", "meters"); // 1000000，面积公式Math.pow(1000, 2)
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
          >要被转换的面积数值：<a-input-number
            v-model="origin"
          ></a-input-number></a-space
      ></a-row>
      <a-row
        ><a-space
          >初始单位：<area-units
            :value.sync="originalUnit"
          ></area-units></a-space
      ></a-row>
      <a-row
        ><a-space
          >转换后的指定单位<area-units
            :value.sync="finalUnit"
          ></area-units></a-space
      ></a-row>
      <a-row
        ><a-space
          >转换后的面积值：<a-input-number
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
      finalUnit: "meters",
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.convertArea(${this.origin}, '${this.originalUnit}', '${this.finalUnit}');`;
    },
    dest() {
      return turf.convertArea(this.origin, this.originalUnit, this.finalUnit);
    },
  },
};
</script>
```

:::
