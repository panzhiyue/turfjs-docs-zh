# shortestPath

> Returns the shortest path from start to end without colliding with any Feature in obstacles
> 返回从头到尾的最短路径，而不与障碍物中的任何`Feature`发生碰撞

**参数**

| 参数    | 类型   | 描述                           |
| :------ | :----- | :----------------------------- |
| start   | Coord  | point                          |
| end     | Coord  | point                          |
| options | Object | Optional parameters: see below |

**options选项**

| 属性        | 类型                                                | 默认值     | 描述                                                         |
| :---------- | :-------------------------------------------------- | :--------- | :----------------------------------------------------------- |
| obstacles   | `Geometry`|`Feature`|`FeatureCollection <Polygon>`) |            | areas which path cannot travel                               |
| minDistance | (number)                                            |            | minimum distance between shortest path and obstacles         |
| units       | string                                              | kilometers | unit in which resolution & minimum distance will be expressed in; it can be degrees, radians, miles, kilometers, ... |
| resolution  | number                                              | 100        | distance between matrix points on which the path will be calculateds |

**返回**

`Feature <LineString>` - shortest path between start and end

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