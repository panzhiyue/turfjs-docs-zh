# 获取类型(getType)

> Get GeoJSON object's type, Geometry type is prioritize.
> 获取GeoJSON对象的类型，几何类型是优先级。

```text
> npm install @turf/invariant
```

**参数**

| 参数    | 类型    | 描述                                             |
| :------ | :------ | :----------------------------------------------- |
| geojson | GeoJSON | input GeoJSON feature(s)                         |
| name    | string  | name of the variable to display in error message |

**返回**

string - GeoJSON type

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
var geom = turf.getType(point)
//="Point"
```