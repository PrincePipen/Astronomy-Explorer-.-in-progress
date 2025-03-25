export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CelestialObject {
  name: string;
  rightAscension: number;
  declination: number;
  magnitude: number;
  type: 'star' | 'planet' | 'constellation';
}

export interface AstronomyQuestion {
  question: string;
  answer: string;
}

export interface APODResponse {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}
