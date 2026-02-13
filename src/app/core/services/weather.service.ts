import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Latitude, Longitude, WeatherResponse } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  setup() {
    console.log('Weather Service 🚀');
  }

  getCurrentWeather(
    lat: Latitude,
    lon: Longitude,
  ): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `${environment.API_URL}?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}`,
    );
  }

  asLatitude(value: number): Latitude {
    return value as Latitude;
  }
  asLongitude(value: number): Longitude {
    return value as Longitude;
  }
}
