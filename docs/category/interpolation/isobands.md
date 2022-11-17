# 等压线(isobands)

> Takes a grid FeatureCollection of Point features with z-values and an array of value breaks and generates filled contour isobands.
> 取带有z值和一组值断点的点`Feature`的网格`FeatureCollection`，并生成填充的等边线。

```text
> npm install @turf/isobands
```

**参数**

| 参数      | 类型                        | 描述                           |
| :-------- | :-------------------------- | :----------------------------- |
| pointGrid | `FeatureCollection <Point>` | input points                   |
| breaks    | Array                       | where to draw contours         |
| options   | Object                      | Optional parameters: see below |

**options选项**

| 属性             | 类型   | 默认值    | 描述                                                         |
| :--------------- | :----- | :-------- | :----------------------------------------------------------- |
| zProperty        | string | elevation | the property name in                                         |
| commonProperties | Object | {}        | GeoJSON properties passed to ALL isobands                    |
| breaksProperties | Array  | []        | GeoJSON properties passed, in order, to the correspondent isoband (order defined by breaks) |

**返回**

`FeatureCollection <MultiPolygon>` - a FeatureCollection of MultiPolygon features representing isobands

**示例**

```js
var extent = [0, 30, 20, 50];
var cellWidth = 100;
var pointGrid = turf.pointGrid(extent, cellWidth, {units: 'miles'});

for (var i = 0; i < pointGrid.features.length; i++) {
    pointGrid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var lines = turf.isobands(pointGrid, breaks, {zProperty: 'temperature'});
```