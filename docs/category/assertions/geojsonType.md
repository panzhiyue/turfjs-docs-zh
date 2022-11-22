# geojson类型(geojsonType)

```
> npm install @turf/invariant
```

> Enforce expectations about types of GeoJSON objects for Turf.
>
> 接收一个 GeoJSON，校验是否符合传入的 type
>
> 值得注意的是，该方法没有返回值，没有报错证错证明方法通过，name 属性目前虽没有验证，但是必填字段



**参数**

| 参数  | 类型    | 描述            |
| :---- | :------ | :-------------- |
| value | GeoJSON | 任意GeoJSON对象 |
| type  | string  | 校验的要素类型  |
| name  | string  | 校验的名字      |

**返回**

无

**示例**

```js
turf.geojsonType(
  {
    type: "Feature"
    geometry:{
      type: "Point",
      coordinates: [5, 5]
    }
  },
  "Feature",
  "a"
); // 没有报错

var pt1 = turf.point([5, 5], { population: 200 });
var pt2 = turf.point([1, 3], { population: 600 });
var pointFC = turf.featureCollection([pt1, pt2]);
var boolean = turf.geojsonType(pointFC, "FeatureCollection", "a"); // 没有报错
```