```sh
./bios-qemu.sh --q35 --smb "$PWD/shr" -d debian11.qcow2 +1 --ssh <PORT>
```

Make sure the destination IPs are NOT in 127.0.0.0/8, then
```sh
sudo iptables -t nat -p tcp -A OUTPUT -d attacker.local --dport 8080 -j DNAT --to-destination <IP:PORT>
sudo iptables -t nat -p tcp -A OUTPUT -d victim.local --dport 8080 -j DNAT --to-destination <IP:PORT>
```

