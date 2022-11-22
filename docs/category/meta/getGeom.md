# 获取几何对象(getGeom)

```
> npm install @turf/invariant
```

> Get Geometry from Feature or Geometry Object
>
> 接收任意类型的GeoJSON对象，返回改要素的Geometry
>
> 值得注意的是，如果不是 GeoJSON，该方法返回入参本身的值

**参数**

| 参数    | 类型              | 描述              |
| :------ | :---------------- | :---------------- |
| geojson | Feature\|Geometry | 任意 GeoJSON 对象 |

**返回**

Geometry|null - GeoJSON Geometry Object

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
var geom = turf.getGeom(point);
//={"type": "Point", "coordinates": [110, 40]}

turf.getGeom("wrong"); // 'wrong'
```