# kinks

> Takes a linestring , multi-linestring , multi-polygon , or polygon and returns points at all self-intersections.
> 获取一个`linestring`、`multi-linestring`、`multi-polygon`，并返回所有自身相交点。

**参数**

| 参数      | 类型                                                         | 描述          |
| :-------- | :----------------------------------------------------------- | :------------ |
| featureIn | `Feature <(LineString|MultiLineString|MultiPolygon|Polygon)>` | input feature |

**返回**

`FeatureCollection <Point>` - self-intersections

**示例**

```js
var poly = turf.polygon([[
  [-12.034835, 8.901183],
  [-12.060413, 8.899826],
  [-12.03638, 8.873199],
  [-12.059383, 8.871418],
  [-12.034835, 8.901183]
]]);

var kinks = turf.kinks(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/kinks.8ed66c95.webp)