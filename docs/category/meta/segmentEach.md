# 线段遍历(segmentEach)

> Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach() (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
> 迭代任何GeoJSON对象中的`2-vertex`线段，类似于`Array.forEach()` (Multi)`Point`几何图形不包含线段，因此在此操作期间将忽略它们。

```text
> npm install @turf/meta
```

**参数**

| 参数     | 类型                                   | 描述                                                         |
| :------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson  | (FeatureCollection\|Feature\|Geometry) | any GeoJSON                                                  |
| callback | Function                               | a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) |

**返回**

undefined - undefined

**示例**

```js
var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);

// Iterate over GeoJSON by 2-vertex segments
turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
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