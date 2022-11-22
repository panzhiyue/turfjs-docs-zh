# 属性遍历(propEach)

```
> npm install @turf/meta
```

> Iterate over properties in any GeoJSON object, similar to Array.forEach()
> 接收任意类型的 GeoJSON，遍历它的每个要素的 properties。功能类似 `Array.forEach()`

**参数**

| 参数     | 类型                       | 描述                                             |
| :------- | :------------------------- | :----------------------------------------------- |
| geojson  | FeatureCollection\|Feature | 任意 GeoJSON 对象                                |
| callback | Function                   | 回调，参数依次是 currentProperties、featureIndex |

**返回**

undefined - undefined

**示例**

```js
var features = turf.featureCollection([
    turf.point([26, 37], {foo: 'bar'}),
    turf.point([36, 53], {hello: 'world'})
]);

turf.propEach(features, function (currentProperties, featureIndex) {
  //=currentProperties
  //=featureIndex
});
```