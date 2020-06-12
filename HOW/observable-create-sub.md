Subscribe to Observables
========================
There are two ways to subscribe.
1) when using in a template can directly use the **async pipe**

    **Advantage** : Here subscription management will be taken care by te Angular iteself. The subscription will be cleared (unsubscribed) when the component dies.
    ```sh
    this.users$ = this.http.get('assets/testData/users.json');
    ```
    ```sh
    <li style="list-style: none;" *ngFor="let user of users$ | async">
    ```
2)  To subscribe within our code, and populate the local variable when results are available at the Observable.
    ```sh
    let sub = this.users$.subscribe(data => { 
      this.userList = data;
    });

    ...

    <li style="list-style: none;" *ngFor="let user of userList">

    ...

    //unsubscribe when done.
    sub.unsubscribe();
    ```

    We sould be carefull to **unsubscribe** the Observable when done, else can lead to memory leaks.

Creating Observables
=======================

As simple as creating a new object [**new Observable()**]

```sh
this.customObservable = new Observable((observer)=>{
      setInterval(()=>{ 
        observer.next(new Date().getSeconds());
      },1000);
      setTimeout(()=>observer.complete(),10000);
    });
```
And, subscribing it.

```sh
<p>Custom observer : {{customObservable | async}}</p>
```

Methods:
1) next: creates/push next items to subscribers
2) complete: indicates no more result will be generated
3) error: there was an error.