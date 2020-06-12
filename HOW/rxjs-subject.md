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

