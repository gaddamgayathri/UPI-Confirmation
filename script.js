 let paymentData = {
  amount: 0,
  name: "",
  upi: ""
};

document.addEventListener("DOMContentLoaded", () => {
  // ✅ always hide popup when page opens
  document.getElementById("voicePopup").style.display = "none";

  // ✅ attach click to button
  document.getElementById("continueBtn").addEventListener("click", openVoicePopup);
});

function speak(text) {
  if (!("speechSynthesis" in window)) {
    alert("Voice not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;
  msg.volume = 1;
  window.speechSynthesis.speak(msg);
}

function openVoicePopup() {
  const amount = document.getElementById("amountInput").value;
  const name = document.getElementById("nameInput").value.trim();
  const upi = document.getElementById("upiInput").value.trim();

  if (!amount || amount <= 0) return alert("Please enter a valid amount!");
  if (!name) return alert("Please enter payee name!");
  if (!upi) return alert("Please enter UPI ID!");

  paymentData.amount = amount;
  paymentData.name = name;
  paymentData.upi = upi;

  const popup = document.getElementById("voicePopup");
  popup.style.display = "flex"; // ✅ show popup

  document.getElementById("voiceText").innerText =
    `You are trying to pay ₹${amount} to ${name} (${upi}). Is that okay?`;

  setTimeout(() => {
    speak(`You are trying to pay rupees ${amount} to ${name}. Is that okay?`);
  }, 300);
}

function closeVoicePopup() {
  document.getElementById("voicePopup").style.display = "none";
}

function goToGuardian() {
  closeVoicePopup();

  document.getElementById("showAmount").innerText = `₹${paymentData.amount}`;
  document.getElementById("showName").innerText = paymentData.name;
  document.getElementById("showUpi").innerText = paymentData.upi;

  let risk = "Low";
  if (paymentData.amount >= 5000) risk = "High";
  else if (paymentData.amount >= 1000) risk = "Medium";
  document.getElementById("showRisk").innerText = risk;

  document.getElementById("screen1").classList.add("hidden");
  document.getElementById("screen2").classList.remove("hidden");
}

function readDetails() {
  speak(
    `You are sending rupees ${paymentData.amount} to ${paymentData.name}. ` +
    `UPI ID is ${paymentData.upi}. If correct,pay.`
  );
}

function backToEdit() {
  document.getElementById("screen2").classList.add("hidden");
  document.getElementById("screen1").classList.remove("hidden");
}

function goToSuccess() {
  document.getElementById("successMsgText").innerText =
    `₹${paymentData.amount} sent to ${paymentData.name} (${paymentData.upi})`;

  document.getElementById("screen2").classList.add("hidden");
  document.getElementById("screen3").classList.remove("hidden");

  speak(`Payment successful. Rupees ${paymentData.amount} paid to ${paymentData.name}.`);
}

function restart() {
  document.getElementById("screen3").classList.add("hidden");
  document.getElementById("screen1").classList.remove("hidden");

  document.getElementById("amountInput").value = "";
  document.getElementById("nameInput").value = "";
  document.getElementById("upiInput").value = "";

  closeVoicePopup();
}