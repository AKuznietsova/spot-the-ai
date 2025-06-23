let score = 0;
let aiIndex = 0;

let realImages = [
  "https://images.pexels.com/photos/32284196/pexels-photo-32284196/free-photo-of-lila-und-weisse-cineraria-blumen-in-voller-blute.jpeg",
  "https://images.pexels.com/photos/69776/tulips-bed-colorful-color-69776.jpeg",
  "https://images.pexels.com/photos/30267563/pexels-photo-30267563/free-photo-of-sakura-blume.jpeg",
  "https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg",
  "https://images.pexels.com/photos/67857/daisy-flower-spring-marguerite-67857.jpeg",
  "https://images.pexels.com/photos/3933973/pexels-photo-3933973.jpeg",
  "https://images.pexels.com/photos/11392242/pexels-photo-11392242.jpeg",
];

let prompts = [
  "realistic bouquet of roses",
  "sunflowers in a field",
  "fantasy glowing flowers",
  "macro shot of a tulip",
  "spring meadow full of flowers",
  "ultra-detailed flower garden",
  "flowers with bees in bright sunlight",
];

function getRandomAndRemove(array) {
  const index = Math.floor(Math.random() * array.length);
  const item = array[index];
  array.splice(index, 1);
  return item;
}

function startGame() {
  score = 0;
  renderRound();
}

function renderRound() {
  const container = document.getElementById("app");
  container.classList.remove("fade-in");
  container.classList.add("fade-out");

  setTimeout(() => {
    container.innerHTML = "";

    const textWrapper = document.createElement("div");
    textWrapper.className = "text-wrapper";
    textWrapper.innerHTML =
      "<p>Klicken Sie auf das Bild welches Sie denken ist AI generiert.</p>";

    const imageBlocks = document.createElement("div");
    imageBlocks.className = "image-blocks";

    const feedback = document.createElement("div");
    feedback.id = "feedback";

    const scoreDiv = document.createElement("div");
    scoreDiv.id = "score";
    scoreDiv.textContent = `Richtige Antworten: ${score}`;

    if (realImages.length === 0 || prompts.length === 0) {
      feedback.textContent = "🎉 Spiel beendet!";
      const restartBtn = document.createElement("button");
      restartBtn.textContent = "Zurück zur Startseite";
      restartBtn.onclick = () => window.location.reload();
      container.appendChild(scoreDiv);
      container.appendChild(feedback);
      container.appendChild(restartBtn);
      container.classList.remove("fade-out");
      container.classList.add("fade-in");
      return;
    }

    const realImage = getRandomAndRemove(realImages);
    const prompt = getRandomAndRemove(prompts);
    const aiImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}`;

    aiIndex = Math.random() < 0.5 ? 0 : 1;

    const images = [];
    images[aiIndex] = aiImage;
    images[1 - aiIndex] = realImage;

    let loadedCount = 0;

    images.forEach((src, index) => {
      const imgBox = document.createElement("div");
      imgBox.className = "image-box";

      const img = document.createElement("img");
      img.src = src;
      img.style.visibility = "hidden";

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 2) {
          // когда обе картинки загружены — показать обе
          document.querySelectorAll(".image-box img").forEach(el => {
            el.style.visibility = "visible";
          });
        }
      };

      img.onclick = () => {
        if (index === aiIndex) {
          score++;
          feedback.textContent = "✅ Richtig!";
        } else {
          feedback.textContent = "❌ Falsch.";
        }

        setTimeout(renderRound, 1000);
      };

      imgBox.appendChild(img);
      imageBlocks.appendChild(imgBox);
    });

    container.appendChild(textWrapper);
    container.appendChild(imageBlocks);
    container.appendChild(scoreDiv);
    container.appendChild(feedback);

    container.classList.remove("fade-out");
    container.classList.add("fade-in");
  }, 400);
}
