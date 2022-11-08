# 计算多段线长度(length)

> Takes a GeoJSON and measures its length in the specified units, (Multi)Point 's distance are ignored.
> 取一个GeoJSON并以指定的单位测量其长度，(Multi)Point的距离被忽略。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | GeoJSON to measure             |
| options | Object  | Optional parameters: see below |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                          |
| :---- | :----- | :--------- | :-------------------------------------------- |
| units | string | kilometers | can be degrees, radians, miles, or kilometers |

**返回**

number - length of GeoJSON

**示例**

```js
var line = turf.lineString([[115, -32], [131, -22], [143, -25], [150, -34]]);
var length = turf.length(line, {units: 'miles'});
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/length.c8974652.webp)
