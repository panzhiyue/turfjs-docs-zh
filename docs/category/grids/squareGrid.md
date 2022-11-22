# 正方形网格(squareGrid)

```
> npm install @turf/square-grid
```

> Creates a square grid from a bounding box, Feature or FeatureCollection.
>
> 接收一个边界框(BBox),创建并返回正方形面要素集合(`FeatureCollection<Polygon>`)。

**参数**

| 参数     | 类型   | 描述                  |
| :------- | :----- | :-------------------- |
| bbox     | Array  | [xmin,ymin,xmax,ymax] |
| cellSide | number | 面要素的边长          |
| options  | Object | 可配置项              |

**options选项**

| 属性       | 类型                                 | 默认值       | 描述                                                         |
| :--------- | :----------------------------------- | :----------- | :----------------------------------------------------------- |
| units      | string                               | "kilometers" | 单位，可选的有 degrees、radians、miles、kilometers           |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |              | 如果传递了 Polygon 或 MultiPollygon，则仅在传入的 mask 面要素内创建，如果范围大于 bbox，则相当于不传 |
| properties | Object                               | {}           | 出参 的 properties 属性                                      |

**返回**

`FeatureCollection <Polygon>` - grid a grid of polygons

`FeatureCollection <Polygon>` - 正方形面要素集合

**示例**

```js
var bbox = [-95, 30 ,-85, 40];
var cellSide = 50;
var options = {units: 'miles'};

var squareGrid = turf.squareGrid(bbox, cellSide, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/squareGrid.cfcce9bb.webp)