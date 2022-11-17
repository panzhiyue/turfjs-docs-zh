# 随机线段(randomLineString)

> Returns a random linestring.
> 返回一个随机的`LineString`

```text
> npm install @turf/random
```

**参数**

| 参数    | 类型   | 描述                                  |
| :------ | :----- | :------------------------------------ |
| count   | number | how many geometries will be generated |
| options | Object | Optional parameters: see below        |

**options选项**

| 属性         | 类型   | 默认值            | 描述                                                         |
| :----------- | :----- | :---------------- | :----------------------------------------------------------- |
| bbox         | Array  | [-180,-90,180,90] | a bounding box inside of which geometries are placed.        |
| num_vertices | number | 10                | is how many coordinates each LineString will contain.        |
| max_length   | number | 0.0001            | is the maximum number of decimal degrees that a vertex can be from its predecessor |
| max_rotation | number | Math.PI/8         | is the maximum number of radians that a line segment can turn from the previous segment. |

**返回**

`FeatureCollection <Point>` - GeoJSON FeatureCollection of points

**示例**

```js
var lineStrings = turf.randomLineString(25, {bbox: [-180, -90, 180, 90]})
//=lineStrings
```