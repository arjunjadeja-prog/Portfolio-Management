let funds = [];

async function fetchNAV() {
  const result = document.getElementById('result');
  result.innerText = 'Loading NAV data...';

  try {
    const response = await fetch('/api/nav');

    if (!response.ok) {
      throw new Error('Failed to load NAV data');
    }

    const text = await response.text();
    const lines = text.split('\n');

    funds = [];

    lines.forEach((line) => {
      const parts = line.split(';');
      const nav = Number.parseFloat(parts[4]);

      if (parts.length > 4 && Number.isFinite(nav)) {
        funds.push({
          schemeCode: parts[0],
          schemeName: parts[3],
          nav,
        });
      }
    });

    populateDropdown(funds);

    result.innerText = funds.length
      ? `Loaded ${funds.length} funds.`
      : 'No funds were found in the NAV source.';
  } catch (error) {
    result.innerText = 'Could not load NAV data. Please try again later.';
  }
}

function populateDropdown(data) {
  const select = document.getElementById('fundSelect');
  select.innerHTML = '';

  if (!data.length) {
    const emptyOption = document.createElement('option');
    emptyOption.textContent = 'No matching fund found';
    emptyOption.value = '';
    select.appendChild(emptyOption);
    return;
  }

  data.forEach((fund) => {
    const option = document.createElement('option');
    option.value = String(fund.nav);
    option.textContent = `${fund.schemeName} (₹${fund.nav.toFixed(4)})`;
    select.appendChild(option);
  });
}

document.getElementById('search').addEventListener('input', function onSearchInput() {
  const value = this.value.toLowerCase().trim();

  const filtered = funds.filter((fund) => fund.schemeName.toLowerCase().includes(value));

  populateDropdown(filtered);
});

function calculateValue() {
  const nav = Number.parseFloat(document.getElementById('fundSelect').value);
  const units = Number.parseFloat(document.getElementById('units').value);

  if (!Number.isFinite(nav) || !Number.isFinite(units) || units <= 0) {
    alert('Please select a fund and enter a valid unit value.');
    return;
  }

  const value = nav * units;

  document.getElementById('result').innerText = `Portfolio Value: ₹${value.toFixed(2)}`;
}

fetchNAV();
