# 计算边界(bbox)

> Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
> 获取一组`feature`，计算所有`feature`的`bbox`，并返回一个边界框。

**参数**

| 参数    | 类型    | 描述               |
| :------ | :------ | :----------------- |
| geojson | GeoJSON | any GeoJSON object |

**返回**

BBox - bbox extent in minX, minY, maxX, maxY order

**示例**

```js
var line = turf.lineString([
        [104.99467, 30.071677],
        [107.13797, 36.550462],
        [112.607082, 34.991467]
      ]);
var bbox = turf.bbox(line);
var bboxPolygon = turf.bboxPolygon(bbox);
```

```
npm install @turf/bbox
```

