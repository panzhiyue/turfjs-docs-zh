# 随机多边形(randomPolygon)

```
> npm install @turf/random
```

> Returns a random polygon.
> 接收指定的数量，随机生成并返回在指定边界框内的面要素集(`FeatureCollect<Polygon>`)

**参数**

| 参数    | 类型   | 描述           |
| :------ | :----- | :------------- |
| count   | number | 生成要素的数量 |
| options | Object | 可配置项       |

**options选项**

| 属性              | 类型   | 默认值            | 描述                                                       |
| :---------------- | :----- | :---------------- | :--------------------------------------------------------- |
| bbox              | Array  | [-180,-90,180,90] | 边界框                                                     |
| num_vertices      | number | 10                | 每个要素包含的坐标数量                                     |
| max_radial_length | number | 10                | 坐标点相对于该面要素的中心点的最大经度或纬度，单位为十进制 |

**返回**

`FeatureCollection <Polygon>` - GeoJSON FeatureCollection of polygons

`FeatureCollection <Polygon>` - 面要素集

**示例**

```js
var polygons = turf.randomPolygon(25, { bbox: [-180, -90, 180, 90] }); // 25个面要素集合
```