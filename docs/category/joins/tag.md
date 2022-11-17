# 空间连接(tag)

> Takes a set of points and a set of polygons and performs a spatial join.
> 取一组点和一组多边形，并执行空间连接。

**参数**

| 参数     | 类型                          | 描述                                                         |
| :------- | :---------------------------- | :----------------------------------------------------------- |
| points   | `FeatureCollection <Point>`   | input points                                                 |
| polygons | `FeatureCollection <Polygon>` | input polygons                                               |
| field    | string                        | property in polygons to add to joined { } features           |
| outField | string                        | property in points in which to store joined property from polygons |

**返回**

`FeatureCollection <Point>` - points with containingPolyId property containing values from polyId

**示例**

```js
var pt1 = turf.point([-77, 44]);
var pt2 = turf.point([-77, 38]);
var poly1 = turf.polygon([[
  [-81, 41],
  [-81, 47],
  [-72, 47],
  [-72, 41],
  [-81, 41]
]], {pop: 3000});
var poly2 = turf.polygon([[
  [-81, 35],
  [-81, 41],
  [-72, 41],
  [-72, 35],
  [-81, 35]
]], {pop: 1000});

var points = turf.featureCollection([pt1, pt2]);
var polygons = turf.featureCollection([poly1, poly2]);

var tagged = turf.tag(points, polygons, 'pop', 'population');
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tag.adc60a50.webp)