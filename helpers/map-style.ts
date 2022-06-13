import type { HeatmapLayer, FillLayer } from 'react-map-gl';

const MAX_ZOOM_LEVEL = 9;

export const heatmapLayer = (field: string = 'ph'): HeatmapLayer => {
  return {
    id: 'heatmap',
    type: 'heatmap',
    paint: {
      'heatmap-opacity': 1,
      'heatmap-intensity': 1,
      'heatmap-weight': {
        property: field,
        type: 'exponential',
        stops: [[0, 0], [5, 2]]
      },
      "heatmap-color": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(0, 0, 255, 0)", 0.1, "#ffffb2", 0.3, "#feb24c", 0.5, "#fd8d3c", 0.7, "#fc4e2a", 1, "#e31a1c"]
    }
  }
};

export const dataLayer: FillLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': '#188203',
    'fill-opacity': 0.8
  }
};