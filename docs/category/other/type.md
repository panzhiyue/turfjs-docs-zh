# 类型(type)

## Point

GeoJSON点类型

```json
{"type":"Point","coordinates":[120,28]}
```

## MultiPoint

GeoJSON多点类型

```json
{"type":"MultiPoint","coordinates":[[120,28],[120,29]]}
```

## LineString

GeoJSON线段类型

```json
{"type":"LineString","coordinates":[[120,28],[120,29]]}
```

## MultiLineString

GeoJSON多线段类型

```json
{"type":"MultiLineString","coordinates":[[[120,28],[120,29]],[[120,27],[119,27]]]}
```

## Polygon

GeoJSON面类型

```json
{"type":"Polygon","coordinates":[[[120,28],[120,29],[119,29],[120,28]]]}
```

## MultiPolygon

GeoJSON多面类型

```json
{"type":"MultiPolygon","coordinates":[[[[120,28],[120,29],[119,29],[120,28]]],[[[118,28],[118,29],[117,29],[118,28]]]]}
```

## GeometryCollection

GeoJSON几何集合类型

```json
{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[116,28]},{"type":"MultiPolygon","coordinates":[[[[120,28],[120,29],[119,29],[120,28]]],[[[118,28],[118,29],[117,29],[118,28]]]]}]}
```

## Feature

## FeatureCollection

## PointGeoJSON

type:`Point`|`MultiPoint`|`Feature<Point>`|`Feature<MultiPoint>`|`GeometryCollection<Point>`|`GeometryCollection<MultiPoint>`

## LineGeoJSON

## PolyGeoJSON

## AllGeoJSON

type:`Feature` | `FeatureCollection` |` Geometry` | `GeometryCollection`

## Geometry

type:`Point`|`MultiPoint`|`LineString`|`MultiLineString`|`Polygon`|`MultiPolygon`

## Position

## Coor

type:`Feature<Point>` | `Point `| `Position`;

## Lines

type:`LineString` |` MultiLineString `| `Polygon` | `MultiPolygon`



## bbox

[xmin,ymin,xmax,ymax]
