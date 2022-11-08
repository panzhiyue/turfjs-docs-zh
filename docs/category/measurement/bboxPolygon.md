# 计算边界多边形(bboxPolygon)

> Takes a bbox and returns an equivalent polygon.
> 获取一个`bbox`并返回一个等价的多边形。

**参数**

| 参数    | 类型     | 描述                                   |
| :------ | :------- | :------------------------------------- |
| bbox    | BBox     | extent in minX, minY, maxX, maxY order |
| options | (Object) | Optional parameters: see below         |

**options选项**

| 属性       | 类型             | 默认值 | 描述                            |
| :--------- | :--------------- | :----- | :------------------------------ |
| properties | Properties       | {}     | Translate properties to Polygon |
| id         | (string\|number) | {}     | Translate Id to Polygon         |

**返回**

Feature `<Polygon>` - a Polygon representation of the bounding box

**示例**

```js
var bbox = [105.361046, 35.356724, 111.59974, 30.934089]; // 左上右下经纬度

var poly = turf.bboxPolygon(bbox);
```

npm install @turf/bbox-polygon