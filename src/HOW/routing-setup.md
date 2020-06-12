Add routing
============
Ideally, if starting a new project, prefer to enable routing while executing the ng cli command. *"ng new"*.

**But**, for some reason if we forget, then follow steps will help.

**Add Route module**:

app-routing is a module name, --flat prevents module to be created in its own directory. --module add the new module to the import of the specified module
```sh
    ng g module app-routing --flat --module=App
```


Declare an **array of paths** to be resolved by route
```sh
 const routes:Routes = [
     { path: 'test', component: TestComponent}
        ...
 ]
```

import dependency of **RouterModule** on the routing module ,and also the paths to resolve
```sh
import {RouterModule, Routes} from '@angular/router'
...
imports: [RouterModule.forRoot(routes)],
```

Also, **export RouterModule** from from the routing module we created
```sh
    exports:[RouterModule]
```


**Next**, add **router-outlet** to the html template.
```sh
    <router-outlet></router-outlet>
```

