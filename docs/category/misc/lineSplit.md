# 根据Feature分割线段(lineSplit)

> Split a LineString by another GeoJSON Feature.
> 通过另一个GeoJSON`Feature`分割一个LineString。

**参数**

| 参数     | 类型                   | 描述                        |
| :------- | :--------------------- | :-------------------------- |
| line     | `Feature <LineString>` | LineString Feature to split |
| splitter | Feature                | Feature used to split line  |

**返回**

`FeatureCollection <LineString>` - Split LineStrings

**示例**

```js
var line = turf.lineString([[120, -25], [145, -25]]);
var splitter = turf.lineString([[130, -15], [130, -35]]);

var split = turf.lineSplit(line, splitter);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSplit.e8ae4463.webp)