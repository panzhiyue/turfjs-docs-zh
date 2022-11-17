# 正方形网格(squareGrid)

> Creates a square grid from a bounding box, Feature or FeatureCollection.
> 从一个边界框，`Feature`或`FeatureCollection`创建一个正方形网格。。

**参数**

| 参数     | 类型   | 描述                                   |
| :------- | :----- | :------------------------------------- |
| bbox     | Array  | extent in minX, minY, maxX, maxY order |
| cellSide | number | of each cell, in units                 |
| options  | Object | Optional parameters: see below         |

**options选项**

| 属性       | 类型                                 | 默认值     | 描述                                                         |
| :--------- | :----------------------------------- | :--------- | :----------------------------------------------------------- |
| units      | string                               | kilometers | used in calculating cell size, can be degrees, radians, miles, or kilometers |
| properties | Object                               | {}         | passed to each hexagon or triangle of the grid               |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |            | if passed a Polygon or MultiPolygon, the grid Points will be created only inside it |
| properties | Object                               | {}         | passed to each point of the grid                             |

**返回**

`FeatureCollection <Polygon>` - grid a grid of polygons

**示例**

```js
var bbox = [-95, 30 ,-85, 40];
var cellSide = 50;
var options = {units: 'miles'};

var squareGrid = turf.squareGrid(bbox, cellSide, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/squareGrid.cfcce9bb.webp)