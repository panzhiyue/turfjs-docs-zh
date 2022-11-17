# 随机位置(randomPosition)

> Returns a random position within a box.
> 返回边界内的随机位置

```text
> npm install @turf/random
```

**参数**

| 参数 | 类型  | 描述                                                 |
| :--- | :---- | :--------------------------------------------------- |
| bbox | Array | a bounding box inside of which positions are placed. |

**返回**

Array - Position longitude, latitude

**示例**

```js
var position = turf.randomPosition([-180, -90, 180, 90])
//=position
```