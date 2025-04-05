export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export const cities: City[] = [
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "London", latitude: 51.5072, longitude: -0.1276 },
  { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
];
