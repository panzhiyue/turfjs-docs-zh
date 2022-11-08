# 计算多边形中心(centroid)

> Takes one or more features and calculates the centroid using the mean of all vertices. This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
> 获取一个或多个`Feature`，并使用所有顶点的平均值计算中心。

**参数**

| 参数       | 类型    | 描述                                                |
| :--------- | :------ | :-------------------------------------------------- |
| geojson    | GeoJSON | GeoJSON to be centered                              |
| properties | Object  | an Object that is used as the Feature 's properties |

**返回**

Feature `<Point>` - the centroid of the input features

**示例**

```js
var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);

var centroid = turf.centroid(polygon);
```



![](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/centroid.a4b90a58.webp)