# 计算点到多段线的最短距离(pointToLineDistance)

> Returns the minimum distance between a Point and a LineString , being the distance from a line the minimum distance between the point and any segment of the LineString.
> 返回点与`LineString`之间的最小距离，即到直线的距离，即点与`LineString`任意线段之间的最小距离。

```text
> npm install @turf/point-to-line-distance
```

**参数**

| 参数    | 类型                   | 描述                           |
| :------ | :--------------------- | :----------------------------- |
| pt      | Coord                  | Feature or Geometry            |
| line    | Feature `<LineString>` | GeoJSON Feature or Geometry    |
| options | Object                 | Optional parameters: see below |

**options选项**

| 属性     | 类型    | 默认值     | 描述                                                  |
| :------- | :------ | :--------- | :---------------------------------------------------- |
| units    | string  | kilometers | can be degrees, radians, miles, or kilometers         |
| mercator | boolean | false      | if distance should be on Mercator or WGS84 projection |

**返回**

number - distance between point and line

**示例**

```js
var pt = turf.point([0, 0]);
var line = turf.lineString([[1, 1],[-1, 1]]);

var distance = turf.pointToLineDistance(pt, line, {units: 'miles'});
//=69.11854715938406
```

