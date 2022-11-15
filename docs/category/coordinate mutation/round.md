# 四舍五入(round)

> Round number to precision
> 
> 可以指定精度的四舍五入

```text
> npm install @turf/helpers
```

**参数**

| 参数      | 类型   | 描述      |
| :-------- | :----- | :-------- |
| num       | number | Number    |
| precision | number | Precision |

**返回**

number - rounded number

**示例**

```js
turf.round(120.4321)
//=120

turf.round(120.4321, 2)
//=120.43
```