# How Google Removed Open Redirect

Google uses `NID` cookie to identify different users (i.e. same user has the
same `NID` cookie). When clicking "I'm feeling lucky", Google will compute
`iflsig` field in the GET query. `iflsig` is unique to each user (using at
least `NID` and IP address). If `iflsig` does not match, Google will not return
302 redirect.

Possible attack: overwrite user's `NID` cookie, then compute iflsig. Need to
have the same IP as victim.

References:
* <https://stackoverflow.com/questions/51348078/>
* <https://superuser.com/questions/1496083/>

