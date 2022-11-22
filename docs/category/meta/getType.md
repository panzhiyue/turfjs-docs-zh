# 获取类型(getType)

```
> npm install @turf/invariant
```

> Get GeoJSON object's type, Geometry type is prioritize.
>
> 接收任意类型的GeoJSON对象，返回该要素的类型
>
> 值得注意的是，如果是要素，返回类型优先是 Geometry 的 type，如果是要素集，返回类型优先是要素集的 type



**参数**

| 参数    | 类型    | 描述                                   |
| :------ | :------ | :------------------------------------- |
| geojson | GeoJSON | 任意 GeoJSON 对象                      |
| name    | string  | 在报错消息中展示的变量名，目前暂未使用 |

**返回**

string - GeoJSON type

**示例**

```js
var point = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Point",
    coordinates: [110, 40]
  }
};
var geom = turf.getType(point);
//="Point"

turf.getType({
  type: "FeatureCollection",
  faetures: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [1, 2]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [1, 2],
          [3, 4]
        ]
      }
    }
  ]
}); // "FeatureCollection"
```