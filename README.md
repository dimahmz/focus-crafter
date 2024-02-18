<h1 align="center">
  <img src="https://focus-crafter.vercel.app/logo.png" alt="Focus-crafter Logo" width="224px"/><br/>
  Focus on being productive instead of budy
</h1>
<p align="center">An open source web-app to help you implement the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">Pomodoro</a> Technique in your daily work routine. 
With an easy-to-use interface, you can set your work and break intervals and get started with your Pomodoro sessions in no time. 
It also comes with a timer that will alert you when it's time to take a break or start a new Pomodoro session, so you can stay on track and achieve your goals.</p>

<br/>

## 💻 Production Application

The web app is deployed to [focus-crafter.vercel.app](https://focus-crafter.vercel.app)

<br/>


## Technologies used

<div style="display: flex; justify-content: space-between;">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"  style="margin-right: 3px;" width="48">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"  style="margin-right: 3px;" width="48">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg"  style="margin-right: 3px;" width="48">   
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"  style="margin-right: 3px;" width="48">  
</div>


This web app is built with MEVN stack technologies. 

It contains a client template(VueJS) connected to a mongodb via an API layer written in nodejs & expressjs.

## Project Setup

### Client Side

```sh
cd client

npm install
```

### Compile and Hot-Reload for Development


```sh
npm run dev
```

### server side


```sh
cd server

npm install

mv .env.example .env

```
<h4>open the .env file and fill in these environment  varaibles </h4>


<p> pro_focus_jwtKey="" <i> // a random string to be used for creating jwt token </i> </p>
<p> db_password=""   <i> // you database password  </i> </p> 
<p> app_email=""  <i> // an email address to be used to send email to the user  </i> </p> 
<p>  app_email_password=""  <i> // the email password  </i> </p> 
<p>  NODE_ENV=""  <i> // node environment  </i> </p> 
<p>  PORT=""  <i> // port for the app to run on in dev enviroment  </i> </p> 
<p>  app_domain_name=""  <i> // the server IP address or the url of the api where it's depoyed  </i> </p> 


#### start the server 
```sh
node index.js
```



