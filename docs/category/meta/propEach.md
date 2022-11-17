# 属性遍历(propEach)

> Iterate over properties in any GeoJSON object, similar to Array.forEach()
> 迭代任何GeoJSON对象中的属性，类似于`Array.forEach()`

```text
> npm install @turf/meta
```

**参数**

| 参数     | 类型                         | 描述                                                  |
| :------- | :--------------------------- | :---------------------------------------------------- |
| geojson  | (FeatureCollection\|Feature) | any GeoJSON object                                    |
| callback | Function                     | a method that takes (currentProperties, featureIndex) |

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