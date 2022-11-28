# 分解多边形(dissolve)

```
> npm install @turf/dissolve
```

> Dissolves a FeatureCollection of polygon features, filtered by an optional property name:value. Note that mulitpolygon features within the collection are not supported
> 
> 接收一个多边形的要素集合FeatureCollection，通过 properties 的某个属性进行分解，但是不支持 type 为 MultiPolygon 的多边形

> 值得注意的是，不传属性的时候返回原来的要素集合，不会进行分解

**参数**

| 参数              | 类型                                                         | 描述                 |
| :---------------- | :----------------------------------------------------------- | :------------------- |
| featureCollection | [FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\> | 需要被分解的要素集合 |
| options           | Object                                                       | 可配置项             |

**options选项**

| 属性         | 类型   | 默认值 | 描述                      |
| :----------- | :----- | :----- | :------------------------ |
| propertyName | string |        | properties 对象的某个属性 |

**返回**

  [FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\> - a FeatureCollection containing the dissolved polygons

  [FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\> - 分解后的多边形要素集

**示例**

```js
var features = turf.featureCollection([
  turf.polygon([[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]], {combine: 'yes'}),
  turf.polygon([[[0, -1], [0, 0], [1, 0], [1, -1], [0,-1]]], {combine: 'yes'}),
  turf.polygon([[[1,-1],[1, 0], [2, 0], [2, -1], [1, -1]]], {combine: 'no'}),
]);

var dissolved = turf.dissolve(features, {propertyName: 'combine'});
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/dissolve.4cafaccd.webp)