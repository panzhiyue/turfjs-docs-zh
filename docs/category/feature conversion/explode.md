# 拆分多边形为点(explode)

```
> npm install @turf/explode
```

> Takes a feature or set of features and returns all positions as points.
> 获取任意要素(`Feature`)或要素集（`FeatureCollection`），返回所有要素的顶点。

**参数**

| 参数    | 类型    | 描述         |
| :------ | :------ | :----------- |
| geojson | GeoJSON | 要素或要素集 |

**返回**

`FeatureCollection <point>` - points representing the exploded input features

`FeatureCollection <point>` - 所有要素的点集合

**示例**

```js
var polygon = turf.polygon([
  [
    [-81, 41],
    [-88, 36],
    [-84, 31],
    [-80, 33],
    [-77, 39],
    [-81, 41]
  ]
]);

var explode = turf.explode(polygon); // 返回六个顶点的要素集
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/explode.340ada83.webp)