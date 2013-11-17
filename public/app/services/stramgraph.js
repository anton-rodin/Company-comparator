(function (ng, app) {
    "use strict";
    app.factory('Stramgraph', ["$rootScope", function ($rootScope) {



        return {
            render: function(svg, data, width, height) {
                var metrics = ["offers", "shares", "landings", "leads", "purchases", "friends"],
                    stack = d3.layout.stack().offset("expand"),
                    svg = d3.select(svg)
                        .attr("width", width)
                        .attr("height", height);
                var y = d3.scale.linear()
                    .domain([0, 1])
                    .range([width, 0]);
                var color = d3.scale.linear()
                    .range(["#0D0", "#060"]);


                var m = [];
                metrics.forEach(function (f, metricIndex) {
                    for (var index in data) {
                        m[index] = m[index] || [];
                        m[index].push({x: metricIndex, y:data[index].metrics[f]});
                    }
                })
                var layers = stack(m)
                layers = data.map(function (f, i) {
                    return {layer: layers[i], companyName: f.title, color: color(i/(data.length -1))}
                })

                var x = d3.scale.linear()
                    .domain([0, metrics.length - 1])
                    .range([0, height]);

                var area = d3.svg.area()/*.interpolate("basis")*/
                    .y(function(d) { return x(d.x); })
                    .x0(function(d) { return y(null); })
                    .x1(function(d) { return y(d.y0 + d.y); });

                function fixPath (path) {
                    var Lidx = path.indexOf('L');
                    var Cidx =  path.slice(Lidx).indexOf('C');
                    var PCidx = path.slice(0,Lidx).lastIndexOf('C');
                    var lp = path.substr(PCidx, Lidx-PCidx);
                    var ss = path.substr(Lidx, Cidx);
                    return (path.slice(0,Lidx) + lp + ss + path.slice(Lidx));
                }

                //enter
                svg.selectAll("path")
                    .data(layers.reverse())
                    .enter().append("path")
                    .attr("d", function (d) {
                        return fixPath(area(d.layer));
                    })
                    .style("fill", function(d) { return d.color; });

                //update
                d3.selectAll("path")
                    .data(layers)
                    .transition()
                    .duration(2000)
                    .attr("d", function (d) {return fixPath(area(d.layer));});



            }
        };
    }]);

})(angular, MyApp);