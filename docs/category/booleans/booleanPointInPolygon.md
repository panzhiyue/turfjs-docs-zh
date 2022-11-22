# 判断点是否在多边形内(booleanPointInPolygon)

```
> npm install @turf/boolean-point-in-polygon
```

> Takes a Point and a Polygon or MultiPolygon and determines if the point resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
> 接收一个点要素和一个面要素，判断点要素是否在面要素内

**参数**

| 参数    | 类型                               | 描述     |
| :------ | :--------------------------------- | :------- |
| point   | Coord                              | 点要素   |
| polygon | `Feature <(Polygon|MultiPolygon)>` | 面要素   |
| options | Object                             | 可配置项 |

**options选项**

| 属性           | 类型    | 默认值 | 描述                                                         |
| :------------- | :------ | :----- | :----------------------------------------------------------- |
| ignoreBoundary | boolean | false  | 是否忽略面要素的边界，false 则点在边界上也算在边界内，true 反之 |

**返回**

boolean - 如果点位于多边形内部，则为true；如果点不在多边形内，则为false

**示例**

```js
var pt = turf.point([-72, 41]);
var poly = turf.polygon([
  [
    [-81, 41],
    [-81, 47],
    [-72, 47],
    [-72, 41],
    [-81, 41]
  ]
]);

var boolean = turf.booleanPointInPolygon(pt, poly, {
  ignoreBoundary: false
});
//= true

var boolean2 = turf.booleanPointInPolygon(pt, poly, {
  ignoreBoundary: true
});
//= false 忽略边界，点不在面要素内
```