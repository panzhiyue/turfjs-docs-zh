# 集合类型(collectionOf)

```
> npm install @turf/invariant
```

> Enforce expectations about types of FeatureCollection inputs for Turf. Internally this uses geojsonType to judge geometry types.
>
> 接收一组要素集合和要素的 type 类型，验证该要素集的要素是否符合传入的 type。在内部，它使用`geojsonType`来判断几何类型。
>
> 值得注意的是，该方法没有返回值，没有报错证错证明方法通过，name 属性目前虽没有验证，但是必填字段

**参数**

| 参数              | 类型              | 描述                     |
| :---------------- | :---------------- | :----------------------- |
| featureCollection | FeatureCollection | 要素集                   |
| type              | string            | 校验的要素类型           |
| name              | string            | name of calling function |

**返回**

无

**示例**

```js
var pt1 = turf.point([5, 5], { population: 200 });
var pt2 = turf.point([1, 3], { population: 600 });
var pt3 = turf.point([14, 2], { population: 100 });
var pt4 = turf.point([13, 1], { population: 200 });
var pt5 = turf.point([19, 7], { population: 300 });
var pointFC = turf.featureCollection([pt1, pt2, pt3, pt4, pt5]);
var boolean = turf.collectionOf(pointFC, "LineString", "a"); // 报错
var boolean2 = turf.collectionOf(pointFC, "Point", "a"); // 不报错，boolean2 为 undefined
```