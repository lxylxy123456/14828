# Arbitrary Code Injection in Adblock Plus
14828 Browser Security Project

## Demo

We provide a demonstration of the attack we study. The demo should run on any
UNIX-like environment that has Python and Chromium installed. Chromium must
support [manifest V2](https://developer.chrome.com/docs/extensions/mv2/).

One example configuration we use is Chromium 70.0.3548.0 (64-bit) with AdBlock
Plus 3.2. The Python version is 3.9.2, with Flask and Werkzeug version 2.2.3.
We use Debian 11 with Linux kernel 5.10 as the operating system.

Demo video: <https://youtu.be/BWSP0y8dz88>

![Youtube Video Demo](http://img.youtube.com/vi/BWSP0y8dz88/0.jpg)](http://www.youtube.com/watch?v=BWSP0y8dz88)

### Setting up the servers

We use Flask as the backend. We modify `/etc/hosts` to create two websites.

Setup:
```sh
sudo apt-get install python3-pip
sudo pip3 install flask
echo '127.148.28.1 attacker.local' | sudo tee -a /etc/hosts
echo '127.148.28.2 victim.local' | sudo tee -a /etc/hosts
```

In one shell, start the attacker website:
```sh
cd attacker
flask --app attacker.py run -h attacker.local -p 8080
```

In another shell, start the victim website:
```sh
cd victim
flask --app victim.py run -h victim.local -p 8080
```

### Setting up the victim browser

TODO

## Licensing

The software in this project is licensed under GNU Affero General Public
License, Version 3 ([LICENSE](./LICENSE)). The paper is licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

