# 聚类累加(clusterReduce)

> Reduce clusters in GeoJSON Features, similar to Array.reduce()
> 在GeoJSON`Feature`中减少聚类，类似于`Array.reduce()`

```text
> npm install @turf/clusters
```

**参数**

| 参数         | 类型              | 描述                                                         |
| :----------- | :---------------- | :----------------------------------------------------------- |
| geojson      | FeatureCollection | GeoJSON Features                                             |
| property     | (string\|number)  | GeoJSON property key/value used to create clusters           |
| callback     | Function          | a method that takes (previousValue, cluster, clusterValue, currentIndex) |
| initialValue | (*)               | Value to use as the first argument to the first call of the callback. |

**返回**

- The value that results from the reduction.

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