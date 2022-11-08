// ！！！注：此文件没有使用到，仅用于测试和侧边栏数据格式的参考。

// 侧边栏
module.exports = {
  "/category/": [
    {
      title: "GET START",
      collapsable: false,
      children: ["start"],
    },
    {
      title: "测量(measurement)",
      collapsable: false,
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
  ],
};
