window.addEventListener("DOMContentLoaded", (event) => {
  // Your code goes here
});
let userLocation;

window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
    }
}

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  // const searchInput = document.getElementById("search-input").value;
  const location = document.getElementById("location").value;
  const indate = document.getElementById("check-in").value;
  const outdate = document.getElementById("check-out").value;
  const guest = document.getElementById("guest").value;

 
  console.log(location, indate, outdate, guest);
  ///// api.example has to be replaced with rapid api
  // fetch(`https://api.example.com/listings?search=${searchInput}`)
  const options = {
    method: "GET",
    headers: {
    //   "X-RapidAPI-Key": "c0ab961f07mshb8faaf1899ca92dp1f9656jsn3add1ad6fa7c",
      "X-RapidAPI-Key": "a1047541d8msh6e5a565a74442f2p10cc41jsn29dbdec94518",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };
  fetch(
//    'https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-10-06&checkout=2023-11-01&adults=1&children=0&infants=0&pets=0&page=1&currency=INR';

    `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${indate}&checkout=${outdate}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=INR'`,
    options
  )
    .then((response) => response.json())

    // Your code to display the listings goes here
    // Inside the fetch function in the search button event listener
    .then((data) => {
        console.log(data.results);
        // const location1=document.getElementById("location-input");
        // location1.innerText=location
        // const date=document.getElementById("location-date");
        // date.innerText=indate
        // const guest1=document.getElementById("location-guest");
        // guest1.innerText=guest
      const homepage = document.getElementById("homepage1");
      // const header=document.getElementById("header");
      // header.style.display="none"
      homepage.style.display = "none";
      const listingspage = document.getElementById("listings-page");
      listingspage.style.display = "block";
      

     

      const listingsContainer = document.getElementById("listings-container");
      // Clear previous listings
      listingsContainer.innerHTML = "";
      console.log(data.results);
      // Append new listings
      
    //   map(lat,lng)
      data.results.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsContainer.appendChild(listingCard);
       
      });
      console.log(data.results[0].lat)
    //   const lat=data.results[0].lat;
    //   const lng=data.results[0].lng;
    //     map(lat,lng);
        
    })

    .catch((error) => console.error("Error:", error));
});




function createListingCard(listing) {
  // const listingLocation = `${listing.latitude},${listing.longitude}`;

  // fetch(`https://s.googleapis.com/s/api/distancematrix/json?units=imperial&origins=${userLocation.lat},${userLocation.lng}&destinations=${listingLocation}&key=ABQIAAAAuPsJpk3MBtDpJ4G8cqBnjRRaGTYH6UMl8mADNa0YKuWNNa8VNxQCzVBXTx2DYyXGsTOxpWhvIG7Djw`)
  //     .then(response => response.json())
  //     .then(data => {
  //         const distance = data.rows[0].elements[0].distance.text;

  //         // Now create the listingCard and include the distance in the information
  //         const listingCard = document.createElement("div");

  //         listingCard.innerHTML = `

  //             <p>Distance from you: ${distance}</p>

  //         `;

  //     });

  const listingCard = document.createElement("div");
  listingCard.classList.add("listing-card");
//  const price=listing.price.total;
//  const totalPrice=price *80;
  listingCard.innerHTML = `
    <div class="left-col">
    <div class="house-img">
        <img id="roomimg" src="${listing.images[0]}" alt="${listing.title}">
        </div>
        <div class="listing-info">
            <h2>${listing.name}</h2>
            <p>${listing.type} · ${listing.beds} beds · ${
    listing.bathrooms
  } bathrooms</p>
            <p> $ ${listing.price.rate} per night</p>
            <p>${listing.address}</p>
            <p>Amenities: ${listing.previewAmenities.join(", ")}</p>
            <P>Rating: ⭐ ${listing.rating}
        </div>
        
        </div>
        <div class="map" id="map">
        <iframe id="iframe" src="https://maps.google.com/maps?q=${listing.lat},${listing.lng}&output=embed" 
        width="350px" height="300px" 
        frameborder="0" style="border:0"></iframe>                        
 
    </div>
        <div id="line2"></div>
        </div>
       
        
    `;

    return listingCard;
}


// function map(lat,lon){
//     const mapm=document.getElementById("map");
//     mapm.innerHTML=`
//     <div class="your-location">Your Current Location</div> 

//     <iframe id="iframe" src="https://maps.google.com/maps?q=${lat},${lon}&output=embed" 
//     width="500px" height="677px" 
//     frameborder="0" style="border:0"></iframe>`
//     }


//      // Add host details
//      const hostDetails = document.createElement("p");
//      hostDetails.innerText = `Hosted by ${createHostDetails(listing.host)}`;
//      listingCard.appendChild(hostDetails);

//     if (listing.host.is_superhost) {
//         const superhostIndicator = document.createElement("p");
//         superhostIndicator.innerText = "Superhost";
//         superhostIndicator.style.color = "red";
//         listingCard.appendChild(superhostIndicator);
//     }
//     const amenitiesPreview = document.createElement("p");
//     amenitiesPreview.innerText = `Amenities: ${createAmenitiesPreview(listing.amenities)}`;
//     listingCard.appendChild(amenitiesPreview);

//     const costButton = document.createElement("button");
//     costButton.innerText = "Show Booking Cost Breakdown";
//     costButton.addEventListener("click", () => showBookingCostBreakdown(listing));
//     listingCard.appendChild(costButton);

//     // new google.s.Marker({
//     //     position: { lat: listing.lat, lng: listing.lng },
//     //     ,
//     //     title: listing.name
//     // });
//     const lat=listing.lat;
//     const lon=listing.lng;
//     init(lat,lon)

//     const directionsButton = document.createElement("button");
//     directionsButton.innerText = "Get Directions";
//     directionsButton.addEventListener("click", function() {
//         openDirections(listing.location);
//     });
//     listingCard.appendChild(directionsButton);

//    
// }

// function createHostDetails(host) {
//     // Include the host's name and 'Superhost' status
//     let hostText = host.name;

//     if (host.is_superhost) {
//         hostText += " (Superhost)";
//     }

//     return hostText;
// }

// function openDirections(location) {
//     // Open Google s directions in a new tab
//     const url = `https://www.google.com/s/dir//${location.latitude},${location.longitude}`;
//     window.open(url, "_blank");
// }

// function createAmenitiesPreview(amenities) {
//     // Show the first 3 amenities and the total count
//     const previewAmenities = amenities.slice(0, 3);
//     let previewText = previewAmenities.join(", ");

//     if (amenities.length > 3) {
//         const extraCount = amenities.length - 3;
//         previewText += `, and ${extraCount} more`;
//     }

//     return previewText;
// }
// let ;

// function init(lat,lan) {
//      = new google.s.(document.getElementById(""), {
//         center: { lat: -34.397, lng: 150.644 }, // Centered at some default location
//         zoom: 8
//     });
// }
// function showBookingCostBreakdown(listing) {
//     // Calculate additional fees and total cost
//     const additionalFees = listing.price * 0.10; // Assuming additional fees are 10% of base price
//     const totalCost = listing.price + additionalFees;

//     // Create a modal dialog box
//     const modal = document.createElement("div");
//     modal.style.display = "block";
//     modal.style.width = "300px";
//     modal.style.height = "200px";
//     modal.style.backgroundColor = "#fff";
//     modal.style.position = "fixed";
//     modal.style.top = "50%";
//     modal.style.left = "50%";
//     modal.style.transform = "translate(-50%, -50%)";
//     modal.style.padding = "20px";
//     modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

//     // Add booking cost breakdown to the modal
//     modal.innerHTML = `
//         <h2>Booking Cost Breakdown</h2>
//         <p>Base Rate: $${listing.price.toFixed(2)}</p>
//         <p>Additional Fees: $${additionalFees.toFixed(2)}</p>
//         <p>Total Cost: $${totalCost.toFixed(2)}</p>
//     `;

//     // Add a close button to the modal
//     const closeButton = document.createElement("button");
//     closeButton.innerText = "Close";
//     closeButton.addEventListener("click", () => modal.style.display = "none");
//     modal.appendChild(closeButton);

//     // Add the modal to the body
//     document.body.appendChild(modal);
// }
