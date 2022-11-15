# 缩放(transformScale)

> Scale a GeoJSON from a given point by a factor of scaling (ex: factor=2 would make the GeoJSON 200% larger). If a FeatureCollection is provided, the origin point will be calculated based on each individual Feature.
> 
> 从一个给定的点缩放GeoJSON(例如:factor=2将使GeoJSON增大200%)。如果提供了`FeatureCollection`，则将根据每个单独的`Feature`计算原点。

**参数**

| 参数    | 类型    | 描述                                                   |
| :------ | :------ | :----------------------------------------------------- |
| geojson | GeoJSON | GeoJSON to be scaled                                   |
| factor  | number  | of scaling, positive or negative values greater than 0 |
| options | Object  | Optional parameters: see below                         |

**options选项**

| 属性   | 类型             | 默认值                                                       | 描述     |
| :----- | :--------------- | :----------------------------------------------------------- | :------- |
| origin | (string          | Coord)                                                       | centroid |
| mutate | boolean \| false | allows GeoJSON input to be mutated (significant performance increase if true) |          |

**返回**

GeoJSON - scaled GeoJSON

**示例**

```js
var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
var scaledPoly = turf.transformScale(poly, 3);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformScale.3ae75920.webp)