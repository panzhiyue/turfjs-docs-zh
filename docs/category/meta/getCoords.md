# getCoords

> Unwrap coordinates from a Feature, Geometry Object or an Array
> 从特征、几何对象或数组中展开坐标

```text
> npm install @turf/invariant
```

**参数**

| 参数  | 类型                       | 描述                                 |
| :---- | :------------------------- | :----------------------------------- |
| coord | (Array\|Geometry\|Feature) | Feature, Geometry Object or an Array |

**返回**

Array - coordinates

**示例**

```js
var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);

var coords = turf.getCoords(poly);
//= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
```