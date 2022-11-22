# 判断是否是顺时针(booleanClockwise)

```
> npm install @turf/boolean-clockwise
```

> Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
> 接收一个 type 为 LineString 的线要素，判断该要素是否顺时针走向

**参数**

| 参数 | 类型                   | 描述   |
| :--- | :--------------------- | :----- |
| line | `Feature <LineString>` | 线要素 |

**返回**

boolean - true/false

**示例**

```js
var clockwiseRing = turf.lineString([[0,0],[1,1],[1,0],[0,0]]);
var counterClockwiseRing = turf.lineString([[0,0],[1,0],[1,1],[0,0]]);

turf.booleanClockwise(clockwiseRing)
//=true
turf.booleanClockwise(counterClockwiseRing)
//=false
```