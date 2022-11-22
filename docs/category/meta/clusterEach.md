# 聚类遍历(clusterEach)

```
> npm install @turf/clusters
```

> clusterEach
>
> 接收要素集`FeatureCollection`，遍历通过指定属性过滤后的要素集集群

**参数**

| 参数     | 类型              | 描述                                                         |
| :------- | :---------------- | :----------------------------------------------------------- |
| geojson  | FeatureCollection | GeoJSON 要素集                                               |
| property | string\|number    | 用于过滤、区分要素集的属性值                                 |
| callback | Function          | 回调，参数依次是 previousValue、currentProperties、featureIndex |

**返回**

undefined - undefined

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

// Iterate over each cluster
turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue, currentIndex) {
    //= cluster
    //= clusterValue
    //= currentIndex
})

// Calculate the total number of clusters
var total = 0
turf.clusterEach(clustered, 'cluster', function () {
    total++;
});

// Create an Array of all the values retrieved from the 'cluster' property
var values = []
turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue) {
    values.push(clusterValue);
});
```