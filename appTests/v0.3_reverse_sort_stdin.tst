printf "a\nA\n8\n 8" > foo;cat foo | node sort -r; rm foo
a
A
8
 8