// Contact Form Submission (for now, just a simple alert to simulate form submission)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting normally
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    alert(`Thank you for your message, ${name}! We will get back to you soon.`);
    
    // Clear the form after submission
    document.getElementById('contactForm').reset();
});
let map = L.map('map').setView([20.5937, 78.9629], 5); // Default to India

// Load OpenStreetMap (Free)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(map);

// Update lat/lng on marker drag
marker.on('dragend', function (event) {
    let position = marker.getLatLng();
    document.getElementById("latitude").value = position.lat;
    document.getElementById("longitude").value = position.lng;
});

function searchLocation() {
    let address = document.getElementById("address").value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let lat = data[0].lat;
                let lon = data[0].lon;
                map.setView([lat, lon], 15);
                marker.setLatLng([lat, lon]);
                document.getElementById("latitude").value = lat;
                document.getElementById("longitude").value = lon;
            } else {
                alert("Location not found!");
            }
        });
}

// Geolocation (Auto-Detect User's Location)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        map.setView([lat, lon], 15);
        marker.setLatLng([lat, lon]);
        document.getElementById("latitude").value = lat;
        document.getElementById("longitude").value = lon;
    });
}