# 多边形划分三角形(tesselate)

> Tesselates a Feature into a FeatureCollection of triangles using earcut.
> 
> 使用 [earcut (opens new window)](https://www.npmjs.com/package/earcut)算法将`Feature`细分为`FeatureCollection`三角形。

**参数**

| 参数 | 类型                | 描述                     |
| :--- | :------------------ | :----------------------- |
| poly | `Feature <Polygon>` | the polygon to tesselate |

**返回**

`FeatureCollection <Polygon>` - a geometrycollection feature

**示例**

```js
var poly = turf.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
var triangles = turf.tesselate(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tesselate.bdcde9ba.webp)