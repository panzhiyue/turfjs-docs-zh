# 判断点是否在线上(booleanPointOnLine)

```
> npm install @turf/boolean-point-on-line
```

> Returns true if a point is on a line. Accepts a optional parameter to ignore the start and end vertices of the linestring.
>
> 接收一个点要素和一个线要素，判断点要素是否在线要素上

**参数**

| 参数    | 类型                                   | 描述     |
| :------ | :------------------------------------- | :------- |
| pt      | `Coord|Geometry<Point>|Feature<Point>` | 点要素   |
| line    | `Feature <LineString>`                 | 线要素   |
| options | Object                                 | 可配置项 |

**options选项**

| 属性              | 类型    | 默认值 | 描述                                                         |
| :---------------- | :------ | :----- | :----------------------------------------------------------- |
| ignoreEndVertices | boolean | false  | 是否忽略线要素的起点和终点，false 则点在两点上也算在线上，true 反之 |

**返回**

boolean - true/false

**示例**

```js
var pt = turf.point([0, 0]);
var line = turf.lineString([
  [-1, -1],
  [1, 1],
  [1.5, 2.2]
]);
var isPointOnLine = turf.booleanPointOnLine(pt, line);
//=true

var pt = turf.point([-1, -1]);
var line = turf.lineString([
  [-1, -1],
  [1, 1],
  [1.5, 2.2]
]);
var isPointOnLine = turf.booleanPointOnLine(pt, line, {
  ignoreEndVertices: true
});
//=false
```