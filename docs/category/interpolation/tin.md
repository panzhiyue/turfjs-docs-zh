# tin多边形(tin)

```
> npm install @turf/tin
```

> Takes a set of points and creates a Triangulated Irregular Network , or a TIN for short, returned as a collection of Polygons. These are often used for developing elevation contour maps or stepped heat visualizations.
>
> 接收一组点要素集合，创建并返回该集合的TIN(Triangulated Irregular Network，[不规则三角形格网](https://baike.baidu.com/item/不规则三角形格网/5246408))

**参数**

| 参数   | 类型                        | 描述                                                         |
| :----- | :-------------------------- | :----------------------------------------------------------- |
| points | `FeatureCollection <Point>` | 点要素集合                                                   |
| z      | (String)                    | 从中提取z值的属性的名称。这是可选的：如果没有给定，则不会向派生三角形添加额外的数据。 |

**返回**

`FeatureCollection <Polygon>` - TIN output

`FeatureCollection <Polygon>` - 不规则三角形网格

**示例**

```js
// generate some random point data
var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});

// add a random property to each point between 0 and 9
for (var i = 0; i < points.features.length; i++) {
  points.features[i].properties.z = ~~(Math.random() * 9);
}
var tin = turf.tin(points, 'z');
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tin.3d1cc363.webp)