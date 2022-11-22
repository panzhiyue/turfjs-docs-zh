# 去除自相交多边形(unkinkPolygon)

```
> npm install @turf/unkink-polygon
```

> Takes a kinked polygon and returns a feature collection of polygons that have no kinks. Uses simplepolygon internally.
> 接收一个有自相交的面要素(`Feature<Polygon|MultiPolygon>`)或面要素集合(`FeatureCollection<Polygon|MultiPolygon>`)，计算并返回没有自相交的面要素集合，如果入参没有自相交，则返回入参数据的要素集。内部使用simplepolygon算法。

**参数**

| 参数    | 类型                                                      | 描述                            |
| :------ | :-------------------------------------------------------- | :------------------------------ |
| geojson | `FeatureCollection|Feature<Polygon|MultiPolygon>` | |

**返回**

`FeatureCollection <Polygon>` - Unkinked polygons

**示例**

```js
var poly = turf.polygon([[[0, 0], [2, 0], [0, 2], [2, 2], [0, 0]]]);

var result = turf.unkinkPolygon(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/unkinkPolygon.f48ba212.webp)