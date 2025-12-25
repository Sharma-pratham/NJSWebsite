const waveContainer = document.querySelector('.wave-container');
const hashtagTexts = [
    "#onthegomeals", "#yourdailygrubdestination", "#njs", "#inhousebaking", "#parfaits",
    "#italiansandwiches", "#specialitybistro", "#frappekiller", "#mexican", "#inhousebaking",
    "#onthegomeals", "#yourdailygrubdestination", "#njs", "#inhousebaking", "#parfaits",
    "#italiansandwiches", "#specialitybistro", "#frappekiller", "#mexican", "#inhousebaking"
];
const colors = ["#ff6b6b", "#f06595", "#cc5de8", "#845ef7", "#5c7cfa", "#339af0", "#22b8cf", "#20c997", "#51cf66", "#fcc419"];
const links = [
    "https://www.instagram.com/p/DSWZFHLDxOv/",
    "https://www.instagram.com/p/DSM28dDD6wF/",
    "https://www.instagram.com/p/DSFbOPaj3xW/",
    "https://www.instagram.com/notjustsmoovindia/"
];

let hashtags = [];
let flowOffset = 0;
const amplitude = 60;
const frequency = 0.005;
const speed = 1;
let basePositions = [];
const spacing = 250;

hashtagTexts.forEach((text, i) => {
    if (!waveContainer) return;
    const a = document.createElement('a');
    a.href = links[i % links.length];
    a.target = "_blank";
    a.textContent = text;
    waveContainer.appendChild(a);
    hashtags.push(a);
    basePositions[i] = i * spacing;
    a.style.color = colors[i % colors.length];
    a.style.position = 'absolute';
    const isMobile = window.innerWidth < 600;
    a.style.fontSize = isMobile ? '1em' : '2em';
    a.style.fontWeight = '600';
});

function animate() {
    if (!waveContainer || hashtags.length === 0) return;
    flowOffset += speed;
    hashtags.forEach((tag, i) => {
        let x = (basePositions[i] + flowOffset);
        if (x > window.innerWidth + spacing) {
            basePositions[i] -= (hashtags.length * spacing);
            x = (basePositions[i] + flowOffset);
        }
        const y = Math.sin(x * frequency) * amplitude;
        const derivative = Math.cos(x * frequency) * amplitude * frequency;
        const angle = Math.atan(derivative) * (180 / Math.PI);

        tag.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    });
    requestAnimationFrame(animate);
}

animate();

// Set the date we're counting down to
const countDownDate = new Date("Jan 26, 2026 00:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function() {

  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="countdown"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
