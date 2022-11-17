# 获取聚类(getCluster)

> Get Cluster
> 获取聚类

```text
> npm install @turf/clusters
```

**参数**

| 参数    | 类型              | 描述                                             |
| :------ | :---------------- | :----------------------------------------------- |
| geojson | FeatureCollection | GeoJSON Features                                 |
| filter  | *                 | Filter used on GeoJSON properties to get Cluster |

**返回**

FeatureCollection - Single Cluster filtered by GeoJSON Properties

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