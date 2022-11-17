# collect

> Merges a specified property from a FeatureCollection of points into a FeatureCollection of polygons. Given an inProperty on points and an outProperty for polygons, this finds every point that lies within each polygon, collects the inProperty values from those points, and adds them as an array to outProperty on the polygon.
> 将指定属性从点的`FeatureCollection`合并到一个`FeatureCollection`的多边形。给定点上的`inProperty`和多边形的`outProperty`，它将查找每个多边形内的每个点，从这些点收集`inProperty`值，并将它们作为数组添加到多边形上的`outProperty`中。

**参数**

| 参数        | 类型                          | 描述                                       |
| :---------- | :---------------------------- | :----------------------------------------- |
| polygons    | `FeatureCollection <Polygon>` | polygons with values on which to aggregate |
| points      | `FeatureCollection <Point>`   | points to be aggregated                    |
| inProperty  | string                        | property to be nested from                 |
| outProperty | string                        | property to be nested into                 |

**返回**

`FeatureCollection <Polygon>` - polygons with properties listed based on outField

**示例**

```js
var poly1 = turf.polygon([[[0,0],[10,0],[10,10],[0,10],[0,0]]]);
var poly2 = turf.polygon([[[10,0],[20,10],[20,20],[20,0],[10,0]]]);
var polyFC = turf.featureCollection([poly1, poly2]);
var pt1 = turf.point([5,5], {population: 200});
var pt2 = turf.point([1,3], {population: 600});
var pt3 = turf.point([14,2], {population: 100});
var pt4 = turf.point([13,1], {population: 200});
var pt5 = turf.point([19,7], {population: 300});
var pointFC = turf.featureCollection([pt1, pt2, pt3, pt4, pt5]);
var collected = turf.collect(polyFC, pointFC, 'population', 'values');
var values = collected.features[0].properties.values
//=values => [200, 600]
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/collect.cb8f3c88.webp)