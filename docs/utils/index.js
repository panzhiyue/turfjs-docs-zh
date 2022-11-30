import { GeoJSON } from "ol/format";
import {
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
  Geometry,
  GeometryCollection,
} from "ol/geom";
import Feature from "ol/Feature";
import { Style, Stroke, Circle, Fill } from "ol/style";
const format = new GeoJSON();

const POINT_COORDINATES = [119.95536804199222, 28.015342235565186];
const MULTIPOINT_COORDINATES = [
  [119.78645324707034, 28.20348310470581],
  [119.73426818847659, 28.06890058517456],
  [119.73014831542972, 27.982383251190186],
  [119.89494323730472, 27.88213300704956],
  [119.88258361816409, 27.99748945236206],
  [120.03776550292972, 28.031821727752686],
  [119.97322082519534, 28.14305830001831],
];
const LINESTRING_COORDINATES = [
  [119.82902526855472, 28.193870067596436],
  [119.70130920410159, 27.943931102752686],
  [120.05287170410159, 27.847800731658936],
  [120.19432067871097, 28.12657880783081],
];
const MULTILINESTRING_COORDINATES = [
  [
    [119.82902526855472, 28.193870067596436],
    [119.70130920410159, 27.943931102752686],
    [120.05287170410159, 27.847800731658936],
    [120.19432067871097, 28.12657880783081],
  ],
  [
    [119.68345642089847, 28.237815380096436],
    [119.63676452636722, 28.07714033126831],
    [119.78782653808597, 28.004355907440186],
    [119.78096008300784, 27.88213300704956],
    [119.65187072753909, 27.84917402267456],
  ],
];

const POLYGON_COORDINATES = [
  [
    [119.47705507278444, 28.205113887786865],
    [119.43173646926881, 28.12134313583374],
    [119.42624330520631, 28.01971960067749],
    [119.48392152786256, 27.97577428817749],
    [119.60202455520631, 27.98401403427124],
    [119.56631898880006, 28.111730098724365],
    [119.47705507278444, 28.205113887786865],
  ],
];

const MULTIPOLYGON_COORDINATES = [
  [
    [
      [119.47705507278444, 28.205113887786865],
      [119.43173646926881, 28.12134313583374],
      [119.42624330520631, 28.01971960067749],
      [119.48392152786256, 27.97577428817749],
      [119.60202455520631, 27.98401403427124],
      [119.56631898880006, 28.111730098724365],
      [119.47705507278444, 28.205113887786865],
    ],
  ],
  [
    [
      [119.84509706497194, 28.130956172943115],
      [119.86432313919069, 27.908483028411865],
      [120.22549867630006, 27.92358922958374],
      [120.26257753372194, 28.12408971786499],
      [120.11563539505006, 28.17078161239624],
      [120.02362489700319, 28.17352819442749],
      [119.84509706497194, 28.130956172943115],
    ],
  ],
];

const POINT_GEOMETRY = new Point(POINT_COORDINATES);
const MULTIPOINT_GEOMETRY = new MultiPoint(MULTIPOINT_COORDINATES);
const LINESTRING_GEOMETRY = new LineString(LINESTRING_COORDINATES);
const MULTILINESTRING_GEOMETRY = new MultiLineString(
  MULTILINESTRING_COORDINATES
);
const POLYGON_GEOMETRY = new Polygon(POLYGON_COORDINATES);
const MULTIPOLYGON_GEOMETRY = new MultiPolygon(MULTIPOLYGON_COORDINATES);
const GEOMETRYCOLLECTION_GEOMETRY = new GeometryCollection([
  MULTIPOINT_GEOMETRY,
  MULTILINESTRING_GEOMETRY,
  MULTIPOLYGON_GEOMETRY,
]);

const POINT_FEATURE = new Feature({
  geometry: POINT_GEOMETRY,
});
const MULTIPOINT_FEATURE = new Feature({
  geometry: MULTIPOINT_GEOMETRY,
});
const LINESTRING_FEATURE = new Feature({
  geometry: LINESTRING_GEOMETRY,
});
const MULTILINESTRING_FEATURE = new Feature({
  geometry: MULTILINESTRING_GEOMETRY,
});
const POLYGON_FEATURE = new Feature({
  geometry: POLYGON_GEOMETRY,
});
const MULTIPOLYGON_FEATURE = new Feature({
  geometry: MULTIPOLYGON_GEOMETRY,
});
const GEOMETRYCOLLECTION_FEATURE = new Feature({
  geometry: GEOMETRYCOLLECTION_GEOMETRY,
});
const FEATURECOLLECTION = [
  MULTIPOINT_FEATURE,
  MULTILINESTRING_FEATURE,
  MULTIPOLYGON_FEATURE,
];

export const styleRed = new Style({
  image: new Circle({
    radius: 4,
    stroke: new Stroke({
      width: 2,
      color: "#ff0000",
    }),
  }),
  stroke: new Stroke({
    width: 2,
    color: "#ff0000",
  }),
});

export const getTestOL = (type) => {
  switch (type) {
    case "Position": {
      return POINT_GEOMETRY;
    }
    case "Point": {
      return POINT_GEOMETRY;
    }
    case "MultiPoint": {
      return MULTIPOINT_GEOMETRY;
    }
    case "Feature<Point>": {
      return POINT_FEATURE;
    }
    case "Feature<MultiPoint>": {
      return MULTIPOINT_FEATURE;
    }
    case "LineString": {
      return LINESTRING_GEOMETRY;
    }
    case "MultiLineString": {
      return MULTILINESTRING_GEOMETRY;
    }
    case "Feature<LineString>": {
      return LINESTRING_FEATURE;
    }
    case "Feature<MultiLineString>": {
      return MULTILINESTRING_FEATURE;
    }
    case "Polygon": {
      return POLYGON_GEOMETRY;
    }
    case "MultiPolygon": {
      return MULTIPOLYGON_GEOMETRY;
    }
    case "Feature<Polygon>": {
      return POLYGON_FEATURE;
    }
    case "Feature<MultiPolygon>": {
      return MULTIPOLYGON_FEATURE;
    }
    case "GeometryCollection": {
      return GEOMETRYCOLLECTION_GEOMETRY;
    }
    case "Feature<GeometryCollection>": {
      return GEOMETRYCOLLECTION_FEATURE;
    }
    case "FeatureCollection": {
      return FEATURECOLLECTION;
    }
  }
};

export const getTestTurf = (type) => {
  let testOL = getTestOL(type);
  if (type == "Position") {
    return POINT_COORDINATES;
  } else if (type.indexOf("FeatureCollection") > -1) {
    return JSON.parse(format.writeFeatures(testOL));
  } else if (type.indexOf("Feature") > -1) {
    return JSON.parse(format.writeFeature(testOL));
  } else {
    return JSON.parse(format.writeGeometry(testOL));
  }
};

export const getTestFeatures = (type) => {
  let testOL = getTestOL(type);
  if (type == "FeatureCollection") {
    return testOL;
  } else if (type.indexOf("Feature") > -1) {
    return [testOL];
  } else {
    return [
      new Feature({
        geometry: testOL,
      }),
    ];
  }
};
export const getOLFromTurf = (obj) => {
  if (obj instanceof Array) {
    return new Point(obj);
  } else if (obj.type == "FeatureCollection") {
    return format.readFeatures(JSON.stringify(obj));
  } else if (obj.type == "Feature") {
    return format.readFeature(JSON.stringify(obj));
  } else {
    return format.readGeometry(JSON.stringify(obj));
  }
};

export const getFeaturesFromTurf = (obj) => {
  let olObj = getOLFromTurf(obj);
  if (obj.type == "FeatureCollection") {
    return olObj;
  } else if (obj.type == "Feature") {
    return [olObj];
  } else {
    return [
      new Feature({
        geometry: olObj,
      }),
    ];
  }
};
