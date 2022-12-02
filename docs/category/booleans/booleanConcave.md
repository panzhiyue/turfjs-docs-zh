# 判断是否为凹多边形(booleanConcave)

```
> npm install @turf/boolean-concave
```

> Takes a polygon and return true or false as to whether it is concave or not.
>
> 接收一个多边形，判断并返回它是否为凹多边形。
>
> 注意:6.5.0还未实现此方法

**参数**

| 参数    | 类型               | 描述   |
| :------ | :----------------- | :----- |
| polygon | Feature\<Polygon\> | 面要素 |

**返回**

boolean - true/false

**示例**

```js
var convexPolygon = turf.polygon([[[0,0],[0,1],[1,1],[1,0],[0,0]]]);

turf.booleanConcave(convexPolygon)
//=false
```

