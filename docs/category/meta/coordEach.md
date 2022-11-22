# 坐标遍历(coordEach)

```
> npm install @turf/meta
```

> Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
> 遍历任何GeoJSON对象中的坐标，类似于`Array.forEach()`

**参数**

| 参数             | 类型                                   | 描述                                                         |
| :--------------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson          | (FeatureCollection\|Feature\|Geometry) | 任意 GeoJSON 对象                                            |
| callback         | Function                               | 回调，参数依次是 currentCoord、coordIndex、featureIndex、multiFeatureIndex |
| excludeWrapCoord | boolean                                | 是否包含最后一个坐标对(针对闭环线、面要素等坐标是首位闭合的情况)，默认为 false |

**返回**

undefined - undefined

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {"foo": "bar"}),
  turf.point([36, 53], {"hello": "world"})
]);

turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
  //=currentCoord
  //=coordIndex
  //=featureIndex
  //=multiFeatureIndex
  //=geometryIndex
});
```