let funds = [];

async function fetchNAV() {
  const response = await fetch("https://portal.amfiindia.com/spages/NAVAll.txt");
  const text = await response.text();

  const lines = text.split("\n");

  funds = [];

  lines.forEach(line => {
    const parts = line.split(";");

    if (parts.length > 4 && !isNaN(parts[4])) {
      funds.push({
        schemeCode: parts[0],
        schemeName: parts[3],
        nav: parseFloat(parts[4])
      });
    }
  });

  populateDropdown(funds);
}

function populateDropdown(data) {
  const select = document.getElementById("fundSelect");
  select.innerHTML = "";

  data.forEach(fund => {
    const option = document.createElement("option");
    option.value = fund.nav;
    option.textContent = `${fund.schemeName} (₹${fund.nav})`;
    select.appendChild(option);
  });
}

document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = funds.filter(fund =>
    fund.schemeName.toLowerCase().includes(value)
  );

  populateDropdown(filtered);
});

function calculateValue() {
  const nav = document.getElementById("fundSelect").value;
  const units = document.getElementById("units").value;

  if (!nav || !units) {
    alert("Please select fund and enter units");
    return;
  }

  const value = nav * units;

  document.getElementById("result").innerText =
    `Portfolio Value: ₹${value.toFixed(2)}`;
}

fetchNAV();
