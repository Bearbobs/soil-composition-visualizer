import { MeasurementData, Paddockdata, GeoJson } from "../types";

export async function getData(endpoint: string) {
  const resp = await fetch(
    `/api/v1/${endpoint}`
  );
  return resp.json();
};

export function transformPaddockData(data: Paddockdata[]): GeoJson {
  let res: GeoJson = {
    type: "FeatureCollection",
    features: []
  };
  data.forEach(element => {
    element.geo.properties = {
      ...element.geo.properties,
      id: element.id,
      name: element.name,
      number: element.number,
      measurementGrid: element.measurementGrid,
    };
    element.geo.id = element.id;
    res['features'].push(element.geo);
  });
  return res;
};

export function transformMeasurementData(data: MeasurementData[]): GeoJson {
  let res: GeoJson = {
    type: "FeatureCollection",
    features: []
  };
  data.forEach(element => {
    let { geometry, ...properties } = element;
    res['features'].push({
      id: properties.id,
      type: "Feature",
      properties: properties,
      geometry: geometry,
    });
  });
  return res;
};