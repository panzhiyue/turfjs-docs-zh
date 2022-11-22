# 聚类累加(clusterReduce)

```
> npm install @turf/clusters
```

> Reduce clusters in GeoJSON Features, similar to Array.reduce()
>
> 接收要素集`FeatureCollection`，遍历通过指定属性过滤后的要素集集群并累加操作

**参数**

| 参数         | 类型              | 描述                                                         |
| :----------- | :---------------- | :----------------------------------------------------------- |
| geojson      | FeatureCollection | GeoJSON 要素集                                               |
| property     | (string\|number)  | 用于过滤、区分要素集的属性值                                 |
| callback     | Function          | 回调，参数依次是 previousValue、cluster、clusterValue、currentIndex |
| initialValue | (*)               | 初始值                                                       |

**返回**

- \* - reduce 产生的值

**示例**

```js
var geojson = turf.featureCollection([
    turf.point([0, 0]),
    turf.point([2, 4]),
    turf.point([3, 6]),
    turf.point([5, 1]),
    turf.point([4, 2])
]);

// Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
var clustered = turf.clustersKmeans(geojson);

// Iterate over each cluster and perform a calculation
var initialValue = 0
turf.clusterReduce(clustered, 'cluster', function (previousValue, cluster, clusterValue, currentIndex) {
    //=previousValue
    //=cluster
    //=clusterValue
    //=currentIndex
    return previousValue++;
}, initialValue);

// Calculate the total number of clusters
var total = turf.clusterReduce(clustered, 'cluster', function (previousValue) {
    return previousValue++;
}, 0);

// Create an Array of all the values retrieved from the 'cluster' property
var values = turf.clusterReduce(clustered, 'cluster', function (previousValue, cluster, clusterValue) {
    return previousValue.concat(clusterValue);
}, []);
```