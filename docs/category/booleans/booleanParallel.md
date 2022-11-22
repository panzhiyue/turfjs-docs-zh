# 判断是否平行(booleanParallel)

```
> npm install @turf/boolean-parallel
```

> Boolean-Parallel returns True if each segment of line1 is parallel to the correspondent segment of line2
>
> 接收两个线要素，判断它们是否平行

**参数**

| 参数  | 类型                                | 描述                        |
| :---- | :---------------------------------- | :-------------------------- |
| line1 | `Geometry|Feature<LineString>` |线要素 |
| line2 | `Geometry|Feature<LineString>` |线要素 |

**返回**

boolean - true/false if the lines are parallel

**示例**

```js
var line1 = turf.lineString([[0, 0], [0, 1]]);
var line2 = turf.lineString([[1, 0], [1, 1]]);

turf.booleanParallel(line1, line2);
//=true
```