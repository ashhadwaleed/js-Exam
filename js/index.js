let  homeApi=document.getElementById("home-apis")
let search = document.getElementById("searchPlace");
let loading=document.querySelector(".loading");
async function getHomeApi(){
    homeApi.innerHTML = "";
    search.innerHTML = ``;
    $(".loading").fadeIn(500);
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let apiResponse= await api.json();
    
    displayHome(apiResponse.meals)
    $(".loading").fadeOut(500);
}
getHomeApi()
function displayHome(arr){
    let cartona=``;
    for(let i=0;i<arr.length;i++){
        cartona += `
                   <div class="col-md-3 gap-3 mb-3">
                <div class="meal position-relative " onclick="getMealDetails('${arr[i].idMeal}')">
                    <img src="${arr[i].strMealThumb}" class="w-100  rounded-2" alt="">
                    <div class="meal-layer position-absolute d-flex justify-content-start align-items-center">
                        <p class="text-dark fs-3 ms-2">${arr[i].strMeal}</p>
                    </div>
                </div>
            </div> 
        `;
    }
    homeApi.innerHTML=cartona
    
}


async function getMealDetails(mealID) {
search.innerHTML = ``;
homeApi.innerHTML = "";
$(".loading").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
$(".loading").fadeOut(500);
}
function displayMealDetails(meal) {
 let ingredients = ``;

 for (let i = 1; i <= 20; i++) {
   if (meal[`strIngredient${i}`]) {
     ingredients += `<li class="alert alert-info m-2 p-1">${
       meal[`strMeasure${i}`]
     } ${meal[`strIngredient${i}`]}</li>`;
   }
 }

 let tags = meal.strTags?.split(",");
 // let tags = meal.strTags.split(",")
 if (!tags) tags = [];

 let tagsStr = "";
 for (let i = 0; i < tags.length; i++) {
   tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
 }


  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  homeApi.innerHTML = cartoona;
}


async function getCategory(){
    search.innerHTML = ``;
    homeApi.innerHTML = "";
$(".loading").fadeIn(500);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const respone=await response.json();
    console.log(respone.categories);
    displayCategories(respone.categories);
$(".loading").fadeOut(500);
}


function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>
        `
    }

    homeApi.innerHTML = cartoona
}

async function getCategoryMeals(category) {
    search.innerHTML = ``;
    homeApi.innerHTML = "";
$(".loading").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayHome(response.meals.slice(0, 20));
$(".loading").fadeOut(500);
}


async function getArea() {
    search.innerHTML = ``;
    homeApi.innerHTML = "";
$(".loading").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayArea(respone.meals);
$(".loading").fadeOut(500);
}

function displayArea(data) {
  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  homeApi.innerHTML = cartoona;
}

async function getAreaMeals(area) {
search.innerHTML = ``;
homeApi.innerHTML = "";
$(".loading").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayHome(response.meals.slice(0, 20));
$(".loading").fadeOut(500);
}

async function getIngredients() {
    search.innerHTML = ``;
    homeApi.innerHTML = "";
$(".loading").fadeIn(500);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
$(".loading").fadeOut(500);
}
function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  homeApi.innerHTML = cartoona;
}

async function getIngredientsMeals(ingredients) {
search.innerHTML=``
homeApi.innerHTML = "";
$(".loading").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayHome(response.meals.slice(0, 20));
$(".loading").fadeOut(500);
}

function SearchInput() {
  search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  homeApi.innerHTML = "";
}

async function searchByName(term) {
  rowData.innerHTML = "";
$(".loading").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
$(".loading").fadeOut(500);
}
async function searchByFLetter(term) {
  homeApi.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  
}








function contactUs(){
    let cartona = `
            <div class="col-md-6 g-3">
                           <div class="form-data">
                              <input type="text" id="Name" class="form-control" placeholder="Enter your Name" />
                              <ul class="alert alert-danger p-0 invalid-feedback">
                                 <li>Name Is Required</li>
                                 <li>Minmum Length 2 and Maxmum 20</li>
                              </ul>
                           </div>
                        </div>
                                      <div class="col-md-6 g-3">
                                               <div class="form-data">
                              <input type="text" id="Email" class="form-control" placeholder="Enter your Email" />
                              <ul class="alert alert-danger p-0 invalid-feedback">
                                 <li>Email not valid *exemple@yyy.zzz</li>
                              </ul>
                           </div>
                                      </div>
                                <div class="col-md-6 g-3">
                                     <div class="form-data">
                              <input type="text" id="Phone" class="form-control" placeholder="Enter your Phone" />
                              <ul class="alert alert-danger p-0 invalid-feedback">
                                 <li>Enter valid Phone Number</li>
                              </ul>
                           </div>
                                </div>
                          <div class="col-md-6 g-3">
                            <div class="form-data">
                              <input type="text" id="age" class="form-control" placeholder="Enter your age" />
                              <ul class="alert alert-danger p-0 invalid-feedback">
                                 <li>Enter valid age</li>
                              </ul>
                           </div>
                          </div>
                        <div class="col-md-6 g-3">
                             <div class="form-data">
                              <input type="text" id="Password" class="form-control" placeholder="Enter your Password" />
                              <ul class="alert alert-danger p-0 invalid-feedback">
                                 <li>Enter valid password *Minimum eight characters, at least one letter and one number:*</li>
                              </ul>
                           </div>
                        </div>
                        <div class="col-md-6 g-3">
                             <div class="form-data">
                              <input type="text" id="RePassword" class="form-control" placeholder="Enter your RePassword" />
                              <ul class="alert alert-danger p-0 invalid-feedback">
                                 <li>Enter valid repassword</li>
                              </ul>
                           </div>
                        </div>
                                             <div class="col-md-12 d-flex justify-content-center align-items-center mt-5 disabled">
                            <button class="btn btn-primary">submit</button>
                        </div>
    `;
    homeApi.innerHTML=cartona
}



