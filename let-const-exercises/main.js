//Before:
var PI=3.14;
PI=42;

//After:
const PI=3.14;
//PI=42; Variable Type Error


/*
- What is the difference between ***var*** and ***let***?
- What is the difference between **var** and ***const***?
- What is the difference between **let** and **const**?
- What is hoisting?

##
*/

//#1 var and let are identical in function, with the differentiating aspect being the scope of the variable. Var is local, while let is global
//#2 The difference between var and const happens when changing the values of these data types. Var allows for data changes through left-hand assignments, meanwhile, const does not.
//#3 Same aspect beetween var and const. Let entails the ability to change values, while const does not have that property.
//#4 ASYNC JS allows for this feature to exist. Hoisting is the call to a function, before its declaration; allowing for less JIT error 

