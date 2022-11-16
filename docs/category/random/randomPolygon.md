# randomPolygon

> Returns a random polygon.
> 返回一个随机`Polygon`

```text
> npm install @turf/random
```

**参数**

| 参数    | 类型   | 描述                                  |
| :------ | :----- | :------------------------------------ |
| count   | number | how many geometries will be generated |
| options | Object | Optional parameters: see below        |

**options选项**

| 属性              | 类型   | 默认值            | 描述                                                         |
| :---------------- | :----- | :---------------- | :----------------------------------------------------------- |
| bbox              | Array  | [-180,-90,180,90] | a bounding box inside of which geometries are placed.        |
| num_vertices      | number | 10                | is how many coordinates each LineString will contain.        |
| max_radial_length | number | 10                | is the maximum number of decimal degrees latitude or longitude that a vertex can reach out of the center of the Polygon. |

**返回**

`FeatureCollection <Point>` - GeoJSON FeatureCollection of points

**示例**

```js
var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})
//=polygons
```