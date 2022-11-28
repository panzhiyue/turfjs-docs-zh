# 克隆(clone)

```
> npm install @turf/clone
```

> Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'. ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
> 
> 返回传递的GeoJSON对象的克隆副本，包括可能的“外来成员”。比普通`JSON.parse`+ `JSON.stringify`组合方法快3-5倍。

**参数**

| 参数    | 类型                                     | 描述             |
| :------ | :--------------------------------------- | :--------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 需要深拷贝的要素 |

**返回**

[GeoJSON](../other/type.html#allgeojson) - cloned GeoJSON Object

[GeoJSON](../other/type.html#allgeojson) - 克隆后的GeoJSON对象

**示例**

```js
var line = turf.lineString(
  [
    [-74, 40],
    [-78, 42],
    [-82, 35]
  ],
  { color: "red" }
);

var lineCloned = turf.clone(line);

line.randomAttr = "Turf";
var lineCloned2 = turf.clone(line);
/*
{
  ...line,
  randomAttr: "Turf" // 多了个(Foreign Members)属性
}
*/
```