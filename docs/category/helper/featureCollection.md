# feature集合(featureCollection)

```
> npm install @turf/helpers
```

> Takes one or more Features and creates a FeatureCollection.
> 接收一个或多个`Feature`，创建并返回他们的要素集(`FeatureCollection`)。

**参数**

| 参数     | 类型              | 描述     |
| :------- | :---------------- | :------- |
| features | `Array <Feature>` | 要素数组 |
| options  | Object            | 可配置项 |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

FeatureCollection - FeatureCollection of Features

FeatureCollection - 要素集合

**示例**

```js
var locationA = turf.point([-75.343, 39.984], { name: "Location A" });
var locationB = turf.point([-75.833, 39.284], { name: "Location B" });
var locationC = turf.point([-75.534, 39.123], { name: "Location C" });

var collection = turf.featureCollection([locationA, locationB, locationC], {
  bbox: [1, 2, 3, 4],
  id: "id"
});
/*
{
  type: "FeatureCollection",
  features: [{...},{...},{...}],
  bbox: [1, 2, 3, 4] // 同级
  id: "id" // 同级
}
*/
```