# 判断是否相等(booleanEqual)

> Determine whether two geometries of the same type have identical X,Y coordinate values. See http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm
> 确定相同类型的两个几何图形是否具有相同的X、Y坐标值。参见http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm

```text
> npm install @turf/boolean-equal
```

**参数**

| 参数     | 类型                | 描述          |
| :------- | :------------------ | :------------ |
| feature1 | (Geometry\|Feature) | GeoJSON input |
| feature2 | (Geometry\|Feature) | GeoJSON input |

**返回**

boolean - true if the objects are equal, false otherwise

**示例**

```js
var pt1 = turf.point([0, 0]);
var pt2 = turf.point([0, 0]);
var pt3 = turf.point([1, 1]);

turf.booleanEqual(pt1, pt2);
//= true
turf.booleanEqual(pt2, pt3);
//= false
```