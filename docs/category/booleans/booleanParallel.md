# booleanParallel

> Boolean-Parallel returns True if each segment of line1 is parallel to the correspondent segment of line2
> 如果line1的每个线段与line2的对应线段平行，则返回True。

```text
> npm install @turf/boolean-parallel
```

**参数**

| 参数  | 类型                                | 描述                        |
| :---- | :---------------------------------- | :-------------------------- |
| line1 | (`Geometry`|`Feature <LineString>`) | GeoJSON Feature or Geometry |
| line2 | (`Geometry`|`Feature <LineString>`) | GeoJSON Feature or Geometry |

**返回**

boolean - true/false if the lines are parallel

**示例**

```js
var line1 = turf.lineString([[0, 0], [0, 1]]);
var line2 = turf.lineString([[1, 0], [1, 1]]);

turf.booleanParallel(line1, line2);
//=true
```