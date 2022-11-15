# lineChunk

> Divides a LineString into chunks of a specified length. If the line is shorter than the segment length then the original line is returned.
> 将一个`LineString`分割成指定长度的块。如果`LineString`比分隔段长度短，则返回原始`LineString`。

**参数**

| 参数          | 类型                                                         | 描述                           |
| :------------ | :----------------------------------------------------------- | :----------------------------- |
| geojson       | (`FeatureCollection`\|`Geometry`\|`Feature <(LineString\|MultiLineString)>`) | the lines to split             |
| segmentLength | number                                                       | how long to make each segment  |
| options       | Object                                                       | Optional parameters: see below |

**options选项**

| 属性    | 类型    | 默认值     | 描述                                                         |
| :------ | :------ | :--------- | :----------------------------------------------------------- |
| units   | string  | kilometers | units can be degrees, radians, miles, or kilometers          |
| reverse | boolean | false      | reverses coordinates to start the first chunked segment at the end |

**返回**

`FeatureCollection <LineString>` - collection of line segments

**示例**

```js
var line = turf.lineString([[-95, 40], [-93, 45], [-85, 50]]);

var chunk = turf.lineChunk(line, 15, {units: 'miles'});
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineChunk.d6e29b81.webp)