# 随机线段(randomLineString)

```
> npm install @turf/random
```

> Returns a random linestring.
> 接收指定的数量，随机生成并返回在指定边界框内的线要素集(`FeatureCollect<LineString>`)

**参数**

| 参数    | 类型   | 描述           |
| :------ | :----- | :------------- |
| count   | number | 生成要素的数量 |
| options | Object | 可配置项       |

**options选项**

| 属性         | 类型   | 默认值            | 描述                                                 |
| :----------- | :----- | :---------------- | :--------------------------------------------------- |
| bbox         | Array  | [-180,-90,180,90] | 边界框                                               |
| num_vertices | number | 10                | 每个要素包含的坐标数量                               |
| max_length   | number | 0.0001            | 坐标点相对于其前一个坐标点的最大的度数，单位为十进制 |
| max_rotation | number | Math.PI/8         | 坐标点相对于其前一个坐标点能形成的最大弧度           |

**返回**

`FeatureCollection <LineString>` - GeoJSON FeatureCollection of linestrings

`FeatureCollection <LineString>` - 线要素集

**示例**

```js
var lineStrings = turf.randomLineString(25, { bbox: [-180, -90, 180, 90] }); // 25个线要素集合
```