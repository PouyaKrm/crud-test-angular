import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-test-angular-latest';

  constructor() {
    Parse.initialize(environment.applicationId, environment.jsKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    // @ts-ignore
    Parse.serverURL = 'https://parseapi.back4app.com/'
  }


  ngOnInit() {
    this.saveNewPlayer();
  }

  async saveNewPlayer() {
    //Create your Parse Object
    const soccerPlayer = new Parse.Object('SoccerPlayer');
    //Define its attributes
    soccerPlayer.set('playerName', 'A. Wed');
    soccerPlayer.set('yearOfBirth', 1997);
    soccerPlayer.set('emailContact', 'a.wed@email.io');
    soccerPlayer.set('attributes', ['fast', 'good conditioning']);
    try {
      //Save the Object
      const result = await soccerPlayer.save();
      alert('New object created with objectId: ' + result.id);
    } catch (error) {
      // @ts-ignore
      alert('Failed to create new object: ', error.message);
    }
  }

}
