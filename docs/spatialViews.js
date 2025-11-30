
//spatialViews.js (Yusef)

function renderHousingPanel() {
  const HOUSING_URL = "data/housing_embeddings.csv";

  const housingSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Housing embedding with linked housing views.",
    data: { url: HOUSING_URL },

    vconcat: [

      //embedding scatterplot
      {
        width: 390,
        height: 260,
        title: "Housing Embedding",
        mark: "circle",
        params: [
          {
            name: "houseBrush",
            select: {
              type: "interval",
              encodings: ["x", "y"]
            }
          }
        ],
        encoding: {
          x: { field: "emb_x", type: "quantitative", title: "Embedding X" },
          y: { field: "emb_y", type: "quantitative", title: "Embedding Y" },
          color: { field: "Year", type: "ordinal", title: "Year" },
          tooltip: [
            { field: "period_label", type: "nominal", title: "Period" },
            {
              field: "med_housing_price",
              type: "quantitative",
              title: "Median Price"
            },
            {
              field: "log_new_housing_const_permits",
              type: "quantitative",
              title: "New Permits (log)"
            }
          ]
        }
      },

      //linked view: price vs permits
      // This is a substitute for Spatial view because we don't have location info
      {
        transform: [
          { filter: { param: "houseBrush" } }
        ],
        width: 390,
        height: 220,
        title: "Price vs New Permits (brushed)",
        mark: "circle",
        encoding: {
          x: {
            field: "log_new_housing_const_permits",
            type: "quantitative",
            title: "log(new_housing_const_permits)"
          },
          y: {
            field: "med_housing_price",
            type: "quantitative",
            title: "Median Housing Price"
          },
          color: { field: "Year", type: "ordinal", title: "Year" },
          tooltip: [
            { field: "period_label", type: "nominal", title: "Period" },
            {
              field: "log_new_housing_const_permits",
              type: "quantitative",
              title: "New Permits (log)"
            },
            {
              field: "med_housing_price",
              type: "quantitative",
              title: "Median Price"
            }
          ]
        }
      },

      //median price over time (linked)
      {
        transform: [
          { filter: { param: "houseBrush" } }
        ],
        width: 390,
        height: 200,
        title: "Median Housing Price Over Time (brushed)",
        mark: { type: "line", point: true },
        encoding: {
          x: {
            field: "period_label",
            type: "ordinal",
            sort: "ascending",
            title: "Period (Year-Month)",
            axis: { labelAngle: -45 }
          },
          y: {
            field: "med_housing_price",
            type: "quantitative",
            title: "Median Housing Price"
          },
          color: {
            field: "Year",
            type: "ordinal",
            legend: null
          },
          tooltip: [
            { field: "period_label", type: "nominal", title: "Period" },
            {
              field: "med_housing_price",
              type: "quantitative",
              title: "Median Price"
            }
          ]
        }
      }
    ]
  };

  vegaEmbed("#housing-panel", housingSpec).catch(console.error);
}

renderHousingPanel();
  