let carbonChart;

function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  const selectedTab = document.getElementById(tabId);
  selectedTab.classList.add('active');
}

function showCarbonFootprint() {
  let transportMode = document.getElementById('transportMode').value;
  let distance = document.getElementById('distance').value;
  let co2Emissions = 0;

  const emissionFactors = {
    car: 0.21,
    airplane: 0.255,
    bus: 0.103,
    train: 0.041,
    bicycle: 0
  };

  co2Emissions = distance * emissionFactors[transportMode];

  document.getElementById('result').innerHTML = `Tu huella de carbono es de ${co2Emissions.toFixed(2)} kg de CO₂.`;

  let emissionsData = [
    distance * emissionFactors['car'],
    distance * emissionFactors['airplane'],
    distance * emissionFactors['bus'],
    distance * emissionFactors['train'],
    distance * emissionFactors['bicycle']
  ];

  if (carbonChart) {
    carbonChart.destroy();
  }

  const ctx = document.getElementById('carbonChart').getContext('2d');
  carbonChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Automóvil', 'Avión', 'Autobús', 'Tren', 'Bicicleta'],
      datasets: [{
        label: 'Emisiones de CO₂ (kg)',
        data: emissionsData,
        backgroundColor: ['#ff6384', '#36a2eb', '#f39c12', '#2ecc71', '#9b59b6']
      }]
    },
    options: {
      aspectRatio: 2.5,
      cutout: '70%',
      responsive: false,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  openTab('calculator');
});
