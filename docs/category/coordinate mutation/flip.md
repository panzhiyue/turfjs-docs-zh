# 翻转经纬度(flip)

> Takes input features and flips all of their coordinates from [x, y] to [y, x].
> 
> 获取输入`feature`并将它们的所有坐标从`[x, y]`翻转为`[y, x]`。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | input features                 |
| options | Object  | Optional parameters: see below |

**options选项**

| 属性   | 类型    | 默认值 | 描述                                                         |
| :----- | :------ | :----- | :----------------------------------------------------------- |
| mutate | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - a feature or set of features of the same type as input with flipped coordinates

**示例**

```js
var serbia = turf.point([20.566406, 43.421008]);

var saudiArabia = turf.flip(serbia);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/flip.ed33165b.webp)