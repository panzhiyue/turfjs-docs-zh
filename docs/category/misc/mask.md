# 返回非遮罩多边形(mask)

> Takes any type of polygon and an optional mask and returns a polygon exterior ring with holes.
> 获取任意类型的多边形和一个可选的遮罩，并返回一个带孔的多边形外部环。

**参数**

| 参数    | 类型                                                      | 描述                                                         |
| :------ | :-------------------------------------------------------- | :----------------------------------------------------------- |
| polygon | (`FeatureCollection`|`Feature <(Polygon\|MultiPolygon)>`) | GeoJSON Polygon used as interior rings or holes.             |
| mask    | (`Feature <Polygon>`)                                     | GeoJSON Polygon used as the exterior ring (if undefined, the world extent is used) |

**返回**

`Feature <Polygon>` - Masked Polygon (exterior ring with holes).

**示例**

```js
var polygon = turf.polygon([[[112, -21], [116, -36], [146, -39], [153, -24], [133, -10], [112, -21]]]);
var mask = turf.polygon([[[90, -55], [170, -55], [170, 10], [90, 10], [90, -55]]]);

var masked = turf.mask(polygon, mask);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/mask.61ef78d5.webp)