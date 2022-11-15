# lineSlice

> Takes a line , a start Point , and a stop point and returns a subsection of the line in-between those points. The start & stop points don't need to fall exactly on the line.
> 获取一条线、起点和终点，并返回这些点之间的线段。起止点不需要正好落在直线上。

**参数**

| 参数    | 类型                                 | 描述           |
| :------ | :----------------------------------- | :------------- |
| startPt | Coord                                | starting point |
| stopPt  | Coord                                | stopping point |
| line    | (`Feature <LineString>`\|LineString) | line to slice  |

**返回**

`Feature <LineString>` - sliced line

**示例**

```js
var line = turf.lineString([
    [-77.031669, 38.878605],
    [-77.029609, 38.881946],
    [-77.020339, 38.884084],
    [-77.025661, 38.885821],
    [-77.021884, 38.889563],
    [-77.019824, 38.892368]
]);
var start = turf.point([-77.029609, 38.881946]);
var stop = turf.point([-77.021884, 38.889563]);

var sliced = turf.lineSlice(start, stop, line);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSlice.bbce2156.webp)