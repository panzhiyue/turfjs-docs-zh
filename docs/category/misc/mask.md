# 返回遮罩多边形(mask)

```
> npm install @turf/mask
```

> Takes any type of polygon and an optional mask and returns a polygon exterior ring with holes.
> 接收一个 type 为 polygon 或 MultiPolygon 的面要素，作为内圈。返回一个挖孔的面要素作为遮罩

**参数**

| 参数    | 类型                                              | 描述                                           |
| :------ | :------------------------------------------------ | :--------------------------------------------- |
| polygon | `FeatureCollection|Feature<Polygon|MultiPolygon>` | 面要素，作为遮罩内圈                           |
| mask    | `Feature <Polygon>`                               | 可选项，作为遮罩外圈，不传则以世界范围作为外圈 |

**返回**

`Feature <Polygon>` - Masked Polygon (exterior ring with holes).

`Feature <Polygon>` - 蒙版多边形（带孔的外环）。

**示例**

```js
var polygon = turf.polygon([[[112, -21], [116, -36], [146, -39], [153, -24], [133, -10], [112, -21]]]);
var mask = turf.polygon([[[90, -55], [170, -55], [170, 10], [90, 10], [90, -55]]]);

var masked = turf.mask(polygon, mask);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/mask.61ef78d5.webp)