# 分解多边形(dissolve)

> Dissolves a FeatureCollection of polygon features, filtered by an optional property name:value. Note that mulitpolygon features within the collection are not supported
> 
> 分解`Polygon`的一个`FeatureCollection`，通过一个可选的属性`name:value`来过滤。注意，不支持集合中的`MultiPolygon`

**参数**

| 参数              | 类型                          | 描述                                     |
| :---------------- | :---------------------------- | :--------------------------------------- |
| featureCollection | `FeatureCollection <Polygon>` | input feature collection to be dissolved |
| options           | Object                        | Optional parameters: see below           |

**options选项**

| 属性         | 类型   | 默认值 | 描述                                   |
| :----------- | :----- | :----- | :------------------------------------- |
| propertyName | string |        | features with equals 'propertyName' in |

**返回**

`FeatureCollection <Polygon>` - a FeatureCollection containing the dissolved polygons

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