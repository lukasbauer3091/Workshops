# Muse-Intro

The purpose of this application is to teach you the basics of making an Angular application and how to work with Muse.

## Part I: Demo

If you haven't yet already, open the terminal and clone the workshop directory from github, and navigate to the __muse_intro__ folder under the __workshop_2018_2019__ folder.

Once in the __muse_intro__ folder, type in the below commands in the terminal to run the demo application:

```
>>> npm install
>>> (run 'npm audit fix' if prompted)
>>> ng serve
    (or could run 'ng serve --open' if default browser is Chrome)
```

Now copy the generated localhost address in the terminal into the Chrome browser. (Should look something like http://localhost:4200/).

Click on the connect button on the bottom of the page, pair a muse device and wait for the data to appear on screen (this may close to 10-30 seconds). __Bluetooth must be enabled__ for this to work.

Now close the browser and terminate the session by typing 'ctrl c' in the terminal.

## Part II: Build your own Angular application

### II a) Generate a new app and the components

_Step 1:_ Navigate to the folder where you want your application to be in, generate a new Angular app and name it muse-app.

_Step 2:_ Navigate to the muse-app folder in the terminal and generate a new component called 'muse'

### II b) Change the title and background

_Step 3:_ Go to the __workshop_2018_2019__ folder, copy the 'sky.jpg' and put it in the src/assets/ folder of the app you just generated.

_Step 4:_ Open the __app.component.css__ file and paste in the following code snippit:

```
.home {
  position: absolute;
  background-image: url('../assets/sky.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  height: 100%;
  width: 100%;
  font: 100 30px/1.3 'Oleo Script', Helvetica, sans-serif;
  color: white;
  text-shadow: 4px 4px 0px rgba(255, 255, 255, 0.3);
  text-align: center;
  margin: 0;
}
```

_Step 6:_ Open the __app.component.ts__ and change the title of the app to 'Muse Intro'.

_Step 5:_ Open the __app.component.html__ file, delete whatever is in the file currently and paste in the following code:

```
<!--The content below is only a placeholder and can be replaced.-->
<link href='http://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>

<div class="home">
  <h1>
    {{ title }}
  </h1>
  <app-muse></app-muse>
</div>
```

This basically includes title of the application and the 'muse' component into the main html.

Now run the application. You should see a sky background with the title 'Muse Intro', and the words 'muse works!'

### II c) Install libraries using npm

_Step 7:_ Make sure you are under the muse-app directory run the following commands in the terminal to install the libraries 'muse-js' and 'rxjs' using npm:

```
>>> npm i muse-js
>>> npm i rxjs
```

### II d) Stream Muse data!

_Step 7:_: Now that you got everything set up, we could start working on how to stream live data from the Muse. Copy the below template code into the __muse.component.ts__ (clear the existing code in the file first):

```
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

  // variables for the Muse data

  cur_data = new Array<number>();
  channels = [];

  // dummy data to test whether ngFor works

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

    this.data.subscribe((sample) => {

      // ----------------- TO DO --------------------

      // Hint: could get the data received by using sample.data
      //       ie) console.log(sample.data)
      //       could use console.log to check the format of the data received from the Muse.

      // Hint: the first four values of the sample data are the values for TP9, AF7, AF8, TP10 respectively,
      //       and the type for the values are strings.

      // step 1: the 'cur_data' variable should have the form [val_TP9, val_AF7, val_AF8, val_TP10].
      //         find a way to assign the 'cur_data' to be an array containing the first four values of the
      //         current sample data. make sure the values are of type Number not String.

      // step 2: create a new json object of the form {'TP9': val_TP9, 'AF7': val_AF7, 'AF8': val_AF8, 'TP10': val_TP10}.
      //         hint: use the 'cur_data' variable to help you do that.

      // step 3: check whether any of the four values received are invalid (NaN), if so just ignore it and do nothing
      //         Hint: consider using a flag variable to help you keep track of whether any NaN is seen.

      // step 4: if all the values are good (not NaN), push the json object into the 'channels' list. make sure the
      //         list size stays at 10. if the list size exceeds 10, must shift the list to get rid of the old values.

    });
  }
}
```

Fill in the missing code snippits in the __stream()__ function.

### II e) Make a dynamic list using ngFor

_Step 8:_ Test how to use ngFor by trying to display a dummy static array variable first. In __muse.component.html__, add a list item to display the 'test_data' array declared in the __muse.component.js__ using ngFor.

Notes on how to work with ngFor could be found at https://angular.io/guide/displaying.data.

_Step 9:_ Now that you know how to use ngFor, lets display some live Muse data! Make four lists in __muse.component.html__ and have them display the 10 most recent records in each of the AF7, AF8, TP9, and TP10 channels.

Hint: Remember that each item in the list 'channels' is a json object of the form '{'TP9': val_TP9, 'AF7': val_AF7, 'AF8': val_AF8, 'TP10': val_TP10}'

If this step is done properly, the page should display live data from the Muse.

### II f) Appearance enhancement with CSS

_Step: 10_ After making sure the streaming function works and the list is being updated dynamically, we could start making the application more presentatble by adding some CSS features.

Make the html components prettier by modifying attributes such as the 'border-radius', 'margin', and 'alignment' in the CSS files.
