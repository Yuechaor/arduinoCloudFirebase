import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class WeatherService {
  constructor(private db: AngularFireDatabase) { }
  getDataFromFirebase(dataset: string ) {
    return this.db.list('/data', ref => ref.limitToLast(24));
  }
  searchDateByDate(date: string) {
    return this.db.list('/data', ref => ref.orderByChild('date').equalTo(date));
  }
}
