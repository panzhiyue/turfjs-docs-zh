# 结合(combine)

```
> npm install @turf/combine
```

> Combines a FeatureCollection of Point , LineString , or Polygon features into MultiPoint , MultiLineString , or MultiPolygon features.
> 将`Point`、`LineString`或`Polygon`的`FeatureCollection`组合成`MultiPoint`、`MultiLineString`或`MultiPolygon`的`feature`。

**参数**

| 参数 | 类型                                             | 描述             |
| :--- | :----------------------------------------------- | :--------------- |
| fc   | `FeatureCollection <(Point|LineString|Polygon)>` | 任意类型的要素集 |

**返回**

`FeatureCollection <(MultiPoint|MultiLineString|MultiPolygon)>` - a FeatureCollection of corresponding type to input

`FeatureCollection <(MultiPoint|MultiLineString|MultiPolygon)>` - 要输入的相应类型的FeatureCollection

**示例**

```js
var fc = turf.featureCollection([
  turf.point([19.026432, 47.49134]),
  turf.point([19.074497, 47.509548])
]);

var combined = turf.combine(fc);
/*
{
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    geometry: {
      type: "MultiPoint",
      coordinates: [
        [19.026432, 47.49134],
        [19.074497, 47.509548]
      ]
    }
  }]
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/combine.4f912259.webp)