# clustersDbscan

> Takes a set of points and partition them into clusters according to https://en.wikipedia.org/wiki/DBSCAN data clustering algorithm.
> 获取一组点，并根据 [DBSCAN (opens new window)](https://baike.baidu.com/item/DBSCAN/4864716?fr=aladdin)聚类算法将它们聚类划分。

**参数**

| 参数        | 类型                        | 描述                                                         |
| :---------- | :-------------------------- | :----------------------------------------------------------- |
| points      | `FeatureCollection <Point>` | to be clustered                                              |
| maxDistance | number                      | Maximum Distance between any point of the cluster to generate the clusters (kilometers only) |
| options     | Object                      | Optional parameters: see below                               |

**options选项**

| 属性      | 类型    | 默认值     | 描述                                                         |
| :-------- | :------ | :--------- | :----------------------------------------------------------- |
| units     | string  | kilometers | in which                                                     |
| mutate    | boolean | false      | Allows GeoJSON input to be mutated                           |
| minPoints | number  | 3          | Minimum number of points to generate a single cluster, points which do not meet this requirement will be classified as an 'edge' or 'noise'. |

**返回**

`FeatureCollection <Point>` - Clustered Points with an additional two properties associated to each Feature:

**示例**

```js
// create random points with random z-values in their properties
var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
var maxDistance = 100;
var clustered = turf.clustersDbscan(points, maxDistance);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/clustersDbscan.6f0ee268.webp)