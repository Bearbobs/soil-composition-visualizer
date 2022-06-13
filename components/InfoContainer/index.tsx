import React, { useCallback } from "react";

import styles from "./styles.module.scss";
import { HoverInfo } from "../../types";
import { HEATMAP_FIELDS } from "../../helpers/constants";

const InfoContainer = (props: {
  hoverInfo: HoverInfo | null;
  heatmapField: string;
  onFieldChange: (newField: string) => void;
}) => {
  const onFieldChange = (event) => {
    props.onFieldChange(event.target.value);
  };

  return (
    <div>
      <div className={styles.container}>
        <h3>Soil Composition</h3>
        {props.hoverInfo && (
          <div className={styles.text}>
            {Object.entries(props.hoverInfo.features.properties).map(
              ([key, value]) => (
                <p key={key}>
                  <b>{key.replace(/_/g, " ")}</b> : {value}
                </p>
              )
            )}
          </div>
        )}
        {!props.hoverInfo && (
          <div>Hover on heatmap to view soil composition</div>
        )}
      </div>
      <div className={styles.selector}>
        <label>HeatMap Base Field: </label>
        <select value={props.heatmapField} onChange={onFieldChange}>
          {HEATMAP_FIELDS.map((value) => (
            <option key={value} value={value}>
              {value.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InfoContainer;
