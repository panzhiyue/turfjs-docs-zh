# 结合(combine)

> Combines a FeatureCollection of Point , LineString , or Polygon features into MultiPoint , MultiLineString , or MultiPolygon features.
> 将`Point`、`LineString`或`Polygon`的`FeatureCollection`组合成`MultiPoint`、`MultiLineString`或`MultiPolygon`的`feature`。

**参数**

| 参数 | 类型                                             | 描述                            |
| :--- | :----------------------------------------------- | :------------------------------ |
| fc   | `FeatureCollection <(Point|LineString|Polygon)>` | a FeatureCollection of any type |

**返回**

`FeatureCollection <(MultiPoint|MultiLineString|MultiPolygon)>` - a FeatureCollection of corresponding type to input

**示例**

```js
var fc = turf.featureCollection([
  turf.point([19.026432, 47.49134]),
  turf.point([19.074497, 47.509548])
]);

var combined = turf.combine(fc);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/combine.4f912259.webp)