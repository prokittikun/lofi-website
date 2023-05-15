import { Component, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rainAudio = new Audio('../../assets/sound/rain_city.mp3');
  burnAudio = new Audio('../../assets/sound/burn.mp3');
  // rainClick: boolean = false;

  soundObj = [
    {
      name: 'rain',
      src: this.rainAudio,
      status: false,
      volume: 1,
    },
    {
      name: 'burn',
      src: this.burnAudio,
      status: false,
      volume: 1,
    },
  ];
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  changeStatusObject(sound: string) {
    const soundFilter = this.soundObj.filter((x) => {
      return x.name === sound;
    });
    if (soundFilter[0].status) {
      for (const [i, iterator] of this.soundObj.entries()) {
        if (iterator.name === sound) {
          iterator.status = false;
        }
      }
      soundFilter[0].src.pause();
    } else {
      for (const [i, iterator] of this.soundObj.entries()) {
        if (iterator.name === sound) {
          iterator.status = true;
        }
      }
      soundFilter[0].src.addEventListener('timeupdate', function () {
        var buffer = 0.44;
        if (this.currentTime > this.duration - buffer) {
          this.currentTime = 0;
          this.play();
        }
      });
      soundFilter[0].src.play();
    }
  }
  onchangeVolume(sound: any) {
    const soundFilter = this.soundObj.filter((x) => {
      return x.name === sound;
    });
    soundFilter[0].src.volume = soundFilter[0].volume;
    // console.log(this.soundObj[0].volume);
  }
}
