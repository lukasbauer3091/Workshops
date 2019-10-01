import { Component, OnInit } from '@angular/core';
import { EEGSample, MuseClient, zipSamples } from 'muse-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-muse',
  templateUrl: './muse.component.html',
  styleUrls: ['./muse.component.css']
})
export class MuseComponent implements OnInit {

  // declare muse connection variables
  private muse = new MuseClient();
  data: Observable<EEGSample> | null;

  /** variables for the Muse data */
  cur_data = new Array<number>();
  channel = [];
  bad_data = 0;

  test_data = [
    {'AF7': 0, 'AF8': 0, 'TP9': 0, 'TP10': 0},
    {'AF7': 1, 'AF8': 1, 'TP9': 1, 'TP10': 1},
    {'AF7': 2, 'AF8': 2, 'TP9': 2, 'TP10': 2},
    {'AF7': 3, 'AF8': 3, 'TP9': 3, 'TP10': 3},
    {'AF7': 4, 'AF8': 4, 'TP9': 4, 'TP10': 4}
  ];

  constructor() { }

  ngOnInit() {

  }

  /**
   * connectes to the Muse API through bluetooth
   */
  async connectMuse() {

    await this.muse.connect();
    await this.muse.start();

    this.data = zipSamples(this.muse.eegReadings);

    this.stream();
  }

  /**
   * subscribe to the Muse data
   */
  stream() {

    let idx = 0;

    this.data.subscribe((sample) => {

      this.bad_data = 0;

      this.cur_data = sample.data.slice(0, 4).map(Number);

      const data_json = {
        'TP9': this.cur_data[0],
        'AF7': this.cur_data[1],
        'AF8': this.cur_data[2],
        'TP10': this.cur_data[3]
      };

      for (let i = 0; i < 4; i++) {

        if (isNaN(this.cur_data[i])) {

          this.bad_data = 1;
        }
      }

      if (this.bad_data === 0) {

        this.channel.push(data_json);
        idx += 1;

        if (idx > 10) {

          this.channel.shift();
        }

      }

    });
  }

}
