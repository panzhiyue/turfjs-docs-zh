# 计算中心点(center)

> Takes a Feature or FeatureCollection and returns the absolute center point of all features.
> 获取一个`Feature`或`FeatureCollection`，并返回所有`Feature`的绝对中心点。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | GeoJSON to be centered         |
| options | Object  | Optional parameters: see below |

**options选项**

| 属性       | 类型   | 默认值 | 描述                          |
| :--------- | :----- | :----- | :---------------------------- |
| properties | Object | {}     | an Object that is used as the |

**返回**

Feature `<Point>` - a Point feature at the absolute center point of all input features

**示例**

```js
var features = turf.featureCollection([
  turf.point( [-97.522259, 35.4691]),
  turf.point( [-97.502754, 35.463455]),
  turf.point( [-97.508269, 35.463245])
]);

var center = turf.center(features);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/center.57e658f3.webp)