# 返回在多边形内的点(pointsWithinPolygon)

```
> npm install @turf/points-within-polygon
```

> Finds Points that fall within (Multi)Polygon(s).
> 接收一个面要素或面要素集合和点要素或点要素集合，计算并返回在改面要素内部的点

**参数**

| 参数     | 类型                                                       | 描述           |
| :------- | :--------------------------------------------------------- | :------------- |
| points   | `Feauture|FeatureCollection <Point>`                       | 要计算的点要素 |
| polygons | `FeatureCollection|Geometry|Feature<Polygon|MultiPolygon>` | 面要素         |

**返回**

`FeatureCollection <Point>` - points that land within at least one polygon

`FeatureCollection <Point>` - 至少位于一个面内的点集合

**示例**

```js
var points = turf.points([
  [-46.6318, -23.5523],
  [-46.6246, -23.5325],
  [-46.6062, -23.5513],
  [-46.663, -23.554],
  [-46.643, -23.557]
]);

var searchWithin = turf.polygon([
  [
    [-46.653, -23.543],
    [-46.634, -23.5346],
    [-46.613, -23.543],
    [-46.614, -23.559],
    [-46.631, -23.567],
    [-46.653, -23.56],
    [-46.653, -23.543]
  ]
]);

var ptsWithin = turf.pointsWithinPolygon(points, searchWithin); // [-46.6318, -23.5523]、[-46.643, -23.557]
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointsWithinPolygon.3a2bad82.webp)