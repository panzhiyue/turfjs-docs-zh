# 克隆(clone)

> Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'. ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
> 
> 返回传递的GeoJSON对象的克隆副本，包括可能的“外来成员”。比普通`JSON.parse`+ `JSON.stringify`组合方法快3-5倍。

```text
> npm install @turf/clone
```

**参数**

| 参数    | 类型    | 描述           |
| :------ | :------ | :------------- |
| geojson | GeoJSON | GeoJSON Object |

**返回**

GeoJSON - cloned GeoJSON Object

**示例**

```js
var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});

var lineCloned = turf.clone(line);
```