# 计算多点中心(centerOfMass)

> Takes any Feature or a FeatureCollection and returns its center of mass using this formula: Centroid of Polygon.
> 获取任何`Feature`或`FeatureCollection`，并调用`centerOfMass`方法返回其中心。

**参数**

| 参数       | 类型    | 描述                                                |
| :--------- | :------ | :-------------------------------------------------- |
| geojson    | GeoJSON | GeoJSON to be centered                              |
| properties | Object  | an Object that is used as the Feature 's properties |

**返回**

Feature `<Point>` - the center of mass

**示例**

```js
var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);

var center = turf.centerOfMass(polygon);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/centerOfMass.d807f8b0.webp)