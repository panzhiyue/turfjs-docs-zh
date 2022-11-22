# flatten遍历(flattenEach)

```
> npm install @turf/meta
```

> Iterate over flattened features in any GeoJSON object, similar to Array.forEach.
>
> 遍历接收的任意GeoJSON对象(包括要素集合)，功能类似于`Array.forEach`。
>
> 值得注意的是，如果是多要素集，做扁平处理再遍历，功能类似 Array.flat()



**参数**

| 参数     | 类型                                 | 描述                                                         |
| :------- | :----------------------------------- | :----------------------------------------------------------- |
| geojson  | FeatureCollection\|Feature\|Geometry | 任意 GeoJSON 对象                                            |
| callback | Function                             | 回调，参数依次是 currentFeature、featureIndex、multiFeatureIndex |

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], { foo: "bar" }),
  turf.multiPoint(
    [
      [40, 30],
      [36, 53]
    ],
    { hello: "world" }
  )
]);

turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
  //=currentFeature
  //=featureIndex
  //=multiFeatureIndex
  console.log(currentFeature);
});
/* 输出三个点要素
{
  type: "Feature",
  geometry: {
    coordinates: [26, 37],
    type: "Point"
  },
  properties: { foo: "bar" }
}
{
  type: "Feature",
  geometry: {
    coordinates: [40, 30],
    type: "Point"
  },
  properties: { hello: "world" }
}
{
  type: "Feature",
  geometry: {
    coordinates: [36, 53],
    type: "Point"
  },
  properties: { hello: "world" }
}
*/
```