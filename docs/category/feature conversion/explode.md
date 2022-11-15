# 拆分多边形为点(explode)

> Takes a feature or set of features and returns all positions as points.
> 获取一个或一组`Feature`，并将所有位置作为点返回。

**参数**

| 参数    | 类型    | 描述           |
| :------ | :------ | :------------- |
| geojson | GeoJSON | input features |

**返回**

`FeatureCollection <point>` - points representing the exploded input features

**示例**

```js
var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);

var explode = turf.explode(polygon);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/explode.340ada83.webp)