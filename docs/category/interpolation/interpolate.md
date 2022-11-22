# 插入网格点(interpolate)

```
> npm install @turf/interpolate
```

> Takes a set of points and estimates their 'property' values on a grid using the Inverse Distance Weighting (IDW) method.
> 接收一组点要素集，使用 [反向距离加权(IDW) (opens new window)](https://baike.baidu.com/item/反距离加权插值/3689866?fr=aladdin)方法估算并返回要素集。

**参数**

| 参数     | 类型                        | 描述                 |
| :------- | :-------------------------- | :------------------- |
| points   | `FeatureCollection <Point>` | 传入的要素集         |
| cellSize | number                      | 每个网格点之间的距离 |
| options  | Object                      | 可配置项             |

**options选项**

| 属性     | 类型   | 默认值       | 描述                                                         |
| :------- | :----- | :----------- | :----------------------------------------------------------- |
| gridType | string | "square"     | 出参要素集的要素类型，可选值有："square"(矩形)、"point"(点)、"hex"(六边形)、"triangle"(三角形) |
| property | string | "elevation"  | 参与计算的属性                                               |
| units    | string | "kilometers" | 单位，可选的有 degrees、radians、miles、kilometers           |
| weight   | number | 1            | 调节距离衰减权重的指数                                       |

**返回**

`FeatureCollection <(Point|Polygon)>` - grid of points or polygons with interpolated 'property'

`FeatureCollection <(Point|Polygon)>` - 具有插值“属性”的点或多边形网格

**示例**

```js
var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});

// add a random property to each point
turf.featureEach(points, function(point) {
    point.properties.solRad = Math.random() * 50;
});
var options = {gridType: 'points', property: 'solRad', units: 'miles'};
var grid = turf.interpolate(points, 100, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/interpolate.566a42c7.webp)

