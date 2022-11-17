# triangleGrid

> Takes a bounding box and a cell depth and returns a set of triangular polygons in a grid.
> 获取边界框和单元格深度，并返回网格中的一组三角形多边形。

**参数**

| 参数     | 类型   | 描述                                   |
| :------- | :----- | :------------------------------------- |
| bbox     | Array  | extent in minX, minY, maxX, maxY order |
| cellSide | number | dimension of each cell                 |
| options  | Object | Optional parameters: see below         |

**options选项**

| 属性       | 类型                                 | 默认值     | 描述                                                         |
| :--------- | :----------------------------------- | :--------- | :----------------------------------------------------------- |
| units      | string                               | kilometers | used in calculating cell size, can be degrees, radians, miles, or kilometers |
| properties | Object                               | {}         | passed to each hexagon or triangle of the grid               |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |            | if passed a Polygon or MultiPolygon, the grid Points will be created only inside it |
| properties | Object                               | {}         | passed to each point of the grid                             |

**返回**

`FeatureCollection <Polygon>` - grid of polygons

**示例**

```js
var bbox = [-95, 30 ,-85, 40];
var cellSide = 50;
var options = {units: 'miles'};

var triangleGrid = turf.triangleGrid(bbox, cellSide, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/triangleGrid.99926a65.webp)