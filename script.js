import originalData from "./data.js";


const cardsContainer = document.getElementById("cards-container");
const allFilter = document.getElementById("all");
const vegFilter = document.getElementById("veg");
const nonvegFilter = document.getElementById("non-veg");

let currentData = originalData;

loadFoodData(originalData);

function loadFoodData(foodData) {
  //   console.log(foodData);
  cardsContainer.innerHTML = "";
  if (foodData.length == 0) {
    // console.log("not found");
    cardsContainer.innerHTML = `<h2 style="text-align:center;color:red;width:100%">No Data Found<h2>`;
    return;
  }
  for (let i = 0; i < foodData.length; i++) {
    let data = foodData[i];
    // console.log(data);

    let productCard = document.createElement("div");

    // creating food imagge and category
    productCard.className = "product-card";
    let foodImage = document.createElement("img");
    foodImage.src = data.imageSrc;
    let category = document.createElement("p");
    category.id = "category";
    category.innerText = data.type;
    if (data.type == "veg") {
      category.style.color = "green";
    } else {
      category.style.color = "red";
    }

    // title div

    let titleRating = document.createElement("div");
    titleRating.className = "title-rating";
    let title = document.createElement("p");
    title.className = "title";
    title.innerText = data.name;
    let titleRatingChildDiv = document.createElement("div");
    let ratingImage = document.createElement("img");
    ratingImage.src = "./assets/star.svg";
    let span = document.createElement("span");
    span.innerText = data.rating;

    titleRatingChildDiv.append(ratingImage, span);
    titleRating.append(title, titleRatingChildDiv);

    // time Likes

    let timeLikes = document.createElement("div");
    timeLikes.className = "time-likes";
    let time = document.createElement("p");
    time.innerText = data.time;
    let timeLikesChildDiv = document.createElement("div");
    let likeImage = document.createElement("img");
    likeImage.src = "./assets/like.svg";
    likeImage.addEventListener("click", (e) => {
      callbackisLiked(i, e);
    });

    //
    function callbackisLiked(i, e) {
      //   console.log(i);
      //   console.log(data[i]);
      if (e.target.classList.contains("liked")) {
        originalData[i].isLiked = false;
        e.target.classList.remove("liked");
      } else {
        originalData[i].isLiked = true;
        e.target.classList.add("liked");
      }
      //   console.log(originalData[i]);
    }
    //
    if (data.isLiked) {
      console.log(data);
      likeImage.classList.add("liked");
    }

    let commentImage = document.createElement("img");
    commentImage.src = "./assets/comments.svg";

    timeLikesChildDiv.append(likeImage, commentImage);
    timeLikes.append(time, timeLikesChildDiv);

    productCard.append(foodImage, category, titleRating, timeLikes);

    cardsContainer.appendChild(productCard);
  }
}

vegFilter.addEventListener("click", filterVeg);

function filterVeg(e) {
  // let vegFoodArray = [];
  //   console.log("veg clicked");

  let vegFoodArray = originalData.filter((food) => {
    // console.log(food.type);
    return food.type == "veg";
  });

  //   console.log(vegFoodArray);
  currentData = vegFoodArray;
  loadFoodData(vegFoodArray);
}

nonvegFilter.addEventListener("click", filterNonVeg);

function filterNonVeg(e) {
  let nonvegFoodArray = originalData.filter((food) => {
    // console.log(food.type);
    return food.type == "non-veg";
  });

  //   console.log(vegFoodArray);

  currentData = nonvegFoodArray;

  loadFoodData(nonvegFoodArray);
}

allFilter.addEventListener("click", (e) => {
  currentData = originalData;
  loadFoodData(originalData);
});

// 4 and above
// below 4
const above = document.getElementById("above");
const below = document.getElementById("below");

above.addEventListener("click", (e) => {
  loadFoodData(currentData.filter((food) => food.rating >= 4));
});

below.addEventListener("click", (e) => {
  loadFoodData(currentData.filter((food) => food.rating < 4));
});

const searchInput = document.getElementById("recipes-search");

searchInput.addEventListener("keyup", (e) => {
  let searchString = e.target.value;
  //   console.log(searchString);
  let searchedData = originalData.filter((food) => {
    return food.name
      .toLocaleLowerCase()
      .includes(searchString.toLocaleLowerCase());
  });
  //   console.log(searchedData);

  loadFoodData(searchedData);
});

const mobilemenu = document.getElementById("mobile-menu-icon");

mobilemenu.addEventListener("click", (e) => {
  let nav = document.getElementsByTagName("nav")[0];
  if (nav.classList.contains("visible")) {
    // nav.style.transform = `translateY(-500px)`;
    // nav.style.display = "none";
    // nav.style.height = "0px";
    // nav.style.display = "none";
    // e.target.style.transform = "rotate(0deg)";

     nav.style.maxHeight = "0px";
    nav.style.maxwidth = "0px";
    nav.style.opacity = "0";

    nav.classList.remove("visible");
  } else {
    // nav.style.transform = `translateY(0px)`;
    // nav.style.display = "flex";
    // e.target.style.transform = "rotate(90deg)";
    //  nav.style.maxHeight = "100vh";
    nav.style.maxWidth = "30px";
    nav.style.opacity = "1";
    nav.classList.add("visible");
    // nav.style.height = "fit-content";
    // nav.style.display = "flex";
  }
});
