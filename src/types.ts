export interface Hotspot {
  id: string;
  lat: number;
  lng: number;
  locationName: string;
  pollutionType: string;
  source: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  aqi: number;
  pm25: number;
  pm10: number;
  satellites: string[];
  sensors: string[];
  status: string;
  statusMessage: string;
  citizenReportsCount: number;
  timestamp: string;
  aiSummary: string;
}

export interface ForecastPoint {
  hour: string;
  aqiWithAction: number;
  aqiNoAction: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface ForecastResponse {
  hotspotId: string;
  hotspotName: string;
  baseAqi: number;
  forecast: ForecastPoint[];
}

export interface CitizenSubmitPayload {
  citizenName: string;
  locationName: string;
  description: string;
  lat: number;
  lng: number;
  imageBase64?: string;
  imageType?: string;
}
