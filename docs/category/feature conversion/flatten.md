# 减少嵌套层级(flatten)

> Flattens any GeoJSON to a FeatureCollection inspired by geojson-flatten.
> 扁平化任何GeoJSON为`FeatureCollection`。

**参数**

| 参数    | 类型    | 描述                     |
| :------ | :------ | :----------------------- |
| geojson | GeoJSON | any valid GeoJSON Object |

**返回**

FeatureCollection - all Multi-Geometries are flattened into single Features

**示例**

```js
var multiGeometry = turf.multiPolygon([
  [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
  [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
  [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
]);

var flatten = turf.flatten(multiGeometry);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/flatten.245d8a48.webp)