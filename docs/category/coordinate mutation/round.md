# 四舍五入(round)

```
npm install @turf/helpers
```

> Round number to precision
> 
> 接收入参的数字和精确度数，返回四舍五入后的数字

**参数**

| 参数      | 类型   | 描述                               |
| :-------- | :----- | :--------------------------------- |
| num       | number | 需要四舍五入的数字                 |
| precision | number | 坐标的小数点精确位数，不传则不保留 |

**返回**

number - rounded number

number - 四舍五入后的数值

**示例**

```js
turf.round(120.4321)
//=120

turf.round(120.4321, 2)
//=120.43
```