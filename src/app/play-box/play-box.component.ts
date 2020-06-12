import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'play-box',
  templateUrl: './play-box.component.html',
  styleUrls: ['./play-box.component.scss']
})
export class PlayBoxComponent implements OnInit {

  private customObservable;
  constructor(private http:HttpClient) { 


  }

  private custom$:Observable<any>;
  private users$:Observable<any>; //good practise to name observable with a dollr sign
  private userList: any; // bas practise bit works for an example
  
  ngOnInit() {
    this.customObservable = new Observable((observer)=>{
      
      setInterval(()=>{ 
        observer.next(new Date().getSeconds());
      },1000);
      setTimeout(()=>observer.complete(),10000);
    });

    this.users$ = this.http.get('assets/testData/users.json');
    this.users$.subscribe(data => { 
      this.userList = data;
    });

  }




}
