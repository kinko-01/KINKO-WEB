const OWNER = "2349165630643"; // WhatsApp number that receives bookings (country code, no +)
const $ = id => document.getElementById(id);
$("bdate").min = new Date().toISOString().slice(0, 10);

function sendWA(lines, msgEl) {
  const url = `https://wa.me/${OWNER}?text=${encodeURIComponent(lines.join("\n"))}`;
  $(msgEl).innerHTML = `Opening WhatsApp… if nothing happens, <a href="${url}" target="_blank" rel="noopener">tap here</a>.`;
  window.open(url, "_blank", "noopener") || (location.href = url);
}

$("bookForm").onsubmit = e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  sendWA(["*NEW BOOKING*", `Name: ${d.name}`, `Phone: ${d.phone}`, `Service: ${d.service}`,
          `Date: ${d.date || "Not set"}`, `Details: ${d.details || "-"}`], "bookMsg");
  e.target.reset();
};

$("fbForm").onsubmit = e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  sendWA(["*FEEDBACK*", `From: ${d.name || "Anonymous"}`, `Rating: ${"★".repeat(+d.rating)} (${d.rating}/5)`, d.message], "fbMsg");
  e.target.reset();
};
