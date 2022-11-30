# 长度转角度(lengthToDegrees)

```
> npm install @turf/helpers
```

> Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
>
> 接收一个真实单位的距离测量数值(假设是球形地球)，返回其指定单位的数值。单位有 miles(英里), nauticalmiles(海里), inches(英寸), yards(码), meters(米), metres(米), kilometers(千米), centimeters(厘米), feet(英尺)

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| distance | number | 测量数值                                                     |
| units    | string | 传入值单位。单位有 miles(英里), nauticalmiles(海里), inches(英寸), yards(码), meters(米), metres(米), kilometers(千米), centimeters(厘米), feet(英尺) |

**返回**

number - degrees

```js
turf.lengthToDegrees(6671704.814011974, 'meters'); // 60
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
          >单位：<length-units
            :value.sync="unit"
          ></length-units></a-space
      ></a-row>
      <a-row
        ><a-space
          >转换后的角度：<a-input-number
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
      unit: "kilometers",
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.lengthToDegrees(${this.origin}, '${this.unit}');`;
    },
    dest() {
      return turf.lengthToDegrees(this.origin, this.unit);
    },
  },
};
</script>
```

:::