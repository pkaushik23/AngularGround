import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';


@Component({
  selector: 'play-box',
  templateUrl: './play-box.component.html',
  styleUrls: ['./play-box.component.scss']
})
export class PlayBoxComponent implements OnInit {

  private customObservable;//used in ui.
  private subjectCheck = new Subject<number>();

  constructor(private http:HttpClient) { }

  private custom$:Observable<any>;
  private users$:Observable<any>; //good practise to name observable with a dollr sign
  private userList: any; // bas practise bit works for an example
  private multiCastBase = 10;
  private uniCastBase = 10;

  ngOnInit() {
    this.ExperimentRxJs();
  }

  private ExperimentRxJs(){
    //custom observable
    this.customObservable = new Observable((observer)=>{
      setInterval(()=>{ 
        observer.next(new Date().getSeconds());
      },1000);
      setTimeout(()=>observer.complete(),10000);
    });

    //example uniCast; separate executing for each subscriber
    let unicast = new Observable(observar=>{
      observar.next(++this.uniCastBase);
    });
    //when called by each subscriber, has seperate execution flow.
    //thus value of unicastBase increases each time.
    unicast.subscribe(data=>{console.log('unicast sub 1', data)});
    unicast.subscribe(data=>{console.log('unicast sub 2', data)});

    //rxJs Subject - Multicast
    //same value across multiple subscribers.
    this.subjectCheck.subscribe(data=>{
      console.log(data,'Multicast 1');
    });

    this.subjectCheck.subscribe(data=>{
      console.log(data,'Multicast 2');
    });

    this.subjectCheck.next(++this.multiCastBase);
    
    //Convert observer to a multicast.
    let someNumber = 10;
    let multcastObserver = new Observable(observer=> {
      observer.next(++someNumber);
    });
    let subject = new Subject<number>();
    subject.subscribe(data=> 
      {console.log('in multicast observable pattern',data);});
    subject.subscribe(data=> 
      {console.log('in multicast observable pattern',data);});
    subject.subscribe(data=> 
      {console.log('in multicast observable pattern',data);});
    //single subscription triggering multiple __
    // multi case subscription
    multcastObserver.subscribe(subject);

    //observable from http
    this.users$ = this.http.get('assets/testData/users.json');
    this.users$.subscribe(data => { 
      this.userList = data;
    });
  }
}
