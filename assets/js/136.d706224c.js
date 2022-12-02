(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{1812:function(t,a,e){"use strict";e.r(a);var s=e(11),n=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"dbscan聚类算法-clustersdbscan"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dbscan聚类算法-clustersdbscan"}},[t._v("#")]),t._v(" Dbscan聚类算法(clustersDbscan)")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> npm install @turf/clusters-dbscan\n")])])]),a("blockquote",[a("p",[t._v("Takes a set of points and partition them into clusters according to https://en.wikipedia.org/wiki/DBSCAN data clustering algorithm.\n接收一个点要素集合，并根据 "),a("a",{attrs:{href:"https://baike.baidu.com/item/DBSCAN/4864716?fr=aladdin",target:"_blank",rel:"noopener noreferrer"}},[t._v("DBSCAN (opens new window)"),a("OutboundLink")],1),t._v("聚类算法将它们聚类划分，返回计算后的点要素集合。")])]),t._v(" "),a("p",[a("strong",[t._v("参数")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("参数")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("类型")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("points")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("FeatureCollection <Point>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("点要素集")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("maxDistance")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("number")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("生成集群中任何点之间的最大距离，单位为千米")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("options")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Object")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("可配置项")])])])]),t._v(" "),a("p",[a("strong",[t._v("options选项")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("属性")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("类型")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("默认值")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("units")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("string")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v('"kilometers"')]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("单位，可选的有 kilometers")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("mutate")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("boolean")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("false")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("是否返回入参的 GeoJSON，为 true 性能能显著提高")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("minPoints")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("number")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("3")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("生成单个集群的最小点要素数量，不满足的点要素将被分类成噪声点("),a("code",[t._v("noise")]),t._v(")")])])])]),t._v(" "),a("p",[a("strong",[t._v("返回")])]),t._v(" "),a("p",[a("code",[t._v("FeatureCollection <Point>")]),t._v(" - Clustered Points with an additional two properties associated to each Feature:")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// create random points with random z-values in their properties")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" points "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" turf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("randomPoint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("bbox")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" maxDistance "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" clustered "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" turf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clustersDbscan")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("points"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" maxDistance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/clustersDbscan.6f0ee268.webp",alt:"img"}})])])}),[],!1,null,null,null);a.default=n.exports}}]);