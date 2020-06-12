Subjects
===========
Note:- Rxjs subjects are **Multicast**, that is , in contrast to simple observables, the execution flow of RxJs Subjects is *shared among all the subscribers*.

-----------

Example:- **Multicast**

```sh
let this.multiCastBase = 10;
this.subjectCheck.subscribe(data=> {
      console.log(data,'Multicast 1');
});

this.subjectCheck.subscribe(data=> {
    console.log(data,'Multicast 2');
});

this.subjectCheck.next(++this.multiCastBase);
```

Are also **data producer**
```sh
this.subjectCheck.next(++this.multiCastBase);
```

Pattern
------
Convert observerable to multicast, by passing in a <u>*Subject*</u> as an **observer**

```sh
let someNumber = 10;
let multcastObserver = new Observable(observer=> {
    observer.next(++someNumber);
//  ^^ this is a subject which was passed.
});
let subject = new Subject<number>();
//setting subscription
subject.subscribe(data=> {console.log('in multicast observable pattern',data);});
subject.subscribe(data=> {console.log('in multicast observable pattern',data);});

//following triggers above subscriptions.
multcastObserver.subscribe(subject);
        //                  ^^- subject passed as value generator 
    

```

Various Flavours
=========
Simple Subject
-----------
Already discussed above. :)

BehaviorSubject
------
Features:
1) Can be initialized with a value
```sh
let bSubject = new BehaviorSubject(10);
```
2) Always can access latest value, even after a late subscription. That means, as soon as a consumer subscribes, it is guranteed to get the latest value.
```sh
let bSubject = new BehaviorSubject(10);
console.log(bSubject.value,'just after init');
bSubject.next(12);
bSubject.subscribe(data=>console.log(data, 'quite late after'));
console.log(bSubject.value,'last value');
```
3) value can be accessed via *.value()* method as well.
```sh
console.log(bSubject.value);
```
ReplaySubject
-------
In a sense like, **'BehaviorSubject'** where it stores last value for late subscribers. 

**But**, has additional capability.

* Can store **multiple values** and 
* For how long.
* But, no .value() and initial value.

```sh
let replaySubject = new ReplaySubject(2,1000);
replaySubject.next(10);
replaySubject.next(20);
replaySubject.next(30);
replaySubject.subscribe(data=>
    {console.log(data)}
    //print 20 and 30.
);
```

AsyncSubject
-------
Quite different, wont send the value to the subscribers untill **.complete** is called on the subject. Will store the last value only.

Note:  Not sure what will be practical use of AsyncSubject

```sh
let aSub = new AsyncSubject();
aSub.subscribe(d=>console.log(d));
aSub.next(10);
aSub.subscribe(d=>console.log(d));
aSub.next(20);
aSub.subscribe(d=>console.log(d));
aSub.next(30);
//all sub will print 30
aSub.complete();
//event this one.
aSub.subscribe(d=>console.log(d,'last from async subject'));
```



