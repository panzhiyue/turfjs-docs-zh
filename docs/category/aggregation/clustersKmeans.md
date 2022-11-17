# K-Means聚类算法(clustersKmeans)

> Takes a set of points and partition them into clusters using the k-mean. It uses the k-means algorithm
> 获取一组点，并使用[K-Means聚类算法 (opens new window)](https://baike.baidu.com/item/K均值聚类算法/15779627?fr=aladdin)将它们聚类划分。

**参数**

| 参数    | 类型                        | 描述                           |
| :------ | :-------------------------- | :----------------------------- |
| points  | `FeatureCollection <Point>` | to be clustered                |
| options | Object                      | Optional parameters: see below |

**options选项**

| 属性             | 类型    | 默认值                      | 描述                                                         |
| :--------------- | :------ | :-------------------------- | :----------------------------------------------------------- |
| numberOfClusters | number  | Math.sqrt(numberOfPoints/2) | numberOfClusters that will be generated                      |
| mutate           | boolean | false                       | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

`FeatureCollection <Point>` - Clustered Points with an additional two properties associated to each Feature:

**示例**

```js
// create random points with random z-values in their properties
var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
var options = {numberOfClusters: 7};
var clustered = turf.clustersKmeans(points, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/clustersKmeans.bf591a67.webp)