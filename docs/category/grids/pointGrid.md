# 点网格(pointGrid)

```
> npm install @turf/point-grid
```

> Creates a Point grid from a bounding box, FeatureCollection or Feature.
>
> 接收边界框，返回指定距离排列的点要素集合(`FeatureCollection<Point>`)。

**参数**

| 参数     | 类型   | 描述                  |
| :------- | :----- | :-------------------- |
| bbox     | Array  | [xmin,ymin,xmax,ymax] |
| cellSide | number | 点要素之间的距离      |
| options  | Object | 可配置项              |

**options选项**

| 属性       | 类型                                 | 默认值       | 描述                                                         |
| :--------- | :----------------------------------- | :----------- | :----------------------------------------------------------- |
| units      | string                               | "kilometers" | 单位，可选的有 degrees、radians、miles、kilometers           |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |              | 如果传递了 Polygon 或 MultiPollygon，则仅在传入的 mask 面要素内创建，如果范围大于 bbox，则相当于不传 |
| properties | Object                               | {}           | 出参的 properties 属性                                       |

**返回**

`FeatureCollection <Point>` - grid of points

`FeatureCollection <Point>` - 网格点集合

**示例**

```js
var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
var cellSide = 3;
var options = { units: "miles" };

var grid = turf.pointGrid(extent, cellSide, options); // 返回点要素集，点与点之间距离三英里
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointGrid.9acfdd5c.webp)