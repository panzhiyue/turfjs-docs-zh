# 减少嵌套层级(flatten)

```
> npm install @turf/flatten
```

> Flattens any GeoJSON to a FeatureCollection inspired by geojson-flatten.
> 接收一个 type 为 MultiPoint、MultiLineString、MultiPolygon的要素，返回 type 为 Point、LineString、Polygon 的要素集(FeatureCollection)

**参数**

| 参数    | 类型    | 描述         |
| :------ | :------ | :----------- |
| geojson | GeoJSON | Multi*的要素 |

**返回**

FeatureCollection - all Multi-Geometries are flattened into single Features

FeatureCollection - 摊平的要素集

**示例**

```js
var multiGeometry = turf.multiPolygon([
  [
    [
      [102.0, 2.0],
      [103.0, 2.0],
      [103.0, 3.0],
      [102.0, 3.0],
      [102.0, 2.0]
    ]
  ],
  [
    [
      [100.0, 0.0],
      [101.0, 0.0],
      [101.0, 1.0],
      [100.0, 1.0],
      [100.0, 0.0]
    ],
    [
      [100.2, 0.2],
      [100.8, 0.2],
      [100.8, 0.8],
      [100.2, 0.8],
      [100.2, 0.2]
    ]
  ]
]); // type 为 MultiPolygon

var flatten = turf.flatten(multiGeometry); // type 为 Polygon 的多个要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/flatten.245d8a48.webp)