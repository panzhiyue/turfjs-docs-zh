# 根据距离截取多线段(lineSliceAlong)

```
> npm install @turf/line-slice-along
```

> Takes a line , a specified distance along the line to a start Point , and a specified distance along the line to a stop point and returns a subsection of the line in-between those points.
> 接收一条线段，起点距离，终点距离，计算并返回2点之间的线段。

> 值得注意的是，起点距离的点超过终点距离的点也没关系，只是坐标顺序相反而已

**参数**

| 参数      | 类型                   | 描述                   |
| :-------- | :--------------------- | :--------------------- |
| line      | `Feature <LineString>` | 要裁切的线段           |
| startDist | number                 | 沿起点在线上的指定距离 |
| stopDist  | number                 | 沿终点在线上的指定距离 |
| options   | Object                 | 可配置项               |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                                         |
| :---- | :----- | :--------- | :----------------------------------------------------------- |
| units | string | kilometers | 沿线距离的单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <LineString>` - sliced line

`Feature <LineString>` - 裁切后的线段

**示例**

```js
var line = turf.lineString([
  [7, 45],
  [9, 45],
  [14, 40],
  [14, 41]
]);
var start = 12.5;
var stop = 25;
var sliced = turf.lineSliceAlong(line, start, stop, { units: "miles" });
/*
{
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [7.25584134370955, 45.00194719009643],
      [7.511697527558178, 45.003323144337116]
    ]
  }
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSliceAlong.e16ac166.webp)