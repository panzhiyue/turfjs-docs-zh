# 属性累加(propReduce)

```
> npm install @turf/meta
```

> Reduce properties in any GeoJSON object into a single value, similar to how Array.reduce works. However, in this case we lazily run the reduction, so an array of all properties is unnecessary.
> 接收任意类型的 GeoJSON，遍历它的每个要素的 `properties` 并累加操作。功能类似 `Array.reduce()`



**参数**

| 参数         | 类型                       | 描述                                                         |
| :----------- | :------------------------- | :----------------------------------------------------------- |
| geojson      | FeatureCollection\|Feature | 任意 GeoJSON 对象                                            |
| callback     | Function                   | 回调，参数依次是 previousValue、currentProperties、featureIndex |
| initialValue | (*)                        | 初始值                                                       |

**返回**

- \* - reduce 产生的值

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], { foo: "bar" }),
  turf.point([36, 53], { hello: "world" })
]);

turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
  //=previousValue
  console.log(currentProperties);
  //=featureIndex
  return currentProperties;
});
/*
  { foo: "bar" }
  { hello: "world" }
*/
```