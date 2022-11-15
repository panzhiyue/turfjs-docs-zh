# 平移(transformTranslate)

> Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line on the provided direction angle.
> 
> 在给定的方向角上沿沿恒向线移动指定距离的任何geojson`Feature`或几何图形。

**参数**

| 参数      | 类型    | 描述                                                         |
| :-------- | :------ | :----------------------------------------------------------- |
| geojson   | GeoJSON | object to be translated                                      |
| distance  | number  | length of the motion; negative values determine motion in opposite direction |
| direction | number  | of the motion; angle from North in decimal degrees, positive clockwise |
| options   | Object  | Optional parameters: see below                               |

**options选项**

| 属性         | 类型    | 默认值     | 描述                                                         |
| :----------- | :------ | :--------- | :----------------------------------------------------------- |
| units        | string  | kilometers | in which                                                     |
| zTranslation | number  | 0          | length of the vertical motion, same unit of distance         |
| mutate       | boolean | false      | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - the translated GeoJSON object

**示例**

```js
var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
var translatedPoly = turf.transformTranslate(poly, 100, 35);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformTranslate.8a54e043.webp)