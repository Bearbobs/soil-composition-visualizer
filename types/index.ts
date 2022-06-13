export type GeoJson = {
    type: string;
    features: object[];
};

export type MeasurementData = {
    geometry: {
        type: string;
        coordinates: number[];
    };
    id: number;
};

export type Paddockdata = {
    id: string;
    name: string;
    number: string;
    geo: {
        id?: string;
        properties: object;
        geometry: {
            type: string;
            coordinates: number[];
        };
    }
    measurementGrid: string;
};

export type HoverInfo = {
    longitude: number;
    latitude: number;
    features: {
        properties: {
            id: number;
        };
    }
}