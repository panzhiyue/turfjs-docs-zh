# getCoord

> Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
> 从点特征、几何图形或单个坐标展开坐标。

```text
> npm install @turf/invariant
```

**参数**

| 参数  | 类型                                           | 描述                                 |
| :---- | :--------------------------------------------- | :----------------------------------- |
| coord | (`Array`|`Geometry <Point>`|`Feature <Point>`) | GeoJSON Point or an Array of numbers |

**返回**

Array - coordinates

**示例**

```js
var pt = turf.point([10, 10]);

var coord = turf.getCoord(pt);
//= [10, 10]
```