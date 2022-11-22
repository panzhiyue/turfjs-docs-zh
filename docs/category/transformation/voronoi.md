# voronoi

```
> npm install @turf/voronoi
```

> Takes a FeatureCollection of points, and a bounding box, and returns a FeatureCollection of Voronoi polygons.
>
> 接收 type 为 point 的要素集和边界框 bbox，并返回 Voronoi 多边形的要素集

> 值得注意的是，[voronoi](https://baike.baidu.com/item/泰森多边形) 是对空间平面的一种分割算法：对离散数据点合理地连成三角网

**参数**

| 入参    | 类型                       | 描述     |
| ------- | -------------------------- | -------- |
| points  | `FeatureCollection<Point>` | 要素集   |
| options | Object                     | 可配置项 |

**options**

| 属性 | 类型  | 默认值             | 描述                  |
| ---- | ----- | ------------------ | --------------------- |
| bbox | Array | [-180,-85,180,-85] | [xmin,ymin,xmax,ymax] |

**返回**

`FeatureCollection<Polygon>`

**范例**

```javascript
var options = {
  bbox: [-70, 40, -60, 60]
};
var points = turf.randomPoint(100, options);
var voronoiPolygons = turf.voronoi(points, options);
```