(function (ng, app) {
    "use strict";
    app.factory('Stramgraph', ["$rootScope", function ($rootScope) {

        var svgG,
            metrics = ["offers", "shares", "landings", "leads", "purchases", "friends"];

        function formatMetric(d) {
            return metrics[d];
        }

        return {
            render: function (svg, data, width, height) {

                var m = [10, 80, 10, 10]; // margins
                var w = width - m[1] - m[3]; // width
                var h = height - m[0] - m[2]; // height

                if (!svgG) {
                    svgG = d3.select(svg)
                        .attr("width", width)
                        .attr("height", height)
                        .append("svg:g")
                        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

                }
                svg = svgG;

                var stack = d3.layout.stack().offset("expand"),
                    y = d3.scale.linear()
                        .domain([0, 1])
                        .range([w, 0]),
                    color = d3.scale.linear()
                        .range(["#15b5c1", "#A5D9DD"]);


                var formatedData = [];
                metrics.forEach(function (f, metricIndex) {
                    for (var index in data) {
                        formatedData[index] = formatedData[index] || [];
                        formatedData[index].push({x: metricIndex, y: data[index].metrics[f]});
                    }
                });
                var layers = stack(formatedData);
                layers = data.map(function (f, i) {
                    return {layer: layers[i], companyName: f.title}
                })

                var x = d3.scale.linear()
                    .domain([0, metrics.length - 1])
                    .range([0, h]);

                var area = d3.svg.area()/*.interpolate("basis")*/
                    .y(function (d) {
                        return x(d.x);
                    })
                    .x0(function (d) {
                        return y(null);
                    })
                    .x1(function (d) {
                        return y(d.y0 + d.y);
                    });

                function fixPath(path) {
                    var Lidx = path.indexOf('L');
                    var Cidx = path.slice(Lidx).indexOf('C');
                    var PCidx = path.slice(0, Lidx).lastIndexOf('C');
                    var lp = path.substr(PCidx, Lidx - PCidx);
                    var ss = path.substr(Lidx, Cidx);
                    return (path.slice(0, Lidx) + lp + ss + path.slice(Lidx));
                }

                //enter
                svg.selectAll("path").filter(":not(.domain)")
                    .data(layers.reverse())
                    .enter().append("path")
                    .attr("d", function (d, i) {
                        return fixPath(area(d.layer));
                    });

                //update
                svg.selectAll("path").filter(":not(.domain)")
                    .data(layers)
                    .transition()
                    .duration(2000)
                    .attr("d", function (d, i) {
                        d3.select(this).style({
                            "fill": color(i / 8),
                            "stroke": "#108a93",
                            "stroke-width": "0.4px"
                        });

                        return fixPath(area(d.layer));
                    });


                svg.selectAll('.y.axis').remove();
                // create left yAxis
                var yAxisLeft = d3.svg.axis().scale(x).ticks(6).tickFormat(formatMetric).tickSize(-w).orient("right").tickSubdivide(true);
                // Add the y-axis to the left
                svg.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + w + ",0)")
                    .style('fill', '#fff')
                    .call(yAxisLeft);


            }
        };
    }]);

})(angular, MyApp);