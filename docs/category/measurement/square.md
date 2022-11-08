# 根据边界计算最小正方形边界(square)

> Takes a bounding box and calculates the minimum square bounding box that would contain the input.
> 获取边框并计算包含输入的最小正方形边框。

**参数**

| 参数 | 类型 | 描述                                     |
| :--- | :--- | :--------------------------------------- |
| bbox | BBox | extent in west, south, east, north order |

**返回**

BBox - a square surrounding bbox

**示例**

```js
var bbox = [-20, -20, -15, 0];
var squared = turf.square(bbox);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/square.09e05daf.webp)