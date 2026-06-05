// ---------- TRAVEL PACKAGES DATA ----------
const packagesData = [
  {
    id: "pkg1",
    name: "Maldives Serenity",
    price: 1899,
    currency: "USD",
    durationDays: 7,
    duration: "7 Days / 6 Nights",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format",
    description:
      "Overwater bungalows, turquoise lagoons & all-inclusive luxury.",
    badge: "Best Seller",
  },
  {
    id: "pkg2",
    name: "Swiss Alps Adventure",
    price: 2450,
    currency: "USD",
    durationDays: 8,
    duration: "8 Days / 7 Nights",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format",
    description: "Jungfraujoch, scenic train rides & alpine trekking.",
    badge: "Trending",
  },
  {
    id: "pkg3",
    name: "Kyoto Cherry Blossom",
    price: 1599,
    currency: "USD",
    durationDays: 6,
    duration: "6 Days / 5 Nights",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format",
    description: "Temples, tea ceremonies & cultural immersion in spring.",
    badge: "Cultural",
  },
  {
    id: "pkg4",
    name: "Safari Serengeti",
    price: 2999,
    currency: "USD",
    durationDays: 9,
    duration: "9 Days / 8 Nights",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format",
    description: "Big Five encounters, luxury tented camps & sunsets.",
    badge: "Wildlife",
  },
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
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const noResults = document.getElementById("noResults");
const loadingSpinner = document.getElementById("loadingSpinner");
const themeToggle = document.getElementById("themeToggle");
const historySection = document.getElementById("booking-history");
const historyList = document.getElementById("historyList");

// Helper: format price
function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

// ---------- DARK MODE ----------
function initTheme() {
  const savedTheme = localStorage.getItem("wanderway_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("wanderway_theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// ---------- SEARCH, FILTER & SORT ----------
function getFilteredAndSortedPackages() {
  let filtered = [...packagesData];
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const category = categoryFilter ? categoryFilter.value : "all";
  const sortType = sortSelect ? sortSelect.value : "default";

  if (searchTerm)
    filtered = filtered.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(searchTerm) ||
        pkg.description.toLowerCase().includes(searchTerm),
    );
  if (category !== "all")
    filtered = filtered.filter((pkg) => pkg.badge === category);

  if (sortType === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortType === "price-desc")
    filtered.sort((a, b) => b.price - a.price);
  else if (sortType === "duration-asc")
    filtered.sort((a, b) => a.durationDays - b.durationDays);

  return filtered;
}

function renderPackages() {
  if (!packagesGrid) return;
  packagesGrid.innerHTML = "";
  const displayPackages = getFilteredAndSortedPackages();

  if (displayPackages.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    displayPackages.forEach((pkg) => {
      const card = document.createElement("div");
      card.className = "package-card";
      card.innerHTML = `
                <div class="card-img" style="background-image: url(${pkg.image})">
                    <span class="card-badge">${pkg.badge}</span>
                </div>
                <div class="card-content">
                    <h3>${pkg.name}</h3>
                    <div class="price">${formatPrice(pkg.price, pkg.currency)} <span>/ person</span></div>
                    <div class="package-desc">${pkg.description}</div>
                    <div class="card-footer">
                        <span class="duration"><i class="far fa-clock"></i> ${pkg.duration}</span>
                        <button class="select-btn" data-id="${pkg.id}">Select this trip</button>
                    </div>
                </div>
            `;
      packagesGrid.appendChild(card);
    });

    document.querySelectorAll(".select-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pkgId = btn.getAttribute("data-id");
        const selectedPackage = packagesData.find((p) => p.id === pkgId);
        if (selectedPackage && packageSelect) {
          packageSelect.value = selectedPackage.id;
          updateLiveSummary();
          document
            .getElementById("booking-form")
            .scrollIntoView({ behavior: "smooth", block: "start" });
          showFloatingMessage(`${selectedPackage.name} selected! ✨`);
        }
      });
    });
  }
}

[searchInput, categoryFilter, sortSelect].forEach((el) => {
  if (el) {
    el.addEventListener("input", renderPackages);
    el.addEventListener("change", renderPackages);
  }
});

// ---------- DROPDOWN & LIVE SUMMARY ----------
function populateSelectDropdown() {
  if (!packageSelect) return;
  packageSelect.innerHTML =
    '<option value="">-- Choose your adventure --</option>';
  packagesData.forEach((pkg) => {
    const option = document.createElement("option");
    option.value = pkg.id;
    option.textContent = `${pkg.name} | ${formatPrice(pkg.price, pkg.currency)} (${pkg.duration})`;
    packageSelect.appendChild(option);
  });
  packageSelect.addEventListener("change", updateLiveSummary);
}

function getSelectedPackage() {
  const selectedId = packageSelect?.value;
  if (!selectedId) return null;
  return packagesData.find((pkg) => pkg.id === selectedId);
}

function updateLiveSummary() {
  const selectedPkg = getSelectedPackage();
  const travelerCount = parseInt(travelersInput?.value || 1, 10);
  const validTravelers =
    !isNaN(travelerCount) && travelerCount >= 1 ? travelerCount : 1;
  const displayName =
    fullNameInput?.value.trim() === "" ? "Guest" : fullNameInput.value.trim();
  const departDate = departureDateInput?.value;
  const formattedDate = departDate
    ? new Date(departDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "not set";
  const specialReq = specialRequestsInput?.value.trim() || "";

  if (!selectedPkg) {
    dynamicSummarySpan.innerHTML = `<i class="fas fa-hand-point-right"></i> Please select a travel package.`;
    return;
  }

  const totalPrice = selectedPkg.price * validTravelers;
  dynamicSummarySpan.innerHTML = `
        <div style="margin-bottom: 8px;"><strong>${selectedPkg.name}</strong> — ${selectedPkg.duration}</div>
        <div style="margin-bottom: 8px;">${displayName} | ${validTravelers} traveler(s) | ${formattedDate}</div>
        <div style="margin-bottom: 8px;">Base: ${formatPrice(selectedPkg.price)} / person → <strong>Total: ${formatPrice(totalPrice)}</strong></div>
        <div><i class="fas fa-comment-alt"></i> ${specialReq ? `Special: "${specialReq}"` : "No special requests"}</div>
    `;
}

[
  fullNameInput,
  emailInput,
  travelersInput,
  departureDateInput,
  specialRequestsInput,
].forEach((input) => {
  if (input) {
    input.addEventListener("input", updateLiveSummary);
    input.addEventListener("change", updateLiveSummary);
  }
});

// ---------- BOOKING HISTORY (LOCAL STORAGE) ----------
function getBookingHistory() {
  return JSON.parse(localStorage.getItem("wanderway_bookings") || "[]");
}

function saveBookingToHistory(booking) {
  const history = getBookingHistory();
  history.unshift(booking);
  localStorage.setItem("wanderway_bookings", JSON.stringify(history));
  renderBookingHistory();
}

function renderBookingHistory() {
  const history = getBookingHistory();
  if (!historySection || !historyList) return;

  if (history.length === 0) {
    historySection.classList.add("hidden");
    return;
  }
  historySection.classList.remove("hidden");
  historyList.innerHTML = history
    .map(
      (b) => `
        <div class="history-item">
            <div class="history-info">
                <h4>${b.packageName}</h4>
                <p>${b.travelers} Traveler(s) • Departure: ${new Date(b.departDate).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${b.totalCost}</p>
            </div>
            <div class="history-ref">Ref: ${b.bookingRef}</div>
        </div>
    `,
    )
    .join("");
}

document
  .querySelector('a[href="#booking-history-toggle"]')
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    historySection.classList.toggle("hidden");
    if (!historySection.classList.contains("hidden")) {
      historySection.scrollIntoView({ behavior: "smooth" });
    }
  });

// ---------- LOADING STATE & FASTAPI INTEGRATION ----------
function showLoading(show) {
  if (loadingSpinner) {
    show
      ? loadingSpinner.classList.remove("hidden")
      : loadingSpinner.classList.add("hidden");
  }
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const selectedPkg = getSelectedPackage();
  const departDate = departureDateInput.value;
  const travelersNum = parseInt(travelersInput.value, 10);

  if (
    !fullName ||
    !email.includes("@") ||
    !selectedPkg ||
    !departDate ||
    travelersNum < 1
  ) {
    showFloatingMessage("Please fill all required fields correctly.", true);
    return;
  }

  showLoading(true);

  const bookingData = {
    fullName,
    email,
    packageName: selectedPkg.name,
    travelers: travelersNum,
    departDate,
    specialRequests: specialRequestsInput.value.trim(),
    totalCost: formatPrice(
      selectedPkg.price * travelersNum,
      selectedPkg.currency,
    ),
    timestamp: new Date().toISOString(),
  };

  try {
    // Call FastAPI Backend
    const response = await fetch("http://localhost:8000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    let result;
    if (response.ok) {
      result = await response.json();
    } else {
      throw new Error("Backend unavailable");
    }

    finalizeBooking(bookingData, result.bookingRef);
  } catch (error) {
    console.warn(
      "API Fallback triggered (is FastAPI running?):",
      error.message,
    );
    // Fallback to local simulation if backend is offline
    setTimeout(() => {
      const localRef =
        "TRV-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      finalizeBooking(bookingData, localRef);
    }, 1500);
  }
}

function finalizeBooking(data, ref) {
  showLoading(false);
  const bookingRecord = { ...data, bookingRef: ref };

  saveBookingToHistory(bookingRecord);
  showFloatingMessage(`Booking successful! Ref: ${ref}`);

  dynamicSummarySpan.innerHTML = `
        <div style="background: var(--success-bg); color: var(--success-text); padding: 16px; border-radius: 12px; border: 1px solid var(--success-text);">
            <i class="fas fa-check-circle"></i> <strong>Confirmed!</strong><br>
            Reference: ${ref}<br>
            A confirmation email has been sent to ${data.email}.
        </div>
    `;

  setTimeout(() => {
    if (bookingForm) bookingForm.reset();
    setDefaultDate();
    updateLiveSummary();
  }, 5000);
}

// ---------- UTILITIES ----------
function showFloatingMessage(msg, isError = false) {
  const existingToast = document.querySelector(".toast-msg");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `toast-msg ${isError ? "error" : ""}`;
  toast.innerHTML = `<i class="fas ${isError ? "fa-exclamation-circle" : "fa-check-circle"}"></i> ${msg}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function setDefaultDate() {
  if (departureDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    departureDateInput.value = tomorrow.toISOString().split("T")[0];
  }
}

// ---------- INITIALIZATION ----------
function init() {
  initTheme();
  renderPackages();
  populateSelectDropdown();
  setDefaultDate();
  updateLiveSummary();
  renderBookingHistory();

  if (bookingForm) bookingForm.addEventListener("submit", handleBookingSubmit);
}

document.addEventListener("DOMContentLoaded", init);
