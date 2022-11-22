# 返回指定数量的点(sample)

```
> npm install @turf/sample
```

> Takes a FeatureCollection and returns a FeatureCollection with given number of features at random.
> 接收一个任意的要素集(FeatureCollection)，随机挑选出指定数量的要素并以要素集的格式返回
>
> 值得注意的是，当入参的指定数量大于要素集本身长度，features 有可能会返回 undefined



**参数**

| 参数              | 类型              | 描述         |
| :---------------- | :---------------- | :----------- |
| featurecollection | FeatureCollection | 要素集       |
| num               | number            | 要返回的数量 |

**返回**

`FeatureCollection` - a FeatureCollection with n features

`FeatureCollection` - 要素集

**示例**

```js
var points = turf.randomPoint(100, { bbox: [-80, 30, -60, 60] });

var sample = turf.sample(points, 5);

var sample2 = turf.sample(points, 200);
/*
{
  type: "FeatureCollection",
  features: [undefined, {...全部100个点要素}]
}
*/
```