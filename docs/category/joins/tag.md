# 空间连接(tag)

```
> npm install @turf/tag
```

> Takes a set of points and a set of polygons and performs a spatial join.
> 接收一组点要素集合和一组面要素集合，面要素内的点要素进行空间连接和属性继承

**参数**

| 参数     | 类型                          | 描述                   |
| :------- | :---------------------------- | :--------------------- |
| points   | `FeatureCollection <Point>`   | 点要素集合             |
| polygons | `FeatureCollection <Polygon>` | 面要素集合             |
| field    | string                        | 面要素的要被继承的属性 |
| outField | string                        | 点要素继承属性的重命名 |

**返回**

`FeatureCollection <Point>` - points with containingPolyId property containing values from polyId

**示例**

```js
var pt1 = turf.point([-77, 44]);
var pt2 = turf.point([-77, 38]);
var poly1 = turf.polygon(
  [
    [
      [-81, 41],
      [-81, 47],
      [-72, 47],
      [-72, 41],
      [-81, 41]
    ]
  ],
  { pop: 3000 }
);
var poly2 = turf.polygon(
  [
    [
      [-81, 35],
      [-81, 41],
      [-72, 41],
      [-72, 35],
      [-81, 35]
    ]
  ],
  { pop: 1000 }
);

var points = turf.featureCollection([pt1, pt2]);
var polygons = turf.featureCollection([poly1, poly2]);

var tagged = turf.tag(points, polygons, "pop", "population");
/*
{
  type: "FeatureCollection",
  faetures: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77, 44]
      },
      properties: {
        population: 3000 // pop属性重命名为population
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77, 38]
      },
      properties: {
        population: 1000
      }
    }
  ]
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tag.adc60a50.webp)