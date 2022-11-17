# booleanClockwise

> Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
> 取一个环，无论环是顺时针还是逆时针，都返回真或假。

```text
> npm install @turf/boolean-clockwise
```

**参数**

| 参数 | 类型                   | 描述            |
| :--- | :--------------------- | :-------------- |
| line | `Feature <LineString>` | to be evaluated |

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