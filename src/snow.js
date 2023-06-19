const SNOW_SIZE = Math.random() * 4.5 + 5;

function setSnowAttributes(snow) {
  snow.className = "snow";
  snow.style.width = SNOW_SIZE + "px";
  snow.style.height = SNOW_SIZE + "px";
  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.animationDuration = Math.random() * 3 + 4.3 + "s";
  snow.style.zIndex = "-1";
}

export function makeSnowflake() {
  const snowflake = document.createElement("div");
  setSnowAttributes(snowflake);
  document.body.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 8000);
}