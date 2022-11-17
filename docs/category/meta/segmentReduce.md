# 线段累加(segmentReduce)

> Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce() (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
> 在任何GeoJSON对象中减少`2-vertex`线段，类似于`Array.reduce()`(多)`Point`几何图形不包含线段，因此在此操作期间将忽略它们。

```text
> npm install @turf/meta
```

**参数**

| 参数         | 类型                                   | 描述                                                         |
| :----------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson      | (FeatureCollection\|Feature\|Geometry) | any GeoJSON                                                  |
| callback     | Function                               | a method that takes (previousValue, currentSegment, currentIndex) |
| initialValue | (*)                                    | Value to use as the first argument to the first call of the callback. |

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