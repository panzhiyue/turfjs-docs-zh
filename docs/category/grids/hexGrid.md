# 六边形网格(hexGrid)

> Takes a bounding box and the diameter of the cell and returns a FeatureCollection of flat-topped hexagons or triangles ( Polygon features) aligned in an "odd-q" vertical grid as described in Hexagonal Grids.
> 获取一个边界框和单元格的直径，并返回一个`FeatureCollection`平顶六边形或三角形(多边形特征)对齐在一个“odd-q”垂直网格中描述的六边形网格。

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| bbox     | BBox   | extent in minX, minY, maxX, maxY order                       |
| cellSide | number | length of the side of the the hexagons or triangles, in units. It will also coincide with the radius of the circumcircle of the hexagons. |
| options  | Object | Optional parameters: see below                               |

**options选项**

| 属性       | 类型                                 | 默认值     | 描述                                                         |
| :--------- | :----------------------------------- | :--------- | :----------------------------------------------------------- |
| units      | string                               | kilometers | used in calculating cell size, can be degrees, radians, miles, or kilometers |
| properties | Object                               | {}         | passed to each hexagon or triangle of the grid               |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |            | if passed a Polygon or MultiPolygon, the grid Points will be created only inside it |
| triangles  | boolean                              | false      | whether to return as triangles instead of hexagons           |

**返回**

`FeatureCollection <Polygon>` - a hexagonal grid

**示例**

```js
var bbox = [-96,31,-84,40];
var cellSide = 50;
var options = {units: 'miles'};

var hexgrid = turf.hexGrid(bbox, cellSide, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/hexGrid.53be975c.webp)