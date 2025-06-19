
async function analyzeVideo() {
  const url = document.getElementById("videoUrl").value;
  const resultDiv = document.getElementById("result");
  const titleEl = document.getElementById("title");
  const thumbnailEl = document.getElementById("thumbnail");
  const formatsList = document.getElementById("formats");

  resultDiv.classList.add("hidden");
  titleEl.innerText = "";
  thumbnailEl.src = "";
  formatsList.innerHTML = "";

  if (!url) {
    alert("Please enter a video URL.");
    return;
  }

  try {
    const response = await fetch("https://0e2894bc-309a-4991-a610-a660851070fe-00-1ju1qlvtsuwgz.riker.replit.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    titleEl.innerText = data.title;
    thumbnailEl.src = data.thumbnail;

    data.formats.forEach(format => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${format.url}" target="_blank">${format.quality || "Unknown"} (${format.extension})</a>`;
      formatsList.appendChild(li);
    });

    resultDiv.classList.remove("hidden");
  } catch (error) {
    alert("Failed to fetch video info.");
    console.error(error);
  }
}
