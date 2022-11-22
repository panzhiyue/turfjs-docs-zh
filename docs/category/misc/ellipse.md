# ellipse

```
> npm install @turf/ellipse
```

> Takes a Point and calculates the ellipse polygon given two semi-axes expressed in variable units and steps for precision.
>
> 接收中心点与2个半轴，计算并返回椭圆多边形。

#### 参数

| 参数      | 类型                                                       | 描述                    |
| :-------- | :--------------------------------------------------------- | :---------------------- |
| center    | [Coord](https://tools.ietf.org/html/rfc7946#section-3.1.1) | 中心点                  |
| xSemiAxis | number                                                     | 沿x轴的椭圆的半（长）轴 |
| ySemiAxis | number                                                     | 椭圆沿y轴的半（短）轴   |
| options   | Object                                                     | 可配置项                |

#### Options

| 属性Prop   | 类型                                                       | 默认值       | 描述                                                       |
| :--------- | :--------------------------------------------------------- | :----------- | :--------------------------------------------------------- |
| angle      | number                                                     | 0            | 旋转角度（十进制度）, 顺时针为正                           |
| pivot      | [Coord](https://tools.ietf.org/html/rfc7946#section-3.1.1) | 'origin'     | 旋转将围绕的点                                             |
| steps      | number                                                     | 64           | 平滑度，数值越高越平滑                                     |
| units      | string                                                     | 'kilometers' | 轴的长度单位，可选的有 degrees、radians、miles、kilometers |
| properties | Object                                                     | {}           | 返回GeoJSON的properties属性                                |

#### 返回

`Feature<Polygon>` - ellipse polygon

`Feature<Polygon>` - 椭圆面

示例

```javascript
var center = [-75, 40];
var xSemiAxis = 5;
var ySemiAxis = 2;
var ellipse = turf.ellipse(center, xSemiAxis, ySemiAxis);
```