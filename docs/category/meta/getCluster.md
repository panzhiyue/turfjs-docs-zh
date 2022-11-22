# 获取聚类(getCluster)

```
> npm install @turf/clusters
```

> Get Cluster
> 接收要素集`FeatureCollection`，过滤指定属性的要素并返回要素集



**参数**

| 参数    | 类型              | 描述                 |
| :------ | :---------------- | :------------------- |
| geojson | FeatureCollection | GeoJSON 要素集       |
| filter  | *                 | 用于获取群集的筛选器 |

**返回**

FeatureCollection - 过滤后的要素集

**示例**

```js
var geojson = turf.featureCollection([
    turf.point([0, 0], {'marker-symbol': 'circle'}),
    turf.point([2, 4], {'marker-symbol': 'star'}),
    turf.point([3, 6], {'marker-symbol': 'star'}),
    turf.point([5, 1], {'marker-symbol': 'square'}),
    turf.point([4, 2], {'marker-symbol': 'circle'})
]);

// 使用 K-Means 创建聚类 (添加 cluster 到GeoJSON属性)
var clustered = turf.clustersKmeans(geojson);

// 检索第一个聚类 (0)
var cluster = turf.getCluster(clustered, {cluster: 0});
//= cluster

// 基于自定义属性检索聚类
turf.getCluster(clustered, {'marker-symbol': 'circle'}).length;
//= 2
turf.getCluster(clustered, {'marker-symbol': 'square'}).length;
//= 1
```