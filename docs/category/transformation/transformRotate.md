# 旋转(transformRotate)

> Rotates any geojson Feature or Geometry of a specified angle, around its centroid or a given pivot point; all rotations follow the right-hand rule: https://en.wikipedia.org/wiki/Right-hand_rule
> 
> 旋转任何geojson`Feature`或几何学的一个指定的角度，围绕其质心或一个给定的枢轴点;所有的旋转都遵循右手规则:https://en.wikipedia.org/wiki/righthand_rule

**参数**

| 参数    | 类型    | 描述                                                         |
| :------ | :------ | :----------------------------------------------------------- |
| geojson | GeoJSON | object to be rotated                                         |
| angle   | number  | of rotation (along the vertical axis), from North in decimal degrees, negative clockwise |
| options | Object  | Optional parameters: see below                               |

**options选项**

| 属性   | 类型    | 默认值   | 描述                                                         |
| :----- | :------ | :------- | :----------------------------------------------------------- |
| pivot  | Coord   | centroid | point around which the rotation will be performed            |
| mutate | boolean | false    | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - the rotated GeoJSON feature

**示例**

```js
var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
var options = {pivot: [0, 25]};
var rotatedPoly = turf.transformRotate(poly, 10, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformRotate.a9355690.webp)