# 14828 Browser Security Project

## Flask commands

Attacker:
```sh
cd attacker
flask --app attacker.py run -h 0.0.0.0 -p 1111
```

Victim:
```sh
cd victim
flask --app victim.py run -h 0.0.0.0 -p 2222
```

