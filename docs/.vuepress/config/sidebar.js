// ！！！注：此文件没有使用到，仅用于测试和侧边栏数据格式的参考。

// 侧边栏
module.exports = {
  "/category/": [
    {
      title: "GET START",
      collapsable: true,
      children: ["start"],
    },
    {
      title: "测量(measurement)",
      collapsable: true,
      collaps:false,
      children: [
        "measurement/along",
        "measurement/area",
        "measurement/bbox",
        "measurement/bboxPolygon",
        "measurement/bearing",
        "measurement/center",
        "measurement/centerOfMass",
        "measurement/centroid",
        "measurement/destination",
        "measurement/distance",
        "measurement/envelope",
        "measurement/greatCircle",
        "measurement/length",
        "measurement/midpoint",
        "measurement/pointOnFeature",
        "measurement/pointToLineDistance",
        "measurement/polygonTangents",
        "measurement/rhumbBearing",
        "measurement/rhumbDestination",
        "measurement/rhumbDistance",
        "measurement/square",
      ],
    },
    {
      title: "coordinate mutation",
      collapsable: false,
      children: [
        "coordinate mutation/cleanCoords",
        "coordinate mutation/flip",
        "coordinate mutation/rewind",
        "coordinate mutation/round",
        "coordinate mutation/truncate",
      ],
    },
    {
      title: "transformation",
      collapsable: false,
      children: [
        "transformation/bboxClip",
        "transformation/bezierSpline",
        "transformation/buffer",
        "transformation/circle",
        "transformation/clone",
        "transformation/concave",
        "transformation/convex",
        "transformation/difference",
        "transformation/dissolve",
        "transformation/intersect",
        "transformation/lineOffset",
        "transformation/simplify",
        "transformation/tesselate",
        "transformation/transformRotate",
        "transformation/transformTranslate",
        "transformation/transformScale",
        "transformation/union",
      ],
    },
    {
      title: "feature conversion",
      collapsable: false,
      children: [
        "feature conversion/combine",
        "feature conversion/explode",
        "feature conversion/flatten",
        "feature conversion/lineToPolygon",
        "feature conversion/polygonize",
        "feature conversion/polygonToLine",
      ],
    },
    {
      title: "misc",
      collapsable: false,
      children: [
        "misc/kinks",
        "misc/lineArc",
        "misc/lineChunk",
        "misc/lineIntersect",
        "misc/lineOverlap",
        "misc/lineSegment",
        "misc/lineSlice",
        "misc/lineSliceAlong",
        "misc/lineSplit",
        "misc/mask",
        "misc/nearestPointOnLine",
        "misc/sector",
        "misc/shortestPath",
        "misc/unkinkPolygon",
      ],
    },
    {
      title: "helper",
      collapsable: false,
      children: [
        "helper/featureCollection",
        "helper/feature",
        "helper/geometryCollection",
        "helper/lineString",
        "helper/multiLineString",
        "helper/multiPoint",
        "helper/multiPolygon",
        "helper/point",
        "helper/polygon",
      ],
    },
    {
      title: "random",
      collapsable: false,
      children: [
        "random/randomPosition",
        "random/randomPoint",
        "random/randomLineString",
        "random/randomPolygon",
      ],
    },
    {
      title: "data",
      collapsable: false,
      children: ["data/sample"],
    },
    {
      title: "interpolation",
      collapsable: false,
      children: [
        "interpolation/interpolate",
        "interpolation/isobands",
        "interpolation/isolines",
        "interpolation/planepoint",
        "interpolation/tin",
      ],
    },
    {
      title: "joins",
      collapsable: false,
      children: ["joins/pointsWithinPolygon", "joins/tag"],
    },
    {
      title: "grids",
      collapsable: false,
      children: [
        "grids/hexGrid",
        "grids/pointGrid",
        "grids/squareGrid",
        "grids/triangleGrid",
      ],
    },
    {
      title: "classification",
      collapsable: false,
      children: ["classification/nearestPoint"],
    },
    {
      title: "aggregation",
      collapsable: false,
      children: [
        "aggregation/collect",
        "aggregation/clustersDbscan",
        "aggregation/clustersKmeans",
      ],
    },
    {
      title: "meta",
      collapsable: false,
      children: [
        "meta/coordAll",
        "meta/coordEach",
        "meta/coordReduce",
        "meta/featureEach",
        "meta/featureReduce",
        "meta/flattenEach",
        "meta/flattenReduce",
        "meta/getCoord",
        "meta/getCoords",
        "meta/getGeom",
        "meta/getType",
        "meta/geomEach",
        "meta/geomReduce",
        "meta/propEach",
        "meta/propReduce",
        "meta/segmentEach",
        "meta/segmentReduce",
        "meta/getCluster",
        "meta/clusterEach",
        "meta/clusterReduce",
      ],
    },
    {
      title: "assertions",
      collapsable: false,
      children: [
        "assertions/collectionOf",
        "assertions/containsNumber",
        "assertions/geojsonType",
        "assertions/featureOf",
      ],
    },
    {
      title: "booleans",
      collapsable: false,
      children: [
        "booleans/booleanClockwise",
        "booleans/booleanContains",
        "booleans/booleanCrosses",
        "booleans/booleanDisjoint",
        "booleans/booleanEqual",
        "booleans/booleanOverlap",
        "booleans/booleanParallel",
        "booleans/booleanPointInPolygon",
        "booleans/booleanPointOnLine",
        "booleans/booleanWithin",
      ],
    },
    {
      title: "unit conversion",
      collapsable: false,
      children: [
        "unit conversion/bearingToAzimuth",
        "unit conversion/convertArea",
        "unit conversion/convertLength",
        "unit conversion/degreesToRadians",
        "unit conversion/lengthToRadians",
        "unit conversion/lengthToDegrees",
        "unit conversion/radiansToLength",
        "unit conversion/radiansToDegrees",
        "unit conversion/toMercator",
        "unit conversion/toWgs84",
      ],
    },
  ],
};
