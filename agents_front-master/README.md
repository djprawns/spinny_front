# agents_front

Setup Nginx on your system

Get Nginx: - 
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-14-04-lts

Setup your proxy server. See nginx.conf. Basicaly replace your nginx.conf in /etc/nginx/ with the one in this repo.

Match the backend key with nginx.conf proxy_pass

angular.module('AgentApp.config', [])
.constant('ApiConfig', {

  'backend': 'your api url here for ex. http://localhost:8081'   // change this as your proxy pass server, see line 59 in config.js 

});

Run your backend server,

For Python-Django - 
    python manage.py runserver
    
Writing your front end separately helps achieve one of the most popular programming design paradigms, Abstraction.
You write your front end in a backend agnostic way. So if tomorrow we were to switch to node.js or ruby, 
this would still work :)
Also front end development is faster.
