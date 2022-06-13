import React, { useEffect, useState, useCallback } from "react";

import Head from "next/head";
import MapGL, {
  Popup,
  Source,
  Layer,
  NavigationControl,
  MapLayerMouseEvent,
} from "react-map-gl";
import InfoContainer from "../InfoContainer";

import styles from "./styles.module.scss";
import { heatmapLayer, dataLayer } from "../../helpers/map-style";
import {
  transformMeasurementData,
  transformPaddockData,
  getData,
} from "../../helpers";
import { HoverInfo } from "../../interface";
import { MAPBOX_TOKEN } from "../../helpers/constants";

const DisplayMap = () => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [paddockData, setPaddockData] = useState(null);
  const [measurementData, setMeasurementData] = useState(null);
  const [heatmapField, setHeatmapField] = useState("ph");

  useEffect(() => {
    const fetchData = async () => {
      setPaddockData(await getData("paddock"));
      setMeasurementData(await getData("measurement"));
    };
    fetchData();
  }, []);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const { features } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(
      hoveredFeature && {
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        features: hoveredFeature,
      }
    );
  }, []);

  return (
    <div>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className={styles["map-container"]}>
        <MapGL
          initialViewState={{
            latitude: 52.4,
            longitude: 13.06,
            zoom: 13,
          }}
          minZoom={3}
          mapStyle="mapbox://styles/anuj0070/cl49il3ev004t15p6i4dovmi2"
          mapboxAccessToken={MAPBOX_TOKEN}
          onMouseMove={onHover}
          interactiveLayerIds={["heatmap"]}
        >
          <NavigationControl position="bottom-left" />
          {paddockData && (
            <Source type="geojson" data={transformPaddockData(paddockData)}>
              <Layer {...dataLayer} />
            </Source>
          )}
          {measurementData && (
            <Source
              type="geojson"
              data={transformMeasurementData(measurementData)}
            >
              <Layer {...heatmapLayer(heatmapField)} />
            </Source>
          )}
          {hoverInfo && (
            <Popup
              anchor="top"
              longitude={hoverInfo.longitude}
              latitude={hoverInfo.latitude}
              offset={[0, -3]}
              closeButton={false}
              onClose={() => setHoverInfo(null)}
            >
              id: {hoverInfo.features.properties.id}
            </Popup>
          )}
        </MapGL>
        <InfoContainer
          hoverInfo={hoverInfo}
          heatmapField={heatmapField}
          onFieldChange={setHeatmapField}
        />
      </div>
    </div>
  );
};

export default DisplayMap;
