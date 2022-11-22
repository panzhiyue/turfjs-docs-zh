# 分割多线段(lineChunk)

```
> npm install @turf/link-chunk
```

> Divides a LineString into chunks of a specified length. If the line is shorter than the segment length then the original line is returned.
> 将一个`LineString`分割成指定长度的线段。如果`LineString`比分隔段长度短，则返回原始`LineString`。

**参数**

| 参数          | 类型                                                         | 描述           |
| :------------ | :----------------------------------------------------------- | :------------- |
| geojson       | (`FeatureCollection`\|`Geometry`\|`Feature <(LineString\|MultiLineString)>`) | 要切分的线要素 |
| segmentLength | number                                                       | 每段线段的长度 |
| options       | Object                                                       | 可配置项       |

**options选项**

| 属性    | 类型    | 默认值     | 描述                                               |
| :------ | :------ | :--------- | :------------------------------------------------- |
| units   | string  | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| reverse | boolean | false      | 反转坐标以在末尾开始第一个分块段                   |

**返回**

`FeatureCollection <LineString>` - collection of line segments

`FeatureCollection <LineString>` - 线段的集合

**示例**

```js
var line = turf.lineString([
  [-95, 40],
  [-93, 45],
  [-85, 50]
]);

var chunk = turf.lineChunk(line, 15, { units: "miles" }); // 间隔15英里切分一段线段
```
