# TODO Application
### Create by : DAVE MARK CANDAR

### How To Run
- install depedencies `$ npm install`
- locate the php config file in `root_folder/application/config/config.php`
-  change the  `localhost:888` if you are not using 8888 in your apache port
- locate the base_url of react in `root_folder/resources/js/components/axios.js` then in 
  ```
    const instance = axios.create({
        //baseURL :'http://3.144.80.164/todos', //prod
        baseURL :'http://localhost:8888/CI_TODO/todos', // enter your localserver here
    })
  ```
- run command inside root_folder `$ npm run dev`

###  Git Commands
```
     git init
     git remote add origin https://github.com/Ahc45/CI_TODO.git
     git flow init
     git commit -m "Project repo initialization"
     git flow  feature start  feature/todo-model
     git push --set-upstream origin feature/todo-model
     git commit -m "Set up core frontend"
     git flow feature start create-function
     git commit -m "create function"
     git flow feature finish create-function
     git flow release start v1
```

### PROTECT OUTPUT (http://3.144.80.164/)