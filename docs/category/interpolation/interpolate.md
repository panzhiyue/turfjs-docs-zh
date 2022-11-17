# 插入网格点(interpolate)

> Takes a set of points and estimates their 'property' values on a grid using the Inverse Distance Weighting (IDW) method.
> 采用一组点，并估计它们在网格上的“属性”值，使用 [反向距离加权(IDW) (opens new window)](https://baike.baidu.com/item/反距离加权插值/3689866?fr=aladdin)方法。

**参数**

| 参数     | 类型                        | 描述                                |
| :------- | :-------------------------- | :---------------------------------- |
| points   | `FeatureCollection <Point>` | with known value                    |
| cellSize | number                      | the distance across each grid point |
| options  | Object                      | Optional parameters: see below      |

**options选项**

| 属性     | 类型   | 默认值     | 描述                                                         |
| :------- | :----- | :--------- | :----------------------------------------------------------- |
| gridType | string | square     | defines the output format based on a Grid Type (options: 'square' |
| property | string | elevation  | the property name in                                         |
| units    | string | kilometers | used in calculating cellSize, can be degrees, radians, miles, or kilometers |
| weight   | number | 1          | exponent regulating the distance-decay weighting             |

**返回**

`FeatureCollection <(Point|Polygon)>` - grid of points or polygons with interpolated 'property'

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