# 计算最短路径(shortestPath)

```
> npm install @turf/shortest-path
```

> Returns the shortest path from start to end without colliding with any Feature in obstacles
> 接收两个点，返回这两个点的最短距离路径，且不与传入的障碍物碰撞

**参数**

| 参数    | 类型                    | 描述     |
| :------ | :---------------------- | :------- |
| start   | Coord\|`Feature<Point>` | 起点     |
| end     | Coord\|`Feature<Point>` | 重点     |
| options | Object                  | 可配置项 |

**options选项**

| 属性        | 类型                                          | 默认值     | 描述                                               |
| :---------- | :-------------------------------------------- | :--------- | :------------------------------------------------- |
| obstacles   | `Geometry|Feature|FeatureCollection<Polygon>` | `Feature`  | 路径无法通过的区域                                 |
| minDistance | (number)                                      |            | 路径与障碍物之间的最小距离(v5.1.6 暂不支持)        |
| units       | string                                        | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| resolution  | number                                        | 100        | 路径与障碍物之间的可以容忍的阈值距离               |

**返回**

`Feature <LineString>` - shortest path between start and end

`Feature <LineString>` - 最短路线线段

**示例**

```js
var start = [-5, -6];
var end = [9, -6];
var options = {
  obstacles: turf.polygon([[[0, -7], [5, -7], [5, -3], [0, -3], [0, -7]]])
};

var path = turf.shortestPath(start, end, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/shortestPath.e64f233c.webp)