# clusterEach

> clusterEach

```text
> npm install @turf/clusters
```

**参数**

| 参数     | 类型              | 描述                                                      |
| :------- | :---------------- | :-------------------------------------------------------- |
| geojson  | FeatureCollection | GeoJSON Features                                          |
| property | (string\|number)  | GeoJSON property key/value used to create clusters        |
| callback | Function          | a method that takes (cluster, clusterValue, currentIndex) |

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