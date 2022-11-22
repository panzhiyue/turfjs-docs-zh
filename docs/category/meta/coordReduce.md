# 坐标累加(coordReduce)

```
> npm install @turf/meta
```

> Reduce coordinates in any GeoJSON object, similar to Array.reduce()
>
> 接收任意GeoJSON对象(包括要素集合)，遍历累加操作。功能类似`Array.reduce()`。

**参数**

| 参数             | 类型                                   | 描述                                                         |
| :--------------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson          | (FeatureCollection\|Geometry\|Feature) | 任意 GeoJSON 对象                                            |
| callback         | Function                               | 回调，参数依次是 previousValue、currentCoord、coordIndex、featureIndex、multiFeatureIndex、geometryIndex |
| initialValue     | (*)                                    | 要用作回调的第一个调用的第一个参数的值。                     |
| excludeWrapCoord | boolean                                | 是否包含最后一个坐标对(针对闭环线、面要素等坐标是首位闭合的情况)，默认为 false |

**返回**

- 累加的结果值

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {"foo": "bar"}),
  turf.point([36, 53], {"hello": "world"})
]);

turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
  //=previousValue
  //=currentCoord
  //=coordIndex
  //=featureIndex
  //=multiFeatureIndex
  //=geometryIndex
  return currentCoord;
});
```