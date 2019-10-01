import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

import { Observable } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

import { node_data } from './data';

import * as bcijs from 'bcijs/browser.js';
import { EEGSample, MuseClient, zipSamples } from 'muse-js';

@Component({
  selector: 'app-nightsky',
  templateUrl: './nightsky.component.html',
  styleUrls: ['./nightsky.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NightskyComponent implements OnInit {

  // declare muse connection variables
  private muse = new MuseClient();

  data: Observable<EEGSample> | null;

  /** variables for D3 svg display */
  front_texts: any;
  back_circles: any;

  // svg
  svg: any;
  margin: any;
  front: any;
  back: any;
  width: any;
  height: any;

  // nodes drawn on svg for the EEG
  AF7: any;
  AF8: any;
  TP9: any;
  TP10: any;
  node_class: any;
  nodes: any;

  // the fill opacity for the nodes based on abp values
  opacities = new Array<number>();
  // an array of colors used for each frequency band
  sbp_color: any;

  /** variables for the Muse data */
  cur_data = new Array<number>();

  // the four channels for the electrodes
  ch_AF7 = [0];
  ch_AF8 = [0];
  ch_TP9 = [0];
  ch_TP10 = [0];

  // an array of band powers computed for each channel
  sbp_channels = new Array<Array<number>>();
  // the band powers calculated from the previous data
  prev_sbps = new Array<Array<number>>();

  // index into the abp_channels to get the frequency selected
  cur_frequency: number;
  // index into the abp_color to get the color corresponding to the selected frequency
  cur_freq_color: number;

  // an array of frequency bands
  frequency_bands = new Array<string>();

  /** variables for when the user wants to see which frenquency band power is the current highest */
  highest_ind = 0;
  highest_colors = new Array<number>();
  prev_colors = new Array<number>();

  most_frequent = 0;

  bad_data = 0;
  started_flag = 0;

  constructor(private papa: Papa, private http: HttpClient) {
  }

  ngOnInit() {

    this.createModel();
  }

  createModel() {

    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.margin = {top: 20, right: 20, bottom: 20, left: 20};



    // initializing the variables to be used for EEG
    this.sbp_color = ['#4193c6', '#cc4fb1', '#46bc3e', '#833fc1', '#e28009'];
    this.node_class = ['muse_TP9', 'muse_AF7', 'muse_AF8', 'muse_TP10'];
    this.sbp_channels = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    this.frequency_bands = ['alpha', 'beta', 'theta', 'delta', 'gamma'];
    this.opacities = [0.5, 0.5, 0.5, 0.5];
    this.highest_colors = [0, 0, 0, 0];
    this.prev_colors = [0, 0, 0, 0];

    this.cur_frequency = 0;
    this.cur_freq_color = 0;

    this.back = this.svg.append('g');

    this.back_circles = this.back.selectAll('circles')
      .data(node_data['front_nodes'])
      .enter()
      .append('circle')
      .attr('class', 'back_circle')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.front = this.svg.append('g');

    this.AF7 = this.front.selectAll('circles')
      .data(node_data['AF7'])
      .enter()
      .append('circle')
      .attr('class', 'muse_AF7')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.AF8 = this.front.selectAll('circles')
      .data(node_data['AF8'])
      .enter()
      .append('circle')
      .attr('class', 'muse_AF8')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.TP9 = this.front.selectAll('circles')
      .data(node_data['TP9'])
      .enter()
      .append('circle')
      .attr('class', 'muse_TP9')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.TP10 = this.front.selectAll('circles')
      .data(node_data['TP10'])
      .enter()
      .append('circle')
      .attr('class', 'muse_TP10')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.front_texts = this.front.selectAll('text')
      .data(node_data['front_nodes'])
      .enter()
      .append('text')
      .attr('x', (d) => d['x'] - 20)
      .attr('y', (d) => d['y'] + 7)
      .text((d) => d['id'])
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('align', 'center')
      .attr('fill', 'black');

    this.nodes = [this.AF7, this.AF8, this.TP9, this.TP10];

  }

  /**
   * when user clicks on the button Alpha, sets the current frequency selected as 'alpha'
   * TODO: set the cur_frequency and cur_freq_color to the correct index value
   *       set the highest_ind to 0 since a specific frequency is selected
   */
  setAlpha() {
    this.cur_frequency = 0;
    this.cur_freq_color = 0;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Alpha, sets the current frequency selected as 'beta'
   */
  setBeta() {
    this.cur_frequency = 1;
    this.cur_freq_color = 1;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Beta, sets the current frequency selected as 'theta'
   */
  setTheta() {
    this.cur_frequency = 2;
    this.cur_freq_color = 2;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Theta, sets the current frequency selected as 'delta'
   */
  setDelta() {
    this.cur_frequency = 3;
    this.cur_freq_color = 3;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Delta, sets the current frequency selected as 'gamma'
   */
  setGamma() {
    this.cur_frequency = 4;
    this.cur_freq_color = 4;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Highest, sets the highest_ind to 1 to indicate that we want to display the
   * frequency with the highest value
   */
  setHighest() {
    this.highest_ind = 1;
  }

  /**
   * reads input signals from a csv file and calculates the signal band powers for each channel
   */
  offLine() {

    // an array which contains the average value for each channel
    const ch_mean = [0, 0, 0, 0];
    // an array which contains the variance for each channel
    const ch_var = [0, 0, 0, 0];

    // subscribe the parse through the csv data
    this.http.get('./assets/stare_blink.csv', {responseType: 'text'})
      .subscribe(data => this.papa.parse(data, {
        complete: (result) => {

          // an array of array of numbers containing each line read from the csv file
          const arr = Array<Array<number>>();

          // push the subscribed data into the array
          for (let i = 1; i < result.data.length / 2; i++) {
            arr.push(result.data[i * 2]);
          }

          // iterate through each line read from the csv
          for (let i = 0; i < arr.length - 1; i++) {

            setTimeout(() => {

              // TODO: for each channel, append the value read
              //       each item in 'arr' is of the form [val_TP9, val_AF7, val_AF8, val_TP10]

              // 'arr' should only contain the most recent 256 records
              if (i > 255) {

                // TODO: shift the channels to get rid of the oldest value read

                // TODO: calculate the average over all values across each channel (each index in the 'ch_mean' array represents the average for one channel)
                //       hint: to get the average for an array, try some_array.reduce((a, b) => a + b, 0) / array_length

                // TODO: calculate the variance over all values across each channel (each index in the 'ch_var' array represents the variance for one channel)
                //       hint: to get the variance for an array, try some_array.reduce((a, b) => a + Math.pow((b - array_avg), 2), 0) / 256

                // feed the zero-meaned values into the signalBandPower function to calculate the frequency bands
                // 'sbp__channels' is of the form [[TP9_alpha, TP9_beta, TP9_theta, TP9_delta, TP9_gamma], [AF7...], [AF8...], [TP10...]]
                for (let j = 0; j < 5; j++) {

                  this.sbp_channels[0][j] = bcijs.signalBandPower(this.ch_TP9.map(x => (x - ch_mean[0]) / ch_var[0]), 256, this.frequency_bands[j]);
                  this.sbp_channels[1][j] = bcijs.signalBandPower(this.ch_AF7.map(x => (x - ch_mean[1]) / ch_var[1]), 256, this.frequency_bands[j]);
                  this.sbp_channels[2][j] = bcijs.signalBandPower(this.ch_AF8.map(x => (x - ch_mean[2]) / ch_var[2]), 256, this.frequency_bands[j]);
                  this.sbp_channels[3][j] = bcijs.signalBandPower(this.ch_TP10.map(x => (x - ch_mean[3]) / ch_var[3]), 256, this.frequency_bands[j]);
                }

                this.update_highest();

              }

            });
          }
        }
      }));
  }

  /**
   * helper function to update the svg to reflect the change when user selects a particular frequency
   */
  update_svg_selected(idx: number) {

    d3.selectAll('.' + this.node_class[idx])
      .style('fill', this.sbp_color[this.cur_freq_color])
      .attr('fill-opacity', this.opacities[idx])
      .merge(this.nodes[idx]);
  }

  /**
   * helper function to update the svg to reflect the change when user wants to display the frequency with highest abp
   */
  update_svg_highest(idx: number) {

    d3.selectAll('.' + this.node_class[idx])
      .style('fill', this.highest_colors[idx])
      .attr('fill-opacity', 1)
      .merge(this.nodes[idx]);
  }

  /**
   * updates the svg to display the frequency with the highest value currently
   *       if the current color chosen for the color is different than the previous color, update the svg to reflect the changes
   *       update prev_colors to be the current color
   */
  update_highest() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {

        let bad_input = 0;

        // TODO: first check if any value in the 'sbp_channels' (the array containing the band powers calculated) is NaN
        //       if it is, then raise the 'bad_value' flag and we will not process this data

        const occurrence = [0, 0, 0, 0, 0];
        let highest_idx = 0;

        if (bad_input === 0) {

          // iterate through the array 'sbp_channels' to work with the band power for each channel
          for (let i = 0; i < 4; i++) {

            // TODO: set the 'highest_idx' to the index for the item in 'sbp_channels[i]' which has the highest value

            occurrence[highest_idx] += 1;

            this.highest_colors[i] = this.sbp_color[highest_idx];

            if (this.highest_colors[i] !== this.prev_colors[i]) {

              this.update_svg_highest(i);

              this.prev_colors[i] = this.highest_colors[i];
            }
          }

          this.most_frequent = occurrence.indexOf(Math.max.apply(Math, occurrence));

        }

      }, 0);
    });
  }

  /**
   * update the svg to display the frequency selected by the user
   */
  update_selected() {

    if (this.started_flag === 0) {

      console.log('first detected');

      this.prev_sbps = JSON.parse(JSON.stringify(this.sbp_channels));
      this.started_flag = 1;

    } else {

      console.log('cur_abp: ' + this.sbp_channels[0]);

      for (let i = 0; i < 4; i++) {
        if (this.sbp_channels[i][this.cur_frequency] > this.prev_sbps[i][this.cur_frequency]) {
          this.opacities[i] += 0.02;

          if (this.opacities[i] > 1) {
            this.opacities[i] = 1;
          }

        } else if (this.sbp_channels[i][this.cur_frequency] < this.prev_sbps[i][this.cur_frequency]) {
          this.opacities[i] -= 0.02;

          if (this.opacities[i] < 0) {
            this.opacities[i] = 0;
          }
        }

        this.update_svg_selected(i);

      }
      this.prev_sbps = JSON.parse(JSON.stringify(this.sbp_channels));
    }
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

    let nxt_idx = 0;
    const ch_mean = [0, 0, 0, 0];
    const ch_var = [0, 0, 0, 0];

    this.data.subscribe((sample) => {

      // TODO: assign the values read from the Muse to 'this.cur_data'
      // Hint: could get the data received by using sample.data
      //       ie) console.log(sample.data)
      //       could use console.log to check the format of the data received from the Muse.

      // Hint: the first four values of the sample data are the values for TP9, AF7, AF8, TP10 respectively,
      //       and the type for the values are strings.

      // the 'cur_data' variable have the form [val_TP9, val_AF7, val_AF8, val_TP10].

      this.bad_data = 0;
      // TODO: first check if any value in the 'sbp_channels' (the array containing the band powers calculated) is NaN


      if (this.bad_data === 0) {

          // TODO: for each channel (ie. 'this.ch_TP9'), append the value read

        nxt_idx += 1;

        if (nxt_idx > 255) {

          // TODO: shift each channel to get rid of the oldest value

          // TODO: calculate each channel's mean and variance like we did in the offline analysis, and record them in 'ch_mean' and 'ch_var'

          for (let j = 0; j < 5; j++) {

            this.sbp_channels[0][j] = bcijs.signalBandPower(this.ch_TP9.map(x => (x - ch_mean[0]) / ch_var[0]), 256, this.frequency_bands[j]);
            this.sbp_channels[1][j] = bcijs.signalBandPower(this.ch_AF7.map(x => (x - ch_mean[1]) / ch_var[1]), 256, this.frequency_bands[j]);
            this.sbp_channels[2][j] = bcijs.signalBandPower(this.ch_AF8.map(x => (x - ch_mean[2]) / ch_var[2]), 256, this.frequency_bands[j]);
            this.sbp_channels[3][j] = bcijs.signalBandPower(this.ch_TP10.map(x => (x - ch_mean[3]) / ch_var[3]), 256, this.frequency_bands[j]);
          }

          this.update_highest().then(() => console.log('success'));

        }
      }

    });
  }

}
