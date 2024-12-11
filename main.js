var BookmarkName = document.getElementById("BookmarkName");
var SiteURL = document.getElementById("SiteURL");

var Elements = document.getElementById("Elements");

var  ElementList = [];

var BookmarkObj ={};

if (localStorage.getItem("BookmarkEelements") !== null) {
  var ElementList  = JSON.parse(localStorage.getItem("BookmarkEelements"));
  display();
}


function addBookmark()
{

if (validation(BookmarkName)  && validation(SiteURL))
  {
    BookmarkObj = {
    BName : BookmarkName.value ,
    BURL : SiteURL.value 
  }

  // the same input from user
  if (
    ElementList.some(
      (item) => item.BName === BookmarkObj.BName || item.BURL === BookmarkObj.BURL
    )
  ) {
    showModal(); 
    return; 
  }
  
  ElementList.push(BookmarkObj);
  console.log(BookmarkObj);

  localStorage.setItem("BookmarkEelements", JSON.stringify(ElementList));
  clearform();

  display();

 }
}





function clearform() {
  BookmarkName.value = null;
  SiteURL.value = null;
}


function display(List=ElementList) {
  var element = "";
  for (i = 0; i < List.length; i++) {
    element += ` 
      <tr></tr>
        <th scope="row" >${i}</th>
        <td>${List[i].BName}</td>
         <td><button onclick=" visitfun( '${List[i].BURL}')" class="btn btn-success"> <i class="fa-solid fa-eye pe-2"></i> Visit </button></td> 
        <td><button onclick="deletefun( ${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i> Delete </button></td> 
      </tr>
      `;
     
  }

  Elements.innerHTML = element;
}

// function deletefun(id){

//   ElementList = ElementList.filter(function(ele){
//     return ele.id !== id;
//   })
//   localStorage.setItem("BookmarkElements", JSON.stringify( ElementList));
//   display();
//   console.log(id);
//   }

function deletefun(index) {
  ElementList.splice(index, 1);
  localStorage.setItem("BookmarkEelements", JSON.stringify(ElementList));
  display();
}




  function validation(input) {
    var Rejax = {
      BookmarkName: /^[A-Za-z]{4,30}$/, 
      SiteURL: /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/
    };
  
    if (Rejax[input.id] && Rejax[input.id].test(input.value)) {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      return true;
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
  
      // إظهار الرسالة المخصصة إذا كان الإدخال غير صحيح
      if (input.id === "SiteURL" || input.id === "BookmarkName") {
        showCustomAlert();
      }
      return false;
    }
  }
  
  function showCustomAlert() {
    var alertBox = document.getElementById("customAlert");
    alertBox.classList.remove("d-none");
  }
  
  function closeCustomAlert() {
    var alertBox = document.getElementById("customAlert");
    alertBox.classList.add("d-none");
  }
  


  function visitfun(url) {
    if (url) {
      window.open(url, "_blank"); // افتح الرابط في نافذة جديدة
    } else {
      alert("No URL found!"); // رسالة تنبيه إذا لم يكن هناك رابط
    }
  }
  
  // the same input from user
  function showModal() {
    document.getElementById("customModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("customModal").style.display = "none";
  }
  
  
  if (
    ElementList.some(
      (item) => item.BName === BookmarkObj.BName && item.BURL === BookmarkObj.BURL
    )
  ) {
    showModal(); 
    
  }
  