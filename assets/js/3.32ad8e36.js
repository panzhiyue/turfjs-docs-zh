(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{249:function(t,e,r){"use strict";r.d(e,"c",(function(){return u})),r.d(e,"b",(function(){return p}));var o=r(316),n=r(264),a=r(257),i=r(248),c=function(){function t(){this.dataProjection=void 0,this.defaultFeatureProjection=void 0,this.supportedMediaTypes=null}return t.prototype.getReadOptions=function(t,e){var r;if(e){var n=e.dataProjection?Object(i.l)(e.dataProjection):this.readProjection(t);e.extent&&n&&n.getUnits()===o.b.TILE_PIXELS&&(n=Object(i.l)(n)).setWorldExtent(e.extent),r={dataProjection:n,featureProjection:e.featureProjection}}return this.adaptOptions(r)},t.prototype.adaptOptions=function(t){return Object(a.a)({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection},t)},t.prototype.getType=function(){return Object(n.b)()},t.prototype.readFeature=function(t,e){return Object(n.b)()},t.prototype.readFeatures=function(t,e){return Object(n.b)()},t.prototype.readGeometry=function(t,e){return Object(n.b)()},t.prototype.readProjection=function(t){return Object(n.b)()},t.prototype.writeFeature=function(t,e){return Object(n.b)()},t.prototype.writeFeatures=function(t,e){return Object(n.b)()},t.prototype.writeGeometry=function(t,e){return Object(n.b)()},t}();function u(t,e,r){var o,n=r?Object(i.l)(r.featureProjection):null,a=r?Object(i.l)(r.dataProjection):null;if(o=n&&a&&!Object(i.g)(n,a)?(e?t.clone():t).transform(e?n:a,e?a:n):t,e&&r&&void 0!==r.decimals){var c=Math.pow(10,r.decimals);o===t&&(o=t.clone()),o.applyTransform((function(t){for(var e=0,r=t.length;e<r;++e)t[e]=Math.round(t[e]*c)/c;return t}))}return o}function p(t,e){var r=e?Object(i.l)(e.featureProjection):null,o=e?Object(i.l)(e.dataProjection):null;return r&&o&&!Object(i.g)(r,o)?Object(i.v)(t,o,r):t}e.a=c},299:function(t,e,r){"use strict";var o,n=r(249),a=r(267),i=r(264),c=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),u=function(t){function e(){return t.call(this)||this}return c(e,t),e.prototype.getType=function(){return a.a.JSON},e.prototype.readFeature=function(t,e){return this.readFeatureFromObject(p(t),this.getReadOptions(t,e))},e.prototype.readFeatures=function(t,e){return this.readFeaturesFromObject(p(t),this.getReadOptions(t,e))},e.prototype.readFeatureFromObject=function(t,e){return Object(i.b)()},e.prototype.readFeaturesFromObject=function(t,e){return Object(i.b)()},e.prototype.readGeometry=function(t,e){return this.readGeometryFromObject(p(t),this.getReadOptions(t,e))},e.prototype.readGeometryFromObject=function(t,e){return Object(i.b)()},e.prototype.readProjection=function(t){return this.readProjectionFromObject(p(t))},e.prototype.readProjectionFromObject=function(t){return Object(i.b)()},e.prototype.writeFeature=function(t,e){return JSON.stringify(this.writeFeatureObject(t,e))},e.prototype.writeFeatureObject=function(t,e){return Object(i.b)()},e.prototype.writeFeatures=function(t,e){return JSON.stringify(this.writeFeaturesObject(t,e))},e.prototype.writeFeaturesObject=function(t,e){return Object(i.b)()},e.prototype.writeGeometry=function(t,e){return JSON.stringify(this.writeGeometryObject(t,e))},e.prototype.writeGeometryObject=function(t,e){return Object(i.b)()},e}(n.a);function p(t){if("string"==typeof t){var e=JSON.parse(t);return e||null}return null!==t?t:null}e.a=u},300:function(t,e,r){"use strict";var o,n=r(252),a=r(276),i=r(261),c=r(299),u=r(250),p=r(255),s=r(262),f=r(260),y=r(259),d=r(256),O=r(254),b=r(257),j=r(248),l=r(249),m=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),h=function(t){function e(e){var r=this,o=e||{};return(r=t.call(this)||this).dataProjection=Object(j.l)(o.dataProjection?o.dataProjection:"EPSG:4326"),o.featureProjection&&(r.defaultFeatureProjection=Object(j.l)(o.featureProjection)),r.geometryName_=o.geometryName,r.extractGeometryName_=o.extractGeometryName,r.supportedMediaTypes=["application/geo+json","application/vnd.geo+json"],r}return m(e,t),e.prototype.readFeatureFromObject=function(t,e){var r=null,o=g((r="Feature"===t.type?t:{type:"Feature",geometry:t,properties:null}).geometry,e),a=new n.a;return this.geometryName_?a.setGeometryName(this.geometryName_):this.extractGeometryName_&&"geometry_name"in r!==void 0&&a.setGeometryName(r.geometry_name),a.setGeometry(o),"id"in r&&a.setId(r.id),r.properties&&a.setProperties(r.properties,!0),a},e.prototype.readFeaturesFromObject=function(t,e){var r=null;if("FeatureCollection"===t.type){r=[];for(var o=t.features,n=0,a=o.length;n<a;++n)r.push(this.readFeatureFromObject(o[n],e))}else r=[this.readFeatureFromObject(t,e)];return r},e.prototype.readGeometryFromObject=function(t,e){return g(t,e)},e.prototype.readProjectionFromObject=function(t){var e,r=t.crs;return r?"name"==r.type?e=Object(j.l)(r.properties.name):"EPSG"===r.type?e=Object(j.l)("EPSG:"+r.properties.code):Object(O.a)(!1,36):e=this.dataProjection,e},e.prototype.writeFeatureObject=function(t,e){e=this.adaptOptions(e);var r={type:"Feature",geometry:null,properties:null},o=t.getId();if(void 0!==o&&(r.id=o),!t.hasProperties())return r;var n=t.getProperties(),a=t.getGeometry();return a&&(r.geometry=P(a,e),delete n[t.getGeometryName()]),Object(b.d)(n)||(r.properties=n),r},e.prototype.writeFeaturesObject=function(t,e){e=this.adaptOptions(e);for(var r=[],o=0,n=t.length;o<n;++o)r.push(this.writeFeatureObject(t[o],e));return{type:"FeatureCollection",features:r}},e.prototype.writeGeometryObject=function(t,e){return P(t,this.adaptOptions(e))},e}(c.a);function g(t,e){if(!t)return null;var r;switch(t.type){case i.a.POINT:r=function(t){return new y.a(t.coordinates)}(t);break;case i.a.LINE_STRING:r=function(t){return new u.a(t.coordinates)}(t);break;case i.a.POLYGON:r=function(t){return new d.b(t.coordinates)}(t);break;case i.a.MULTI_POINT:r=function(t){return new s.a(t.coordinates)}(t);break;case i.a.MULTI_LINE_STRING:r=function(t){return new p.a(t.coordinates)}(t);break;case i.a.MULTI_POLYGON:r=function(t){return new f.a(t.coordinates)}(t);break;case i.a.GEOMETRY_COLLECTION:r=function(t,e){var r=t.geometries.map((function(t){return g(t,e)}));return new a.a(r)}(t);break;default:throw new Error("Unsupported GeoJSON type: "+t.type)}return Object(l.c)(r,!1,e)}function P(t,e){var r,o=(t=Object(l.c)(t,!0,e)).getType();switch(o){case i.a.POINT:r=function(t,e){return{type:"Point",coordinates:t.getCoordinates()}}(t);break;case i.a.LINE_STRING:r=function(t,e){return{type:"LineString",coordinates:t.getCoordinates()}}(t);break;case i.a.POLYGON:r=function(t,e){var r;e&&(r=e.rightHanded);return{type:"Polygon",coordinates:t.getCoordinates(r)}}(t,e);break;case i.a.MULTI_POINT:r=function(t,e){return{type:"MultiPoint",coordinates:t.getCoordinates()}}(t);break;case i.a.MULTI_LINE_STRING:r=function(t,e){return{type:"MultiLineString",coordinates:t.getCoordinates()}}(t);break;case i.a.MULTI_POLYGON:r=function(t,e){var r;e&&(r=e.rightHanded);return{type:"MultiPolygon",coordinates:t.getCoordinates(r)}}(t,e);break;case i.a.GEOMETRY_COLLECTION:r=function(t,e){return{type:"GeometryCollection",geometries:t.getGeometriesArray().map((function(t){var r=Object(b.a)({},e);return delete r.featureProjection,P(t,r)}))}}(t,e);break;case i.a.CIRCLE:r={type:"GeometryCollection",geometries:[]};break;default:throw new Error("Unsupported geometry type: "+o)}return r}e.a=h}}]);