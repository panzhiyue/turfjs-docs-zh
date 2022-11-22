# 等压线(isobands)

```
> npm install @turf/isobands
```

> Takes a grid FeatureCollection of Point features with z-values and an array of value breaks and generates filled contour isobands.
>
> 接收点要素集(`FeatureCollection<Point>`)，根据参与分级的属性和分级的数组计算出等值面并返回。

**参数**

| 参数      | 类型                        | 描述           |
| :-------- | :-------------------------- | :------------- |
| pointGrid | `FeatureCollection <Point>` | 传入的点要素集 |
| breaks    | Array                       | 分级的数组     |
| options   | Object                      | 可配置项       |

**options选项**

| 属性             | 类型   | 默认值      | 描述                                                         |
| :--------------- | :----- | :---------- | :----------------------------------------------------------- |
| zProperty        | string | "elevation" | 参与分级的属性                                               |
| commonProperties | Object | {}          | 每个要素的属性                                               |
| breaksProperties | Array  | []          | GeoJSON properties passed, in order, to the correspondent isoband (order defined by breaks) |

**返回**

`FeatureCollection <MultiPolygon>` - a FeatureCollection of MultiPolygon features representing isobands

`FeatureCollection <MultiPolygon>` - 表示等压线的多面要素集合

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