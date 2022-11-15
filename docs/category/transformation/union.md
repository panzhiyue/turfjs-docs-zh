# 联合(union)

> Takes two or more polygons and returns a combined polygon. If the input polygons are not contiguous, this function returns a MultiPolygon feature.
> 
> 获取两个或多个多边形，并返回一个组合多边形。如果输入的多边形不是连续的，这个函数将返回一个`MultiPolygon`。

**参数**

| 参数 | 类型                   | 描述               |
| :--- | :--------------------- | :----------------- |
| A    | ...`Feature <Polygon>` | polygon to combine |

**返回**

`Feature <(Polygon|MultiPolygon)>` - a combined Polygon or MultiPolygon feature

**示例**

```js
var poly1 = turf.polygon([[
    [-82.574787, 35.594087],
    [-82.574787, 35.615581],
    [-82.545261, 35.615581],
    [-82.545261, 35.594087],
    [-82.574787, 35.594087]
]], {"fill": "#0f0"});
var poly2 = turf.polygon([[
    [-82.560024, 35.585153],
    [-82.560024, 35.602602],
    [-82.52964, 35.602602],
    [-82.52964, 35.585153],
    [-82.560024, 35.585153]
]], {"fill": "#00f"});

var union = turf.union(poly1, poly2);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/union.f2707727.webp)