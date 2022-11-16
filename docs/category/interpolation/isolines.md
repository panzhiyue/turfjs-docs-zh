# isolines

> Takes a grid FeatureCollection of Point features with z-values and an array of value breaks and generates isolines.
> 采用带有z值的点特征的网格`FeatureCollection`和一组断点值并生成等值线。

**参数**

| 参数      | 类型                      | 描述                                       |
| :-------- | :------------------------ | :----------------------------------------- |
| pointGrid | FeatureCollection <Point> | input points                               |
| breaks    | Array                     | values of zProperty where to draw isolines |
| options   | Object                    | Optional parameters: see below             |

**options选项**

| 属性             | 类型   | 默认值    | 描述                                                         |
| :--------------- | :----- | :-------- | :----------------------------------------------------------- |
| zProperty        | string | elevation | the property name in                                         |
| commonProperties | Object | {}        | GeoJSON properties passed to ALL isolines                    |
| breaksProperties | Array  | []        | GeoJSON properties passed, in order, to the correspondent isoline; the breaks array will define the order in which the isolines are created |

**返回**

`FeatureCollection <MultiLineString>` - a FeatureCollection of MultiLineString features representing isolines

**示例**

```js
// create a grid of points with random z-values in their properties
var extent = [0, 30, 20, 50];
var cellWidth = 100;
var pointGrid = turf.pointGrid(extent, cellWidth, {units: 'miles'});

for (var i = 0; i < pointGrid.features.length; i++) {
    pointGrid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var lines = turf.isolines(pointGrid, breaks, {zProperty: 'temperature'});
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/isolines.1a393e92.webp)