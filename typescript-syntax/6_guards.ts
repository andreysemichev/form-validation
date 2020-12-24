// Вспомогательная конструкция
function strip(x: string | number) {
  if (typeof x === "number") {
    return x.toFixed(2);
  }

  return x.trim();
}

// Вспомогательная конструкция 2
class MyClass {
  name = "Name";
  num = 123;
}

class MyError {
  name = "Name";
  msg = "Error message";
}

function handle(res: MyClass | MyError) {
  if (res instanceof MyClass) {
    return { name: res.name, num: res.num};
  }

  return { name: res.name, msg: res.msg };
}

// Вспомогательная конструкция 3
type AlertType = "success" | "danger" | "warning";

function setAlertType(type: AlertType) {
  //...
}

// setAlertType("success");
// setAlertType("danger");
// setAlertType("default"); // Argument of type '"default"' is not assignable to parameter of type 'AlertType'