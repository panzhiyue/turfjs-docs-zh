# 判断是否相等(booleanEqual)

```
> npm install @turf/boolean-equal
```

> Determine whether two geometries of the same type have identical X,Y coordinate values. See http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm
> 接收两个任意类型的要素，判断它们的坐标是否相等。参见http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm。
>
> 值得注意的是，坐标的顺序没有影响，只要全部坐标对的对应相等，就认为是相等的坐标

**参数**

| 参数     | 类型              | 描述    |
| :------- | :---------------- | :------ |
| feature1 | Geometry\|Feature | GeoJSON |
| feature2 | Geometry\|Feature | GeoJSON |

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

var pt1 = turf.polygon([
  [
    [114.11207138646921, 40.065237806396226],
    [116.72681748022632, 37.74008299506812],
    [117.2981065427258, 40.28349411053313],
    [114.11207138646921, 40.065237806396226]
  ]
]);
var pt2 = turf.polygon([
  [
    [117.2981065427258, 40.28349411053313],
    [116.72681748022632, 37.74008299506812],
    [114.11207138646921, 40.065237806396226],
    [117.2981065427258, 40.28349411053313]
  ]
]);

var boolean = turf.booleanEqual(pt1, pt2); // true，坐标顺序不影响
```