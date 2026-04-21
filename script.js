// ---------- TRAVEL PACKAGES DATA (matches your previous idea: exotic & curated) ----------
const packagesData = [
  {
    id: "pkg1",
    name: " Maldives Serenity",
    price: 1899,
    currency: "USD",
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format",
    description: "Overwater bungalows, turquoise lagoons & all-inclusive luxury.",
    badge: "Best Seller"
  },
  {
    id: "pkg2",
    name: " Swiss Alps Adventure",
    price: 2450,
    currency: "USD",
    duration: "8 Days / 7 Nights",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format",
    description: "Jungfraujoch, scenic train rides & alpine trekking.",
    badge: "Trending"
  },
  {
    id: "pkg3",
    name: " Kyoto Cherry Blossom",
    price: 1599,
    currency: "USD",
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format",
    description: "Temples, tea ceremonies & cultural immersion in spring.",
    badge: "Cultural"
  },
  {
    id: "pkg4",
    name: " Safari Serengeti",
    price: 2999,
    currency: "USD",
    duration: "9 Days / 8 Nights",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format",
    description: "Big Five encounters, luxury tented camps & sunsets.",
    badge: "Wildlife"
  }
];

// ---------- DOM Elements ----------
const packagesGrid = document.getElementById("packagesGrid");
const packageSelect = document.getElementById("packageSelect");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const travelersInput = document.getElementById("travelers");
const departureDateInput = document.getElementById("departureDate");
const specialRequestsInput = document.getElementById("specialRequests");
const bookingForm = document.getElementById("travelBookingForm");
const dynamicSummarySpan = document.getElementById("dynamicSummary");

// Helper: format price
function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(price);
}

// Render packages grid (cards) + populate dropdown select dynamically
function renderPackages() {
  if (!packagesGrid) return;
  packagesGrid.innerHTML = "";
  packagesData.forEach(pkg => {
    const card = document.createElement("div");
    card.className = "package-card";
    card.setAttribute("data-pkg-id", pkg.id);
    
    // image background
    const imgDiv = document.createElement("div");
    imgDiv.className = "card-img";
    imgDiv.style.backgroundImage = `url(${pkg.image})`;
    imgDiv.style.backgroundSize = "cover";
    // badge
    const badgeSpan = document.createElement("span");
    badgeSpan.className = "card-badge";
    badgeSpan.innerText = pkg.badge;
    imgDiv.appendChild(badgeSpan);
    
    const contentDiv = document.createElement("div");
    contentDiv.className = "card-content";
    contentDiv.innerHTML = `
      <h3>${pkg.name}</h3>
      <div class="price">${formatPrice(pkg.price, pkg.currency)}<span> / person</span></div>
      <div class="package-desc">${pkg.description}</div>
      <div class="card-footer">
        <span class="duration"><i class="far fa-clock"></i> ${pkg.duration}</span>
        <button class="select-btn" data-id="${pkg.id}">Select this trip</button>
      </div>
    `;
    card.appendChild(imgDiv);
    card.appendChild(contentDiv);
    packagesGrid.appendChild(card);
  });

  // attach event listeners to all "Select this trip" buttons (dynamic)
  document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgId = btn.getAttribute('data-id');
      const selectedPackage = packagesData.find(p => p.id === pkgId);
      if (selectedPackage) {
        // update the select dropdown value
        if (packageSelect) packageSelect.value = selectedPackage.id;
        // trigger update summary + scroll to form smoothly
        updateLiveSummary();
        document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
        // optional small feedback: flash
        showFloatingMessage(`${selectedPackage.name} selected! ✨`);
      }
    });
  });
}

// populate select dropdown options from packagesData
function populateSelectDropdown() {
  if (!packageSelect) return;
  packageSelect.innerHTML = '<option value="">-- Choose your adventure --</option>';
  packagesData.forEach(pkg => {
    const option = document.createElement("option");
    option.value = pkg.id;
    option.textContent = `${pkg.name}  |  ${formatPrice(pkg.price, pkg.currency)} (${pkg.duration})`;
    packageSelect.appendChild(option);
  });
  // attach change event for live summary
  packageSelect.addEventListener("change", updateLiveSummary);
}

// get currently selected package object (from select or from any other trigger)
function getSelectedPackage() {
  const selectedId = packageSelect.value;
  if (!selectedId) return null;
  return packagesData.find(pkg => pkg.id === selectedId);
}

// LIVE dynamic summary: updates based on form + selected package
function updateLiveSummary() {
  const selectedPkg = getSelectedPackage();
  const travelerCount = parseInt(travelersInput.value, 10);
  const validTravelers = (!isNaN(travelerCount) && travelerCount >= 1) ? travelerCount : 1;
  const nameRaw = fullNameInput.value.trim();
  const displayName = nameRaw === "" ? "Guest" : nameRaw;
  const departDate = departureDateInput.value;
  const formattedDate = departDate ? new Date(departDate).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : "not set";
  
  if (!selectedPkg) {
    dynamicSummarySpan.innerHTML = `<i class="fas fa-hand-point-right"></i> Please select a travel package from the cards or dropdown above.`;
    return;
  }
  
  const basePrice = selectedPkg.price;
  const totalPrice = basePrice * validTravelers;
  const formattedTotal = formatPrice(totalPrice, selectedPkg.currency);
  const formattedBase = formatPrice(basePrice, selectedPkg.currency);
  
  dynamicSummarySpan.innerHTML = `
    <div style="margin-top: 6px;"><strong> ${selectedPkg.name}</strong> — ${selectedPkg.duration}</div>
    <div> ${displayName} |  ${validTravelers} traveler(s) |  ${formattedDate}</div>
    <div> Base price: ${formattedBase} / person → <strong>Total: ${formattedTotal}</strong></div>
    <div><i class="fas fa-comment"></i> ${specialRequestsInput.value.trim() ? `Special: "${specialRequestsInput.value.trim()}"` : "No special requests"}</div>
  `;
}

// show floating toast message
function showFloatingMessage(msg, isError = false) {
  const existingToast = document.querySelector('.toast-msg');
  if (existingToast) existingToast.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.style.backgroundColor = isError ? '#b33b2c' : '#2c7a47';
  toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// validate form & submit booking (dynamic JS interaction)
function handleBookingSubmit(event) {
  event.preventDefault();
  
  // validation
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const selectedPkg = getSelectedPackage();
  const departDate = departureDateInput.value;
  const travelersVal = travelersInput.value;
  
  if (!fullName) {
    showFloatingMessage("Please enter your full name", true);
    fullNameInput.focus();
    return;
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    showFloatingMessage("Valid email required", true);
    emailInput.focus();
    return;
  }
  if (!selectedPkg) {
    showFloatingMessage("Choose a travel package first ", true);
    packageSelect.focus();
    return;
  }
  if (!departDate) {
    showFloatingMessage("Select your departure date", true);
    departureDateInput.focus();
    return;
  }
  const travelersNum = parseInt(travelersVal, 10);
  if (isNaN(travelersNum) || travelersNum < 1 || travelersNum > 12) {
    showFloatingMessage("Travelers must be between 1 and 12", true);
    travelersInput.focus();
    return;
  }
  
  const totalCost = selectedPkg.price * travelersNum;
  const formattedTotalCost = formatPrice(totalCost, selectedPkg.currency);
  const bookingRef = 'TRV-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // dynamic success message + console log (simulate booking)
  const summaryMsg = `
     Booking confirmed for ${fullName} (${email})!
     Package: ${selectedPkg.name}
     Travelers: ${travelersNum}
     Departure: ${new Date(departDate).toLocaleDateString()}
     Total: ${formattedTotalCost}
     Special: ${specialRequestsInput.value.trim() || "—"}
     Ref: ${bookingRef}
  `;
  showFloatingMessage(`Booking successful! ${selectedPkg.name} reserved.`);
  
  // dynamic popup in summary panel for 5 seconds then revert to live summary style
  const originalSummary = dynamicSummarySpan.innerHTML;
  dynamicSummarySpan.innerHTML = `<div style="background:#c3e6cb; padding:12px; border-radius:24px;"><i class="fas fa-check-circle"></i> ${summaryMsg.replace(/\n/g,'<br>')}</div>`;
  setTimeout(() => {
    // revert to live summary only if the form hasn't been resubmitted too fast
    if (dynamicSummarySpan.innerHTML !== originalSummary) {
      updateLiveSummary();
    }
  }, 5000);
  
  // optional: reset form? we keep fields but we can optionally clear requests?
  // but we want dynamic to persist updated summary, we just re-call updateLiveSummary after 5 secs is fine.
  // Actually we want to keep form as is but we simulate a booking.
  console.log("BOOKING SUBMITTED (simulation): ", {
    fullName, email, package: selectedPkg, travelers: travelersNum, departDate, special: specialRequestsInput.value, bookingRef
  });
  
  // additional: you could also clear special requests optionally? but not required, we just show success.
}

// attach event listeners for real-time summary on all inputs
function attachLiveSummaryEvents() {
  const inputs = [fullNameInput, emailInput, travelersInput, departureDateInput, specialRequestsInput, packageSelect];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updateLiveSummary);
      input.addEventListener('change', updateLiveSummary);
    }
  });
  // also date change
  if(departureDateInput) departureDateInput.addEventListener('change', updateLiveSummary);
}

// set default date to tomorrow (dynamic)
function setDefaultDate() {
  if (departureDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    departureDateInput.value = `${yyyy}-${mm}-${dd}`;
  }
}

// INITIALIZE all dynamic features
function init() {
  renderPackages();
  populateSelectDropdown();
  attachLiveSummaryEvents();
  setDefaultDate();
  // initial summary (maybe no package selected: show placeholder)
  updateLiveSummary();
  // attach form submit
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
  }
  // manual update for any card selections already handled via delegate
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);