# 根据Feature分割线段(lineSplit)

```
> npm install @turf/line-split
```

> Split a LineString by another GeoJSON Feature.
> 接收一个线要素(LineString),一个用于裁切的任意要素,计算并返回裁切后的线要素集

**参数**

| 参数     | 类型                   | 描述               |
| :------- | :--------------------- | :----------------- |
| line     | `Feature <LineString>` | 需要裁切的线要素   |
| splitter | Feature                | 充当切分工具的要素 |

**返回**

`FeatureCollection <LineString>` - Split LineStrings

`FeatureCollection <LineString>` - 拆分后的线段集合

**示例**

```js
var line = turf.lineString([
  [120, -25],
  [145, -25]
]);
var splitter = turf.lineString([
  [130, -15],
  [130, -35]
]);

var split = turf.lineSplit(line, splitter); // 两个线要素的要素集
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSplit.e8ae4463.webp)