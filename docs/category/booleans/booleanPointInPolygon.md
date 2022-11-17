# 判断点是否在多边形内(booleanPointInPolygon)

> Takes a Point and a Polygon or MultiPolygon and determines if the point resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
> 获取一个点和一个多边形或多个多边形，并确定该点是否位于该多边形内部。多边形可以是凸的，也可以是凹的。

```text
> npm install @turf/boolean-point-in-polygon
```

**参数**

| 参数    | 类型                               | 描述                           |
| :------ | :--------------------------------- | :----------------------------- |
| point   | Coord                              | input point                    |
| polygon | `Feature <(Polygon|MultiPolygon)>` | input polygon or multipolygon  |
| options | Object                             | Optional parameters: see below |

**options选项**

| 属性           | 类型    | 默认值 | 描述                                                         |
| :------------- | :------ | :----- | :----------------------------------------------------------- |
| ignoreBoundary | boolean | false  | True if polygon boundary should be ignored when determining if the point is inside the polygon otherwise false. |

**返回**

boolean - true if the Point is inside the Polygon; false if the Point is not inside the Polygon

**示例**

```js
var pt = turf.point([-77, 44]);
var poly = turf.polygon([[
  [-81, 41],
  [-81, 47],
  [-72, 47],
  [-72, 41],
  [-81, 41]
]]);

turf.booleanPointInPolygon(pt, poly);
//= true
```