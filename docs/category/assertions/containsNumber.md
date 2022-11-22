# 坐标是否包含数字(containsNumber)

```
> npm install @turf/invariant
```

> Checks if coordinates contains a number
> 接收一组坐标，判断坐标是否是数字类型。如果是一维数组，判断经纬度是否是数字，如果是多维数组，递归判断第一个子数组是否是数字类型

**参数**

| 参数        | 类型  | 描述 |
| :---------- | :---- | :--- |
| coordinates | Array | 坐标 |

**返回**

boolean - 如果数组包含数字，则为true

**示例**

```js
var boolean = turf.containsNumber([1, 2]); // true 判断1、2是否是数字

var boolean2 = turf.containsNumber([
  [3, 4],
  [5, 6]
]); // true 相当于是turf.containsNumber([3,4])
```



