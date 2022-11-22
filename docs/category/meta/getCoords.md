# 获取多个坐标(getCoords)

```
> npm install @turf/invariant
```

> Unwrap coordinates from a Feature, Geometry Object or an Array
> 接收任意类型的 GeoJSON 或 Geometry，返回该要素的 coordinates 经纬度坐标



**参数**

| 参数  | 类型                     | 描述              |
| :---- | :----------------------- | :---------------- |
| coord | Array\|Geometry\|Feature | 任意 GeoJSON 对象 |

**返回**

Array - coordinates

**示例**

```js
var poly = turf.polygon([
  [
    [119.32, -8.7],
    [119.55, -8.69],
    [119.51, -8.54],
    [119.32, -8.7]
  ]
]);

var coords = turf.getCoords(poly);
//= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]

var coords2 = turf.getCoords({
  // 也可以是Geometry
  type: "LineString",
  coordinates: [
    [1, 2],
    [3, 4]
  ]
}); // [[1,2], [3,4]]
```