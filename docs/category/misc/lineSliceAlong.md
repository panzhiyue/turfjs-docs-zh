# lineSliceAlong

> Takes a line , a specified distance along the line to a start Point , and a specified distance along the line to a stop point and returns a subsection of the line in-between those points.
> 取一条线，沿该线到起始点的指定距离，以及沿该线到终止点的指定距离，并返回这些点之间的该线的分段。

**参数**

| 参数      | 类型                                 | 描述                                      |
| :-------- | :----------------------------------- | :---------------------------------------- |
| line      | (`Feature <LineString>`\|LineString) | input line                                |
| startDist | number                               | distance along the line to starting point |
| stopDist  | number                               | distance along the line to ending point   |
| options   | Object                               | Optional parameters: see below            |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                          |
| :---- | :----- | :--------- | :-------------------------------------------- |
| units | string | kilometers | can be degrees, radians, miles, or kilometers |

**返回**

`Feature <LineString>` - sliced line

**示例**

```js
var line = turf.lineString([[7, 45], [9, 45], [14, 40], [14, 41]]);
var start = 12.5;
var stop = 25;
var sliced = turf.lineSliceAlong(line, start, stop, {units: 'miles'});
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSliceAlong.e16ac166.webp)