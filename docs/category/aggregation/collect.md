# 收集(collect)

```
> npm install @turf/collect
```

> Merges a specified property from a FeatureCollection of points into a FeatureCollection of polygons. Given an inProperty on points and an outProperty for polygons, this finds every point that lies within each polygon, collects the inProperty values from those points, and adds them as an array to outProperty on the polygon.
>
> 接收面要素集合(`FeatureCollection<Polygon>`)，点要素集合(`FeatureCollection<Point>`)，如果某个点要素在某个面要素内，变会将该点的指定属性转移到该面的指定属性里，如果有多个点的话，则属性为数组。

**参数**

| 参数        | 类型                          | 描述                   |
| :---------- | :---------------------------- | :--------------------- |
| polygons    | `FeatureCollection <Polygon>` | 面要素集合             |
| points      | `FeatureCollection <Point>`   | 点要素集合             |
| inProperty  | string                        | 点要素的要被转移的属性 |
| outProperty | string                        | 面要素转移属性的重命名 |

**返回**

`FeatureCollection <Polygon>` - polygons with properties listed based on outField

`FeatureCollection <Polygon>` - 转移属性后的面要素集合

**示例**

```js
var poly1 = turf.polygon([
  [
    [0, 0],
    [10, 0],
    [10, 10],
    [0, 10],
    [0, 0]
  ]
]);
var poly2 = turf.polygon([
  [
    [10, 0],
    [20, 10],
    [20, 20],
    [20, 0],
    [10, 0]
  ]
]);
var polyFC = turf.featureCollection([poly1, poly2]);
var pt1 = turf.point([5, 5], { population: 200 });
var pt2 = turf.point([1, 3], { population: 600 });
var pt3 = turf.point([14, 2], { population: 100 });
var pt4 = turf.point([13, 1], { population: 200 });
var pt5 = turf.point([19, 7], { population: 300 });
var pointFC = turf.featureCollection([pt1, pt2, pt3, pt4, pt5]);
var collected = turf.collect(polyFC, pointFC, "population", "values");
var values = collected.features[0].properties.values;
//=values => [200, 600] pt1、pt2这两个点在第一个面要素里，所有把population的值转移给了第一个面要素的values
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/collect.cb8f3c88.webp)