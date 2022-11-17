# geojsonType

> Enforce expectations about types of GeoJSON objects for Turf.
> 强化对`GeoJSON`对象类型的期望。

```text
> npm install @turf/invariant
```

**参数**

| 参数  | 类型    | 描述                     |
| :---- | :------ | :----------------------- |
| value | GeoJSON | any GeoJSON object       |
| type  | string  | expected GeoJSON type    |
| name  | string  | name of calling function |

**示例**

```js
var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});

turf.geojsonType(locationA.geometry, 'Point', 'Location A');
```