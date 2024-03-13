
let index = null

/**
 * form control code start
*/
var addBtn = document.getElementById("add-btn");
var closeBtn = document.getElementById("close-btn");
var addCar = document.getElementById("add-car");
addBtn.onclick = () => {
    addCar.classList.add("active");
    document.getElementById("update").style.display = "none";
    document.getElementById("hideAddBtn").style.display = "block";
    document.getElementById("clear-form").reset(); 
}
closeBtn.onclick = () => {
    addCar.classList.remove("active");
} 
/**
 * form control code end
*/


/**
 * Hide city based on province function
*/
const provinces = [
    {
        title: "Punjab",
        cities: ['Lahore', 'Faislabad','Ellahabad', 'Multan']
    }, 
    {
        title: "KPK",
        cities: ['Mangora', 'Swat', 'Chakdara']
    },
    {
        title: "Balochistan",
        cities: ['Nhi-Pta']
    },
    {
        title: "Sindh",
        cities: ['Karachi']
    },
    {
        title: "AzadKashmir",
        cities: ['sibi']
    }
]

/**
 * program to show cities as options of selected province
 * 
 */
let seletedPro;
let input = document.getElementById("province").addEventListener('change',() => {
      let txt ='';
      seletedPro=document.getElementById("province").value;
      provinces.forEach((element) => {
        if(element.title === seletedPro){
            txt +=`<select><option selected disabled>Select City</option>`
            element.cities.forEach((element) => {
               txt +=`<option value="${element}">${element}</option>`;  
            })
           txt +=`</select>`; 
        }
     }) 
     document.getElementById("location").innerHTML=txt; 
    }); 
  
  
/**
 * Apply filters function
 */
const applyFilters = () => {
    let filteredCars = [];
    for (let i = 0; i < allDataArray.length; i++) {
        const car = allDataArray[i] 
            if(searchCars(car) && applyCityFilter(car) && applyNameFilter(car) && provincee(car) && carPrice(car)) {
                filteredCars.push(car);
            }         
    }
    saveInput(filteredCars)
}

/**
 * Search car keyword based
*/
const searchCars = (car) => {
    let is_found = false;
    let searchVal = document.getElementById("search-car").value; 
    let carName = car.name;
    if(carName.toLowerCase().includes(searchVal.toLowerCase())){
        is_found = true;
    }
    if(!searchVal) {
        is_found = true
    }
    return is_found ;
}

/**
 * Apply City Filters
 * @param {*} car 
 * @returns
 */
const applyCityFilter = (car) => { 
    let is_found = false
    const selectedCities = getCheckBoxValues('city'); 
    if(selectedCities.length) {
        if(selectedCities.includes(car.location)) {
            is_found = true
        }
    }
    else {
        is_found = true
    }

    return is_found
}

/**
 * applyNameFilter function
 */
const applyNameFilter=(car)=>{
    let is_found = false
    const selectedCar = getCheckBoxValues('car-name'); 
    if(selectedCar.length){
        if(selectedCar.includes(car.name)) {
            is_found = true;
        }
    } 
    else{
        is_found = true;
    } 
    return is_found 
}

/**
 * applyProvinceFilter function
 */
const provincee=(car)=>{
    let is_found = false
    const selectedProvince = getCheckBoxValues('slct-province'); 
    if(selectedProvince.length) {
        if(selectedProvince.includes(car.province1)) {
            is_found = true
        }
    } 
    else{
        is_found = true;
    } 
    return is_found 
}
 

/**
 * carPrice Filter function
 */
const carPrice = (car) => { 
    let is_found = false
    let price_from = parseInt(document.getElementById("price-from").value);
    let price_to = parseInt(document.getElementById("price-to").value);
     if((car.price >= price_from) && (car.price <= price_to) ){
        is_found = true;
     } 
     if((!price_from) && (!price_to)){
        is_found = true
     } 
     
    return is_found 
}


  
 /**
  * checked checkbox values return
  * @param {*} class_name 
  * @returns 
  */
const getCheckBoxValues = (class_name) => {
    let checkBoxes = document.getElementsByClassName(class_name);
    const selectedCheckBox = [] 
    for(let i=0; i < checkBoxes.length; i++){
        if(checkBoxes[i].checked) {
            selectedCheckBox.push(checkBoxes[i].value)
        }
    }
    return selectedCheckBox
} 
const filters = document.getElementsByClassName('filters')
Array.from(filters).forEach(function(element) {
    element.addEventListener('click', applyFilters);
});
 
 
/**
 * add car to list code start from here
*/
var imgUrl; 
let newArr = [];
let allDataArray = [];
window.onload = () => {
    allDataArray = JSON.parse(localStorage.getItem('array')) ?? []
    saveInput(allDataArray);  
}
function add() {
    let car_name = document.getElementById("name").value;
    let car_price = parseInt(document.getElementById("price").value);
    let province = document.getElementById("province").value; 
    let location1 = document.getElementById("location").value;
    let car_modal = document.getElementById("modal").value;
    let car_speed = document.getElementById("speed").value;
    let car_cc = document.getElementById("car-cc").value;
    let car_type = document.getElementById("car-type").value;
    let engin_type = document.getElementById("engin-type").value;
    /**
     * validation check
    */
    if (!car_name || !car_price || !location1 || !car_modal || !car_speed || !car_cc || !province) {
        alert("Plz Enter All Required Data");
        return;
    }
    /**
    *  Object
    */
    var allDataObj = {
        name: car_name,
        price: car_price,
        location: location1,
        province1:province,
        carModal: car_modal,
        carSpeed: car_speed,
        carCC: car_cc,
        carType: car_type,
        enginType: engin_type,
        imgg: imgUrl = undefined ? "images/car-pic1.webp" : imgUrl
    }; 
    allDataArray.push(allDataObj); 
    saveInput(allDataArray);  
    document.getElementById("clear-form").reset();
    addCar.classList.remove("active"); 
    localStorage.setItem('array', JSON.stringify(allDataArray));
}

/**
 * 
 * @param {*} index 
 */
const  deleteRecord = (index) => {
    allDataArray.splice(index, 1);
    saveInput(allDataArray);
    localStorage.setItem('array', JSON.stringify(allDataArray));
} 

/**
 * 
 * @param {*} j 
 */
const   edit = (j) => {
    // get data from card 
    index = j
    document.getElementById("hideAddBtn").style.display = "none";
    document.getElementById("update").style.display = "block";
    addCar.classList.add("active");
    document.getElementById("name").value = allDataArray[j].name;
    document.getElementById("price").value = allDataArray[j].price;
    document.getElementById("location").value = allDataArray[j].location;
    document.getElementById("province").value = allDataArray[j].province1;
    document.getElementById("modal").value = allDataArray[j].carModal;
    document.getElementById("speed").value = allDataArray[j].carSpeed;
    document.getElementById("car-cc").value = allDataArray[j].carCC;
    document.getElementById("car-type").value = allDataArray[j].carType;
    document.getElementById("engin-type").value = allDataArray[j].enginType;
    document.getElementById("all-images").innerHTML = `<img src="${allDataArray[j].imgg}" class="fix-img">`;
}

/**
 * Update Vehiles
 */
const  update_record = () => {
    // update card
    // document.getElementById("update").addEventListener('click', () =>{
        allDataArray[index].name =  document.getElementById("name").value; 
        allDataArray[index].price = parseInt(document.getElementById("price").value);
        allDataArray[index].location = document.getElementById("location").value;
        allDataArray[index].province1 = document.getElementById("province").value ;
        allDataArray[index].carModal =  document.getElementById("modal").value;
        allDataArray[index].carSpeed = document.getElementById("speed").value;
        allDataArray[index].carCC = document.getElementById("car-cc").value; 
        allDataArray[index].carType = document.getElementById("car-type").value;
        allDataArray[index].enginType = document.getElementById("engin-type").value;
        allDataArray[index].imgg = imgUrl;
        saveInput(allDataArray); 
        addCar.classList.remove("active"); 
    //  })
}


/**
 * Display vehicles
*/
function saveInput(allDataArray) {
    let output = ' ';
    for (let i = 0; i < allDataArray.length; i++) {
        output +=
         `<div id="detail-card" class="border mt-4 bg-white">
            <div class="row p-2">
                 <div class="col-3">    
                    <img src=${allDataArray[i].imgg} width="100%" height="100%">
                 </div>
                 <div class="col-9">
                     <div class="row justify-content-between py-2">
                        <div class="col-8"><a href="#">${allDataArray[i].name}</a></div>
                        <div class="col-3 text-end"><span class="price">${allDataArray[i].price}</span></div>
                        </div>
                        <span class="place fs-14">${allDataArray[i].location}</span>
                        <button onClick="deleteRecord(${i})" class="trash border-0 float-end"><i class="fa-solid fa-trash-can text-primary fs-20"></i></button>
                        <div class="py-2 fs-14">
                            <span class="model pe-3">${allDataArray[i].carModal}</span>
                            <span class="speed border-start border-end px-3">${allDataArray[i].carSpeed}</span>
                            <span class="px-3">${allDataArray[i].enginType}</span>
                            <span class="border-start border-end px-3">${allDataArray[i].carCC}</span>
                            <span class="px-3">${allDataArray[i].carType}</span>
                            <i onClick="edit(${i})" class="update fa-solid fa-pen-to-square fs-20 float-end text-primary"></i>

                       </div>
                <div class="row py-2 fs-14">
                    <div class="col-6">
                        <span>Updated 2 minutes ago</span>
                    </div>
                    <div class="col-6 text-end">
                        <span class="border px-2 py-1 me-1"><i
                                class="fa-regular fa-heart"></i></span>
                        <a href="#" class="btn btn-success rounded-1 fs-12 py-1">
                            <i class="fa-solid fa-phone"></i> Show Phone No.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("car-list").innerHTML = output;    
}
 
 

/**
 * Add Image
*/

function addimage(input) {
    let imgContainer = document.getElementById("all-images");
    imgContainer.innerHTML = '';
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imgElement = document.createElement('img');
            imgElement.classList.add('fix-img');
            imgElement.src = e.target.result;
            imgUrl = e.target.result;
            imgContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        alert("select any image");
    }
}

/**
 * pakWheel Live Search
 */
let searCh = [];
const liveSearch = () => {
    let searchVal = document.getElementById('live').value.toLowerCase();
    for(let i = 0; i < allDataArray.length; i++){
        if(
            (allDataArray[i].name).toLowerCase().includes(searchVal) ||
            (allDataArray[i].carModal).includes(searchVal) || 
            (allDataArray[i].carSpeed).includes(searchVal) || 
            (allDataArray[i].location).toLowerCase().includes(searchVal) || 
            (allDataArray[i].province1).toLowerCase().includes(searchVal) || 
            (allDataArray[i].carType).toLowerCase().includes(searchVal) || 
            (allDataArray[i].enginType).toLowerCase().includes(searchVal) || 
            (allDataArray[i].price.toString().includes(searchVal))
            ){
              if(!searCh.includes(allDataArray[i])){
                  searCh.push(allDataArray[i]);
              }    
        }
        if(!searchVal){
            saveInput(allDataArray);
        }     
    } 
    saveInput(searCh); 
    searCh = []; 
    
}
 

 













 

 


 
  





 

