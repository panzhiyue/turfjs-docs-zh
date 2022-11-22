# 线段遍历(segmentEach)

```
> npm install @turf/meta
```

> Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach() (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
>
> 接收任意类型的 GeoJSON，遍历它的 2-vertex 线段。功能类似 `Array.forEach()`。
>
> 值得注意的是，(Multi)Point 的要素不包含线段，不进行操作



**参数**

| 参数     | 类型                                 | 描述                                                         |
| :------- | :----------------------------------- | :----------------------------------------------------------- |
| geojson  | FeatureCollection\|Feature\|Geometry | 任意 GeoJSON 对象                                            |
| callback | Function                             | 回调，参数依次是 currentSegment、featureIndex、multiFeatureIndex、geometryIndex、segmentIndex |

**返回**

undefined - undefined

**示例**

```js
var polygon = turf.polygon([
  [
    [-50, 5],
    [-40, -10],
    [-50, -10],
    [-40, 5],
    [-50, 5]
  ]
]);

// Iterate over GeoJSON by 2-vertex segments
turf.segmentEach(polygon, function (
  currentSegment,
  featureIndex,
  multiFeatureIndex,
  geometryIndex,
  segmentIndex
) {
  //=currentSegment
  //=featureIndex
  //=multiFeatureIndex
  //=geometryIndex
  //=segmentIndex
});

// Calculate the total number of segments
var total = 0;
turf.segmentEach(polygon, function () {
  total++;
});
```