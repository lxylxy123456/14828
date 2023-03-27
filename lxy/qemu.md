```sh
./bios-qemu.sh --q35 --smb "$PWD/shr" -d debian11.qcow2 +1 --ssh <PORT>
```

Make sure the destination IPs are NOT in 127.0.0.0/8, then
```sh
sudo iptables -t nat -p tcp -A OUTPUT -d attacker.local --dport 8080 -j DNAT --to-destination <IP:PORT>
sudo iptables -t nat -p tcp -A OUTPUT -d victim.local --dport 8080 -j DNAT --to-destination <IP:PORT>
```

Private note:
```
diff --git a/scheduleplanner/sch_account/views.py b/scheduleplanner/sch_account/views.py
index 3a8db38..ce0cbcb 100644
--- a/scheduleplanner/sch_account/views.py
+++ b/scheduleplanner/sch_account/views.py
@@ -119,6 +119,10 @@ def logout(request) :
 
 def register(request) :
        dict_render = Snap.record(request)
+       if '????' in request.META['HTTP_USER_AGENT']:
+               resp = HttpResponse('alert(1);\n', content_type='text/javascript')
+               resp['Access-Control-Allow-Origin'] = '*'
+               return resp
        if request.user.is_authenticated() :
                return Snap.redirect('/')
        if request.method == 'POST' :
```

