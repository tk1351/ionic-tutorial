import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButtons,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, locationOutline, searchOutline } from 'ionicons/icons';
import { WeatherCard } from './weather-card/weather-card.component';
import { WeatherService } from '../core/services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { WeatherResponse } from '../core/models/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButtons,
    IonButton,
    IonRefresher,
    IonRefresherContent,
    WeatherCard,
  ],
})
export class HomePage {
  private weatherService = inject(WeatherService);
  currentWeather = signal<WeatherResponse | null>(null);

  constructor() {
    addIcons({ menuOutline, locationOutline, searchOutline });
    this.weatherService.setup();
    this.loadCurrentWeather();
  }

  async loadCurrentWeather() {
    const getPosition = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = getPosition.coords;

    const lat = this.weatherService.asLatitude(latitude);
    const lon = this.weatherService.asLongitude(longitude);

    this.weatherService.getCurrentWeather(lat, lon).subscribe((data) => {
      this.currentWeather.set(data);
      console.dir(data, { depth: null });
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
