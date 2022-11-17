# 随机点(randomPoint)

> Returns a random point.
> 返回一个随机`Point`

```text
> npm install @turf/random
```

**参数**

| 参数    | 类型   | 描述                                  |
| :------ | :----- | :------------------------------------ |
| count   | number | how many geometries will be generated |
| options | Object | Optional parameters: see below        |

**options选项**

| 属性 | 类型  | 默认值            | 描述                                                  |
| :--- | :---- | :---------------- | :---------------------------------------------------- |
| bbox | Array | [-180,-90,180,90] | a bounding box inside of which geometries are placed. |

**返回**

`FeatureCollection <Point>` - GeoJSON FeatureCollection of points

**示例**

```js
var points = turf.randomPoint(25, {bbox: [-180, -90, 180, 90]})
//=points
```