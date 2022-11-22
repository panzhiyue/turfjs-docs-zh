# feature类型(featureOf)

```
> npm install @turf/invariant
```

> Enforce expectations about types of Feature inputs for Turf. Internally this uses geojsonType to judge geometry types.
>
> 接收一个要素和要素的 type 类型，验证该要素是否符合传入的 type。
>
> 值得注意的是，该方法没有返回值，没有报错证错证明方法通过，name 属性目前虽没有验证，但是必填字段



**参数**

| 参数    | 类型    | 描述           |
| :------ | :------ | :------------- |
| feature | Feature | feature        |
| type    | string  | 校验的要素类型 |
| name    | string  | 校验的名字     |

**返回**

无

**示例**

```js
turf.geojsonType(
  {
    type: "Feature"
    geometry:{
      type: "Point",
      coordinates: [5, 5]
    }
  },
  "Feature",
  "a"
); // 没有报错
```