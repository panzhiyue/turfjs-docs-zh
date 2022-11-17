# booleanPointOnLine

> Returns true if a point is on a line. Accepts a optional parameter to ignore the start and end vertices of the linestring.
> 如果一个点在直线上，则返回true。接受一个可选参数来忽略`linestring`的起始点和结束点。

```text
> npm install @turf/boolean-point-on-line
```

**参数**

| 参数    | 类型                   | 描述                           |
| :------ | :--------------------- | :----------------------------- |
| pt      | Coord                  | GeoJSON Point                  |
| line    | `Feature <LineString>` | GeoJSON LineString             |
| options | Object                 | Optional parameters: see below |

**options选项**

| 属性              | 类型    | 默认值 | 描述                                          |
| :---------------- | :------ | :----- | :-------------------------------------------- |
| ignoreEndVertices | boolean | false  | whether to ignore the start and end vertices. |

**返回**

boolean - true/false

**示例**

```js
var pt = turf.point([0, 0]);
var line = turf.lineString([[-1, -1],[1, 1],[1.5, 2.2]]);
var isPointOnLine = turf.booleanPointOnLine(pt, line);
//=true
```