var productName = document.getElementById("productName");
var productPrise = document.getElementById("productPrise");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var search = document.getElementById("search");
var AddProduc = document.getElementById("AddProduc");
var btnAdd = document.getElementById("btnaddUpdate");
var btnstatus = "create";
var proId;

//عمل مصفوفة لتخزين
var productContenar;

if (localStorage.getItem("prodactData") == null) {
  productContenar = [];
} else {
  productContenar = JSON.parse(localStorage.getItem("prodactData"));
  showData();
}

//add product اضافة البيانات


function AddProduct() {
  if (chekFormInput() == true) {
    if (validate() == true) {
      var product = {
        name: productName.value,
        prise: productPrise.value,
        category: productCategory.value,
        desc: productDesc.value,
      };

      if (btnstatus === "create") {
        productContenar.push(product);
      } else {
        btnAdd.innerHTML = "AddProduct";
        productContenar[proId] = product;
      }
    } else {
      alert("anvaled");
    }

    clerForm();
    console.log(productContenar);
    showData();
    localStorage.setItem("prodactData", JSON.stringify(productContenar));
  } 
  else {
    alert("لم يتم اضافة البيانات");
  }
}








// cleer form
function clerForm() {
  productName.value = "";
  productPrise.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

//chek form input
function chekFormInput() {
  if (
    productName.value != "" &&
    productPrise.value != "" &&
    productCategory.value != "" &&
    productDesc.value != ""
  ) {
    alert("Add product");
    return true;
  } else {
    return false;
  }
}







//show product
function showData() {
  var data = "";
  for (var i = 0; i < productContenar.length; i++) {
    data += `
    <tr>
    <td>${[i]}</td>
    <td> ${productContenar[i].name} </td>
    <td> ${productContenar[i].prise} </td>
    <td> ${productContenar[i].category} </td>
    <td> ${productContenar[i].desc} </td>
    <td><button class="btn btn-outline-info" onclick="Update(${[
      i,
    ]})"> Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="Delete(${[
      i,
    ]})">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = data;
}

//edit data
function Update(index) {
  productName.value = productContenar[index].name;
  productPrise.value = productContenar[index].prise;
  productCategory.value = productContenar[index].category;
  productDesc.value = productContenar[index].desc;
  btnAdd.innerHTML = "update";
  btnstatus = "update";
  proId = index;
}

//delete product
function Delete(index) {
  productContenar.splice(index, 1);
  localStorage.setItem("prodactData", JSON.stringify(productContenar));
  showData();
}

function Search(searhtearm) {
  var box = ``;
  for (var i = 0; i < productContenar.length; i++) {
    if (
      productContenar[i].name
        .toLowerCase()
        .includes(searhtearm.toLowerCase()) == true ||
      productContenar[i].category
        .toLowerCase()
        .includes(searhtearm.toLowerCase()) == true
    ) {
      box += `
      <tr>
      <td>${[i]}</td>
      <td> ${productContenar[i].name} </td>
      <td> ${productContenar[i].prise} </td>
      <td> ${productContenar[i].category} </td>
      <td> ${productContenar[i].desc} </td>
      <td><button class="btn btn-outline-info" onclick="Update(${[
        i,
      ]})"> Update</button></td>
      <td><button class="btn btn-outline-danger" onclick="Delete(${[
        i,
      ]})">Delete</button></td>
      </tr>
      `;
    }
  }
  document.getElementById("tbody").innerHTML = box;
}

// inviled

function validate() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value) == true) {
    productName.style.borderColor = "red";
    return true;
  } else {
    productName.style.borderColor = "green";
    return false;
  }
}

var divalert = document.getElementById("alert");
divalert.style.display = "none";

function validateName() {
  var regex = /^[A-Z][a-z]{3,10}$/;
  if (regex.test(productName.value) == true) {
    divalert.style.display = "none";
  } else {
    divalert.style.display = "block";
    document.getElementById("alert").innerHTML = `<p>هناك خطا في الكتابه </p>`;
  }
}




function validateName3() {
  var regex = /^[A-Z][a-z]{3,10}$/;
  if (regex.test(productName.value) == true) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");

  
    divalert.classList.replace('d-block', 'd-none');
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    
    divalert.classList.replace('d-none', 'd-block');
  }
}

productName.addEventListener("keyup",validateName3)