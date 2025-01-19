## als root:

```bash 
apt update
apt upgrade
apt install mariadb-server nginx vim git
```

### certbot
  
>https://certbot.eff.org/instructions?ws=nginx&os=pip  

```bash
apt install python3 python3-venv libaugeas0
sudo apt remove certbot
python3 -m venv /opt/certbot/
/opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx
ln -s /opt/certbot/bin/certbot /usr/bin/certbot
certbot --nginx
```
### nginx config

**/etc/nginx/sites-available/default (or link a new file)**

```bash
server {
    listen 80;
    listen [::]:80;

    server_name www.domainname.ch domainname.ch;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name www.domainname.ch domainname.ch;

    ssl_certificate /etc/letsencrypt/live/domainname.ch/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domainname.ch/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /files/ {
        root /home/manusblog/manusblog_next/public;
        autoindex off; # Disable directory listing
    }
}
```

**/etc/nginx/nginx.conf**

```bash
http {

        ##
        # Basic Settings
        ##

        sendfile on;
        client_max_body_size 20M;
```

### create user

```bash
sudo useradd -m -s /bin/bash -G sudo manusblog
passwd manusblog
```

### mysql

```bash
mysql -u root
```

```sql
CREATE USER manusblog IDENTIFIED BY 'dsLfT882gUZmteZ';
CREATE USER blogauth IDENTIFIED BY 'ELFmkh5XYND9DeN';

CREATE DATABASE manusblog;
GRANT ALL PRIVILEGES ON manusblog.* TO manusblog;

CREATE DATABASE blogauth;
GRANT ALL PRIVILEGES ON blogauth.* TO blogauth;
```

```bash
mysql -u root manusblog < schema.sql
mysql_secure_installation 
```


## als user:

### install node  
>https://nodejs.org/en/download/package-manager/current

### clone repo

```bash
git clone https://github.com/manuelerdoes/manusblog_next.git

cd manusblog_next
npm install
```

### auth.js

```bash
npx auth secret
```

### configurations

copy .env file
**configure the datase_url with the root user first, for the prisma migrate command. change it back later**  

edit app/lib/const.js

### prisma

```bash
npm exec prisma migrate dev
```

(change back the database_url in .env)

### start

```bash
npm run build
nohup npm run start &
```

### stop

```bash
pkill -9 -f 'npm|next-server'
```

## Troubleshooting

https://tecadmin.net/resolved-unknown-collation-utf8mb4_0900_ai_ci/


ignore certbot manuals, only consult the official site.


update certbot occasionally: sudo /opt/certbot/bin/pip install --upgrade certbot certbot-nginx
