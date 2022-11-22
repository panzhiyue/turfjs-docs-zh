# 随机点(randomPoint)

```
> npm install @turf/random
```

> Returns a random point.
> 接收指定的数量，随机生成并返回在指定边界框内的线要素集(`FeatureCollect<Point>`)

**参数**

| 参数    | 类型   | 描述           |
| :------ | :----- | :------------- |
| count   | number | 生成要素的数量 |
| options | Object | 可配置项       |

**options选项**

| 属性 | 类型  | 默认值            | 描述   |
| :--- | :---- | :---------------- | :----- |
| bbox | Array | [-180,-90,180,90] | 边界框 |

**返回**

`FeatureCollection <Point>` - GeoJSON FeatureCollection of points

`FeatureCollection <Point>` - 点要素集

**示例**

```js
var points = turf.randomPoint(25, { bbox: [-180, -90, 180, 90] }); // 25个点要素集合
```