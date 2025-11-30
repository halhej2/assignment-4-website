// --------- Experimental spec: area charts (not used in final interface) ---------
const tourismAreaAttemptSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Attempt: passengers and occupancy as filled area charts.",
  data: { url: "data/tourism_embeddings_2d.csv" },
  vconcat: [
    {
      width: "container",
      height: 140,
      mark: { type: "area", opacity: 0.6 },
      encoding: {
        x: {
          field: "period_label",
          type: "ordinal",
          sort: "ascending",
          title: "Period (Year-Month)",
          axis: { labelAngle: -45 }
        },
        y: {
          field: "logan_passengers",
          type: "quantitative",
          title: "Logan Passengers"
        },
        color: { value: "#6baed6" }
      }
    },
    {
      width: "container",
      height: 140,
      mark: { type: "area", opacity: 0.6 },
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
        color: { value: "#252525" }
      }
    }
  ]
};

// Example embed :
// vegaEmbed("#tourism-area-attempt", tourismAreaAttemptSpec);





// --------- Experimental spec: ADR and occupancy on same plot ---------
const adrOccupCombinedAttemptSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Attempt: ADR and occupancy in a single chart (confusing scales).",
  data: { url: "data/tourism_embeddings_2d.csv" },
  width: "container",
  height: 200,
  layer: [
    {
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
          field: "hotel_avg_daily_rate",
          type: "quantitative",
          title: "Avg Daily Rate + Occupancy (mixed scale)"
        },
        color: { value: "#3182bd" }
      }
    },
    {
      mark: { type: "line", point: true },
      encoding: {
        x: {
          field: "period_label",
          type: "ordinal",
          sort: "ascending"
        },
        y: {
          field: "hotel_occup_rate",
          type: "quantitative"
          // Same axis as ADR — this is why it looks bad.
        },
        color: { value: "#e6550d" }
      }
    }
  ]
};

// Example embed:
// vegaEmbed("#adr-occup-combined-attempt", adrOccupCombinedAttemptSpec);
