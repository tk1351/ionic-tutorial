import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunny } from 'ionicons/icons';

@Component({
  selector: 'weather-card',
  templateUrl: 'weather-card.component.html',
  styleUrls: ['weather-card.component.scss'],
  imports: [IonCard, IonCardContent, IonIcon, DatePipe],
})
export class WeatherCard {
  date = input.required<number | null>();

  constructor() {
    addIcons({ sunny });
  }
}
