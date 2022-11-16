# tin

> Takes a set of points and creates a Triangulated Irregular Network , or a TIN for short, returned as a collection of Polygons. These are often used for developing elevation contour maps or stepped heat visualizations.
> 获取一组点并创建一个三角形的不规则网络，或简称为一个TIN，返回为多边形的集合。这些经常用于发展高程等高线地图或阶梯热可视化。

**参数**

| 参数   | 类型                        | 描述                                                         |
| :----- | :-------------------------- | :----------------------------------------------------------- |
| points | `FeatureCollection <Point>` | input points                                                 |
| z      | (String)                    | name of the property from which to pull z values This is optional: if not given, then there will be no extra data added to the derived triangles. |

**返回**

`FeatureCollection <Polygon>` - TIN output

**示例**

```js
// generate some random point data
var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});

// add a random property to each point between 0 and 9
for (var i = 0; i < points.features.length; i++) {
  points.features[i].properties.z = ~~(Math.random() * 9);
}
var tin = turf.tin(points, 'z');
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tin.3d1cc363.webp)