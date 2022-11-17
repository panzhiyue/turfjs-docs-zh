# 集合类型(collectionOf)

> Enforce expectations about types of FeatureCollection inputs for Turf. Internally this uses geojsonType to judge geometry types.
> 加强对Turf的`FeatureCollection`输入类型的期望。在内部，它使用`geojsonType`来判断几何类型。

```text
> npm install @turf/invariant
```

**参数**

| 参数              | 类型              | 描述                                                  |
| :---------------- | :---------------- | :---------------------------------------------------- |
| featureCollection | FeatureCollection | a FeatureCollection for which features will be judged |
| type              | string            | expected GeoJSON type                                 |
| name              | string            | name of calling function                              |

**示例**

```js
var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});

var pointCollection = turf.featureCollection([
  locationA,
  locationB,
  locationC
]);

turf.collectionOf(pointCollection, 'Point', 'Location A');
```