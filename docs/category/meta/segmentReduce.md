# 线段累加(segmentReduce)

```
> npm install @turf/meta
```

> Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce() (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
>
> 接收任意类型的 `GeoJSON`，遍历它的 `2-vertex` 线段并累加操作。功能类似 `Array.reduce()`。`(Multi)Point`几何图形不包含线段，因此在此操作期间将忽略它们。



**参数**

| 参数         | 类型                                 | 描述                                                         |
| :----------- | :----------------------------------- | :----------------------------------------------------------- |
| geojson      | FeatureCollection\|Feature\|Geometry | 任意 GeoJSON 对象                                            |
| callback     | Function                             | 回调，参数依次是 previousValue、currentProperties、featureIndex |
| initialValue | (*)                                  | 初始值                                                       |

**返回**

undefined - undefined

**示例**

```js
var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);

// Iterate over GeoJSON by 2-vertex segments
turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
  //= previousSegment
  //= currentSegment
  //= featureIndex
  //= multiFeatureIndex
  //= geometryIndex
  //= segmentInex
  return currentSegment
});

// Calculate the total number of segments
var initialValue = 0
var total = turf.segmentReduce(polygon, function (previousValue) {
    previousValue++;
    return previousValue;
}, initialValue);
```