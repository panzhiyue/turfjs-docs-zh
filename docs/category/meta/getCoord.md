# 获取单个坐标(getCoord)

```
> npm install @turf/invariant
```

> Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
>
> 接收类型为Point的GeoJSON对象，返回该要素的 coordinates 经纬度坐标
>
> 值得注意的是，如果入参是数组，只能是一维数组，否则抛出异常错误



**参数**

| 参数  | 类型                                           | 描述                                 |
| :---- | :--------------------------------------------- | :----------------------------------- |
| coord | `Coor|Geometry<Point>|Feature<Point>` |GeoJSON 或一维数组|

**返回**

Array - coordinates

**示例**

```js
var pt = turf.point([10, 10]);

var coord = turf.getCoord(pt);
//= [10, 10]

var pt2 = turf.getCoord([1, 2, 3, 4, 5]); // [1,2,3,4,5]
```