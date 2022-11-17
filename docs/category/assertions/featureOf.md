# feature类型(featureOf)

> Enforce expectations about types of Feature inputs for Turf. Internally this uses geojsonType to judge geometry types.
> 加强对`Feature`类型的期望。在内部，它使用geojsonType来判断几何类型。

```text
> npm install @turf/invariant
```

**参数**

| 参数    | 类型    | 描述                                     |
| :------ | :------ | :--------------------------------------- |
| feature | Feature | a feature with an expected geometry type |
| type    | string  | expected GeoJSON type                    |
| name    | string  | name of calling function                 |

**示例**

```js
var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});

turf.featureOf(linestring1, 'LineString', 'line 1');
```