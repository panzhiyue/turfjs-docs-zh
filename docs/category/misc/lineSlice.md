# 根据点截取多线段(lineSlice)

```
> npm install @turf/line-slice
```

> Takes a line , a start Point , and a stop point and returns a subsection of the line in-between those points. The start & stop points don't need to fall exactly on the line.
> 接收一条线、起点和终点，并返回这些点之间的线段。

> 起止点不需要正好落在直线上，会计算出点到线最近的点

**参数**

| 参数    | 类型                    | 描述         |
| :------ | :---------------------- | :----------- |
| startPt | Coord\|`Feature<Point>` | 起点         |
| stopPt  | Coord\|`Feature<Point>` | 终点         |
| line    | `Feature <LineString>`  | 要裁切的线段 |

**返回**

`Feature <LineString>` - sliced line

`Feature <LineString>` - 裁切后的线段

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

var sliced = turf.lineSlice(start, stop, line); // 返回裁切的线段GeoJSON
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSlice.bbce2156.webp)