declare module 'dadata-suggestions' {
    export default class DaData {
      constructor(token: string);
      geolocate(options: { lat: number; lon: number }): Promise<any>;
    }
  }
  