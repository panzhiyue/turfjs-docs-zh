# 重新定义环顺序(rewind)

> Rewind (Multi)LineString or (Multi)Polygon outer ring counterclockwise and inner rings clockwise (Uses Shoelace Formula ).
> 
> `LineString`或`Polygon`外圈逆时针`Rewind`，内圈顺时针`Rewind`(采用[Shoelace formula公式 (opens new window)](https://blog.csdn.net/zhangll98/article/details/84150535))。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | input GeoJSON Polygon          |
| options | Object  | Optional parameters: see below |

**options选项**

| 属性    | 类型    | 默认值 | 描述                                                         |
| :------ | :------ | :----- | :----------------------------------------------------------- |
| reverse | boolean | false  | enable reverse winding                                       |
| mutate  | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - rewind Polygon

**示例**

```js
var polygon = turf.polygon([[[121, -29], [138, -29], [138, -18], [121, -18], [121, -29]]]);

var rewind = turf.rewind(polygon);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/rewind.91a2c211.webp)