// script.js
// Hadeel - Tourism embedding + hotel linked views + reused A3 linked view

const DATA_URL = window.TOURISM_DATA_URL || "data/tourism_embeddings_2d.csv";

// ================================
//  1 + 2. Tourism embedding + hotel linked views
//     - Top: embedding scatterplot with brush (emb_x, emb_y)
//     - Middle: hotel occupancy over time, filtered by brush
//     - Bottom: ADR over time, also filtered by brush
// ================================

const tourismEmbeddingSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Tourism embedding with linked hotel occupancy and ADR.",
  data: { url: DATA_URL },
  vconcat: [
    // ---- (1) Main embedding scatterplot ----
    {
      width: "container",
      height: 260,
      mark: "circle",
      params: [
        {
          name: "embedBrush",
          select: { type: "interval" } // brush directly on the embedding
        }
      ],
      encoding: {
        x: {
          field: "emb_x",
          type: "quantitative",
          title: "Embedding X"
        },
        y: {
          field: "emb_y",
          type: "quantitative",
          title: "Embedding Y"
        },
        color: {
          field: "Year",
          type: "ordinal",
          title: "Year"
        },
        tooltip: [
          { field: "period_label", type: "nominal", title: "Period" },
          { field: "Year", type: "ordinal" },
          { field: "Month", type: "ordinal" },
          {
            field: "logan_passengers",
            type: "quantitative",
            title: "Logan Passengers"
          },
          {
            field: "hotel_occup_rate",
            type: "quantitative",
            title: "Hotel Occupancy"
          },
          {
            field: "hotel_avg_daily_rate",
            type: "quantitative",
            title: "Avg Daily Rate ($)"
          },
          {
            field: "logan_intl_flights",
            type: "quantitative",
            title: "Intl Flights"
          }
        ]
      }
    },

    // ---- (2) Linked hotel occupancy line chart ----
    {
      transform: [
        { filter: { param: "embedBrush" } } // only points inside the brush
      ],
      width: "container",
      height: 150,
      params: [
        {
          name: "monthSel",
          select: {
            type: "point",
            encodings: ["x"] // select by period_label along x-axis
          }
        }
      ],
      mark: {
        type: "line",
        point: true
      },
      encoding: {
        x: {
          field: "period_label",
          type: "ordinal",
          sort: "ascending",
          title: "Period (Year-Month)",
          axis: { labelAngle: -45 }
        },
        y: {
          field: "hotel_occup_rate",
          type: "quantitative",
          title: "Hotel Occupancy Rate"
        },
        color: {
          field: "Year",
          type: "ordinal",
          legend: null
        },
        opacity: {
          // Highlight selected month, fade others
          condition: { param: "monthSel", value: 1 },
          value: 0.5
        },
        tooltip: [
          { field: "period_label", type: "nominal", title: "Period" },
          {
            field: "hotel_occup_rate",
            type: "quantitative",
            title: "Occupancy"
          }
        ]
      }
    },

    // ---- (3) Linked ADR line chart ----
    {
      transform: [
        { filter: { param: "embedBrush" } }
      ],
      width: "container",
      height: 150,
      mark: {
        type: "line",
        point: true
      },
      encoding: {
        x: {
          field: "period_label",
          type: "ordinal",
          sort: "ascending",
          title: "Period (Year-Month)",
          axis: { labelAngle: -45 }
        },
        y: {
          field: "hotel_avg_daily_rate",
          type: "quantitative",
          title: "Avg Daily Rate ($)"
        },
        color: {
          field: "Year",
          type: "ordinal",
          legend: null
        },
        tooltip: [
          { field: "period_label", type: "nominal", title: "Period" },
          {
            field: "hotel_avg_daily_rate",
            type: "quantitative",
            title: "ADR ($)"
          }
        ]
      }
    }
  ]
};

// ================================
//  3. Reused linked view (Assignment 3 style)
//     - Top: scatter passengers vs occupancy with its own brush
//     - Bottom: occupancy over time, filtered by that brush
// ================================

const reusedA3LinkedSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Reused linked view: passengers vs occupancy with linked time series.",
  data: { url: DATA_URL },
  vconcat: [
    // Top: scatter logan_passengers vs hotel_occup_rate
    {
      width: "container",
      height: 220,
      mark: "circle",
      params: [
        {
          name: "passBrush",
          select: { type: "interval" } // brush on passengers vs occupancy
        }
      ],
      encoding: {
        x: {
          field: "logan_passengers",
          type: "quantitative",
          title: "Logan Passengers"
        },
        y: {
          field: "hotel_occup_rate",
          type: "quantitative",
          title: "Hotel Occupancy Rate"
        },
        color: {
          field: "Year",
          type: "ordinal",
          title: "Year"
        },
        tooltip: [
          { field: "period_label", type: "nominal", title: "Period" },
          { field: "Year", type: "ordinal" },
          {
            field: "logan_passengers",
            type: "quantitative",
            title: "Passengers"
          },
          {
            field: "hotel_occup_rate",
            type: "quantitative",
            title: "Occupancy"
          }
        ]
      }
    },

    // Bottom: time series of occupancy, filtered by passBrush
    {
      transform: [
        { filter: { param: "passBrush" } }
      ],
      width: "container",
      height: 160,
      mark: {
        type: "line",
        point: true
      },
      encoding: {
        x: {
          field: "period_label",
          type: "ordinal",
          sort: "ascending",
          title: "Period (Year-Month)",
          axis: { labelAngle: -45 }
        },
        y: {
          field: "hotel_occup_rate",
          type: "quantitative",
          title: "Hotel Occupancy Rate"
        },
        color: {
          field: "Year",
          type: "ordinal",
          legend: null
        },
        tooltip: [
          { field: "period_label", type: "nominal", title: "Period" },
          {
            field: "hotel_occup_rate",
            type: "quantitative",
            title: "Occupancy"
          }
        ]
      }
    }
  ]
};

// ================================
//  Embed both specs into the page
// ================================

vegaEmbed("#tourism-panel", tourismEmbeddingSpec).catch(console.error);
vegaEmbed("#a3-linked-panel", reusedA3LinkedSpec).catch(console.error);
