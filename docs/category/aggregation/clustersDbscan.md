# Dbscan聚类算法(clustersDbscan)

```
> npm install @turf/clusters-dbscan
```

> Takes a set of points and partition them into clusters according to https://en.wikipedia.org/wiki/DBSCAN data clustering algorithm.
> 接收一个点要素集合，并根据 [DBSCAN (opens new window)](https://baike.baidu.com/item/DBSCAN/4864716?fr=aladdin)聚类算法将它们聚类划分，返回计算后的点要素集合。

**参数**

| 参数        | 类型                        | 描述                                       |
| :---------- | :-------------------------- | :----------------------------------------- |
| points      | `FeatureCollection <Point>` | 点要素集                                   |
| maxDistance | number                      | 生成集群中任何点之间的最大距离，单位为千米 |
| options     | Object                      | 可配置项                                   |

**options选项**

| 属性      | 类型    | 默认值       | 描述                                                         |
| :-------- | :------ | :----------- | :----------------------------------------------------------- |
| units     | string  | "kilometers" | 单位，可选的有 kilometers                                    |
| mutate    | boolean | false        | 是否返回入参的 GeoJSON，为 true 性能能显著提高               |
| minPoints | number  | 3            | 生成单个集群的最小点要素数量，不满足的点要素将被分类成噪声点(`noise`) |

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