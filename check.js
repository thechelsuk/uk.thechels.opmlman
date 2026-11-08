// Checks the sample list when (only when) the visitor taps Check, a row at a time, as the app does. The results
// are made up: the thechels.uk posts feed and an old address there that's gone, plus example podcasts,
// YouTube channels and blogs for the other statuses. Nothing is fetched.
(() => {
  const button = document.getElementById("check");
  const tally = document.getElementById("tally");
  const rows = [...document.querySelectorAll("#rows .row")];
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const titles = {
    active: "Active", slowing: "Slowing", dormant: "Dormant", notfound: "Not found",
    moved: "Moved", failing: "Failing", duplicate: "Duplicate",
  };

  const wait = (ms) => new Promise((done) => setTimeout(done, calm ? 0 : ms));

  function reset() {
    tally.textContent = "";
    rows.forEach((row) => {
      delete row.dataset.checked;
      row.querySelector(".word").textContent = "Not checked";
    });
  }

  async function check() {
    button.disabled = true;
    reset();
    for (const row of rows) {
      row.classList.add("now");
      row.querySelector(".word").textContent = "Checking…";
      await wait(300 + Math.random() * 280);
      row.classList.remove("now");
      row.dataset.checked = "";
      row.querySelector(".word").textContent = titles[row.dataset.status];
    }
    const counts = {};
    rows.forEach((r) => { counts[r.dataset.status] = (counts[r.dataset.status] || 0) + 1; });
    const attention = rows.length - (counts.active || 0);
    tally.textContent = `${rows.length} feeds checked. ${counts.active || 0} active, ${attention} worth a look.`;
    button.textContent = "Check again";
    button.disabled = false;
  }

  button.addEventListener("click", check);
})();
