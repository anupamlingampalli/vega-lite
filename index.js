import embed from "https://cdn.jsdelivr.net/npm/vega-embed@6?module";

function drawViz(data, element) {
  const values = data.tables.default.map(row => ({
    category: row.category[0],
    value: row.value[0]
  }));

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Bar chart from Looker Studio data",
    data: { values },
    mark: "bar",
    encoding: {
      x: { field: "category", type: "ordinal" },
      y: { field: "value", type: "quantitative" }
    }
  };

  element.innerHTML = "";
  embed(element, spec, { actions: false });
}

looker.plugins.visualizations.add({
  id: "vega-lite-custom",
  create: function(element) {
    this.container = element;
  },
  updateAsync: function(data, element) {
    drawViz(data, element);
    this.doneRendering();
  }
});
