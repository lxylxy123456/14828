# 14828 Browser Security Project

## Flask commands

Setup
```sh
sudo apt-get install python3-pip
sudo pip3 install flask
echo '127.148.28.1 attacker.local' | sudo tee -a /etc/hosts
echo '127.148.28.2 victim.local' | sudo tee -a /etc/hosts
```

Attacker:
```sh
cd attacker
flask --app attacker.py run -h attacker.local -p 8080
```

Victim:
```sh
cd victim
flask --app victim.py run -h victim.local -p 8080
```

