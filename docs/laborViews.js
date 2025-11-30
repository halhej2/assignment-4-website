// laborViews.js
// Zaina Khalil — Labor Embedding + Linked Views (vconcat version)

console.log("laborViews.js loaded");

// Use global URL from main.js if present, otherwise fall back
const laborDataUrl = window.LABOR_DATA_URL || "data/labor_embeddings_2d.csv";

// One vega-lite spec with three vertically stacked views
const laborSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description:
    "Labor embedding (PCA of unemployment, labor-force participation, log(total jobs)) with linked views.",
  data: { url: laborDataUrl },

  vconcat: [
    // ───────────────── 1. Embedding scatter ─────────────────
    {
      width: 700,
      height: 260,
      selection: {
        laborBrush: {
          type: "interval",
          encodings: ["x", "y"]
        }
      },
      mark: { type: "point", filled: true, size: 60 },
      encoding: {
        x: {
          field: "embX",
          type: "quantitative",
          title: "Embedding X (Labor PCA)"
        },
        y: {
          field: "embY",
          type: "quantitative",
          title: "Embedding Y (Labor PCA)"
        },
        color: {
          field: "Year",
          type: "ordinal",
          title: "Year",
          legend: { orient: "right" }
        },
        tooltip: [
          { field: "periodLabel", type: "nominal", title: "Month" },
          { field: "Year", type: "ordinal" },
          {
            field: "unemp_rate",
            type: "quantitative",
            title: "Unemployment Rate"
          },
          {
            field: "labor_force_part_rate",
            type: "quantitative",
            title: "Labor-Force Participation"
          },
          { field: "total_jobs", type: "quantitative", title: "Total Jobs" },
          {
            field: "logTotalJobs",
            type: "quantitative",
            title: "log(Total Jobs)"
          }
        ]
      },
      title: "Labor Embedding (Brush To Filter Linked Views)"
    },

    // ───────────── 2. Unemployment over time (filtered) ─────────────
    {
      transform: [{ filter: { param: "laborBrush" } }],
      width: 700,
      height: 200,
      mark: { type: "line", point: true },
      encoding: {
        x: {
          field: "periodLabel",
          type: "ordinal",
          title: "Month",
          sort: "ascending",
          axis: {
            labelAngle: -45,
            tickCount: 7,
            labelOverlap: "greedy"
          }
        },
        y: {
          field: "unemp_rate",
          type: "quantitative",
          title: "Unemployment Rate"
        },
        color: {
          field: "Year",
          type: "ordinal",
          title: "Year",
          legend: { orient: "right" }
        },
        tooltip: [
          { field: "periodLabel", type: "nominal", title: "Month" },
          {
            field: "unemp_rate",
            type: "quantitative",
            title: "Unemployment Rate"
          },
          {
            field: "labor_force_part_rate",
            type: "quantitative",
            title: "Labor-Force Participation"
          },
          { field: "total_jobs", type: "quantitative", title: "Total Jobs" }
        ]
      },
      title: "Unemployment Rate Over Time (Filtered By Embedding Brush)"
    },

    // ─ 3. Unemployment vs labor-force participation (filtered) ─
    {
      transform: [{ filter: { param: "laborBrush" } }],
      width: 700,
      height: 220,
      mark: { type: "point", filled: true, size: 70 },
      encoding: {
        x: {
          field: "unemp_rate",
          type: "quantitative",
          title: "Unemployment Rate"
        },
        y: {
          field: "labor_force_part_rate",
          type: "quantitative",
          title: "Labor-Force Participation"
        },
        color: {
          field: "Year",
          type: "ordinal",
          title: "Year",
          legend: { orient: "right" }
        },
        tooltip: [
          { field: "periodLabel", type: "nominal", title: "Month" },
          {
            field: "unemp_rate",
            type: "quantitative",
            title: "Unemployment Rate"
          },
          {
            field: "labor_force_part_rate",
            type: "quantitative",
            title: "Labor-Force Participation"
          },
          { field: "total_jobs", type: "quantitative", title: "Total Jobs" }
        ]
      },
      title:
        "Unemployment vs Labor-Force Participation (Filtered By Embedding Brush)"
    }
  ]
};

vegaEmbed("#labor-panel", laborSpec, { actions: false }).catch(console.error);
