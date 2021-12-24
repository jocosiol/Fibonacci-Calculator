document.getElementById("loading").style.display = "none";
document.getElementById("errorLine").style.display = "none";
document.getElementById("loading2").style.display = "none";

function doTheThing() {
  document.getElementById("errorLine").style.display = "none";
  let x = document.getElementById("input").value;

  if (document.getElementById("checkbox").checked) {
    usingServer(x).then((y) => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("result").style.display = "flex";
    });
  } else {
    let y = fibonacci(x);
    document.getElementById("result").innerHTML = y;
  }
}

//Milestone 2
function fibonacci(num) {
  let fibon = [];
  fibon[0] = 0;
  fibon[1] = 1;

  for (let i = 2; i <= num; i++) {
    fibon[i] = fibon[i - 2] + fibon[i - 1];
    console.log(fibon);
  }
  return fibon[num];
}

//Milestone 3.1
function fibonacciRecursion(num) {
  if (num == 0) {
    return 0;
  } else if (num == 1) {
    return 1;
  } else {
    return fibonacciRecursion(num - 1) + fibonacciRecursion(num - 2);
  }
}

//Milestone 4
function usingServer(value) {
  document.getElementById("result").style.display = "none";
  document.getElementById("loading").style.display = "flex";

  if (value <= 50) {
    let urlServer = `http://localhost:5050/fibonacci/${value}`;

    return fetch(urlServer)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((data) => {
        console.log(data);
        document.getElementById("result").classList.remove("err");
        document.getElementById("result").innerHTML = data["result"];
        previousCalculation();
        return data["result"];
      })
      .catch((err) => {
        console.log(err);

        document.getElementById("result").classList.add("err");
        document.getElementById("result").innerHTML = err;
      });
  } else {
    document.getElementById("loading").style.display = "none";
    document.getElementById("errorLine").style.display = "flex";
  }
}

//Milestone 6
function previousCalculation() {
  document.getElementById("loading2").style.display = "flex";

  fetch("http://localhost:5050/getFibonacciResults")
    .then((response) => response.json())
    .then((data) => {
      let results = data.results;
      results = results.sort((a, b) => {
        return b.createdDate - a.createdDate;
      });
      const listContainer = document.getElementById("resultList");
      listContainer.innerHTML = "";

      for (let i = 0; i < results.length; i++) {
        const result1 = results[i];
        //console.log(data["results"]);
        let number = result1.number;
        let result = result1.result;
        let date = new Date(result1.createdDate).toString();

        //console.log(number, result, date);

        const listElement = document.createElement("li");
        listElement.id = `previousResult${i}`;
        listElement.classList.add("list-element");
        listElement.innerHTML = `The Fibonnaci Of <b>${number}</b> is <b>${result}</b>. Calculated at: ${date}`;

        listContainer.appendChild(listElement);
      }
      document.getElementById("loading2").style.display = "none";
    });
}

previousCalculation();
