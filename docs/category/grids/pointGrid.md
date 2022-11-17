# pointGrid

> Creates a Point grid from a bounding box, FeatureCollection or Feature.
> 从一个边界框，`FeatureCollection`或`Feature`创建一个点网格。

**参数**

| 参数     | 类型   | 描述                                   |
| :------- | :----- | :------------------------------------- |
| bbox     | Array  | extent in minX, minY, maxX, maxY order |
| cellSide | number | the distance between points, in units  |
| options  | Object | Optional parameters: see below         |

**options选项**

| 属性       | 类型                                 | 默认值     | 描述                                                         |
| :--------- | :----------------------------------- | :--------- | :----------------------------------------------------------- |
| units      | string                               | kilometers | used in calculating cell size, can be degrees, radians, miles, or kilometers |
| properties | Object                               | {}         | passed to each hexagon or triangle of the grid               |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |            | if passed a Polygon or MultiPolygon, the grid Points will be created only inside it |
| properties | Object                               | {}         | passed to each point of the grid                             |

**返回**

`FeatureCollection <Point>` - grid of points

**示例**

```js
var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
var cellSide = 3;
var options = {units: 'miles'};

var grid = turf.pointGrid(extent, cellSide, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointGrid.9acfdd5c.webp)