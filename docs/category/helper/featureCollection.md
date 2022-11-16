# featureCollection

> Takes one or more Features and creates a FeatureCollection.
> 获取一个或多个`Feature`并创建一个`FeatureCollection`。

```text
> npm install @turf/helpers
```

**参数**

| 参数     | 类型              | 描述                           |
| :------- | :---------------- | :----------------------------- |
| features | `Array <Feature>` | input features                 |
| options  | Object            | Optional parameters: see below |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

FeatureCollection - FeatureCollection of Features

**示例**

```js
var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});

var collection = turf.featureCollection([
  locationA,
  locationB,
  locationC
]);

//=collection
```