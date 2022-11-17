# getGeom

> Get Geometry from Feature or Geometry Object
> 从`Feature`或几何对象获得几何

```text
> npm install @turf/invariant
```

**参数**

| 参数    | 类型                | 描述                               |
| :------ | :------------------ | :--------------------------------- |
| geojson | (Feature\|Geometry) | GeoJSON Feature or Geometry Object |

**返回**

(Geometry|null) - GeoJSON Geometry Object

**示例**

```js
var point = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [110, 40]
  }
}
var geom = turf.getGeom(point)
//={"type": "Point", "coordinates": [110, 40]}
```