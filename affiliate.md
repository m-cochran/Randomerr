---
layout: default
title: Affiliate Dashboard
permalink: /affiliate/
---

<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Affiliate Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.js"></script>
  <style>

    h1 {
      text-align: center;
      color: #2c3e50;
      margin-top: 40px;
    }

    .affilcontainer {
      width: 90%;
      max-width: 1000px;
      margin: 30px auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    .stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      overflow-x: auto;
    }

    .stats p {
      font-size: 18px;
      font-weight: bold;
      margin: 0 8px 15px;
    }

    .stats span {
      display: block;
      font-size: 24px;
      font-weight: normal;
      color: #16a085;
      margin-top: 5px;
    }

    .button-groups {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .button-groups .graph-toggle-buttons,
    .button-groups .timeframe-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }

    .button-groups button {
      padding: 6px 14px;
      border: none;
      background: #eee;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .button-groups button.active {
      background-color: #0066ff;
      color: #fff;
      font-weight: bold;
    }

    canvas {
      margin-top: 30px;
    }

    h2 {
      margin-top: 40px;
      margin-bottom: 10px;
      color: #2c3e50;
    }

    .sales-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }

    .sales-table th,
    .sales-table td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }

    .sales-table th {
      background-color: #0073ff;
      color: white;
    }

    .sales-table td {
      background-color: #fdfdfd;
    }

    #sales-pagination {
      text-align: center;
      margin-top: 10px;
    }

    #sales-pagination button {
      margin: 5px;
      padding: 6px 12px;
      border: none;
      border-radius: 5px;
      background-color: #ddd;
      cursor: pointer;
      background-color: #0066ff;
      color: white;
      font-weight: bold;
    }

#sales-pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

  </style>
</head>

<body>

  <h1>Affiliate Dashboard</h1>

  <div class="affilcontainer">
    <div class="stats">
      <p>Affiliate Clicks <span id="click-count" class="loading">...</span></p>
      <p>Affiliate Sales <span id="sale-count" class="loading">...</span></p>
      <p>Total Earnings <span id="total-earnings" class="loading">...</span></p>
    </div>


<div class="button-groups">
      <div class="graph-toggle-buttons">
        <button onclick="setGraphMode('clicks')" class="active">Show Clicks</button>
        <button onclick="setGraphMode('sales')">Show Sales</button>
      </div>

<div class="timeframe-buttons">
        <button data-range="hour" onclick="filterClicks('hour')">Hour</button>
        <button data-range="day" onclick="filterClicks('day')">Day</button>
        <button data-range="week" onclick="filterClicks('week')">Week</button>
        <button data-range="month" onclick="filterClicks('month')">Month</button>
        <button data-range="3months" onclick="filterClicks('3months')">3 Months</button>
        <button data-range="6months" onclick="filterClicks('6months')">6 Months</button>
        <button data-range="year" onclick="filterClicks('year')" class="active">Year</button>
      </div>
    </div>

  <canvas id="clicks-chart" width="100%" height="65px"></canvas>

<div style="overflow-x:auto;">
  <table class="sales-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Amount</th>
        <th>Earnings</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody id="sales-list">
      <tr><td colspan="4" class="loading">Loading...</td></tr>
    </tbody>
  </table>
</div>


  <div id="sales-pagination"></div>
  </div>

  <script>
    let chart = null;
    let affiliateData = {};
    let graphMode = 'clicks';
    let currentTimeframe = 'year';
    let currentPage = 1;
    const itemsPerPage = 10;

    function setGraphMode(mode) {
      graphMode = mode;
      document.querySelectorAll('.graph-toggle-buttons button').forEach(btn => btn.classList.remove('active'));
      const label = mode === 'clicks' ? 'Show Clicks' : 'Show Sales';
      [...document.querySelectorAll('.graph-toggle-buttons button')].find(btn => btn.textContent === label)?.classList.add('active');
      filterClicks(currentTimeframe);
    }

    function filterClicks(timeframe) {
      currentTimeframe = timeframe;
      document.querySelectorAll('.timeframe-buttons button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-range') === timeframe);
      });

      const now = new Date();
      const timeLimits = {
        hour: 3600000,
        day: 86400000,
        week: 604800000,
        month: 2628000000,
        '3months': 7884000000,
        '6months': 15768000000,
        year: 31536000000
      };
      const cutoff = new Date(now - timeLimits[timeframe]);
      let filtered = [];

      if (graphMode === 'clicks') {
        filtered = affiliateData.clicks?.filter(c => new Date(c.timestamp) >= cutoff) || [];
        document.getElementById('click-count').textContent = filtered.length;
      } else {
        filtered = affiliateData.sales?.filter(s => new Date(s.date) >= cutoff) || [];
        document.getElementById('sale-count').textContent = filtered.length;
      }

      updateChart(filtered);
    }

    function updateChart(dataArray) {
      const countsByDate = {};
      dataArray.forEach(entry => {
        const date = new Date(entry.timestamp || entry.date).toLocaleDateString();
        if (graphMode === 'sales') {
          const earning = entry.amount ? entry.amount * 0.30 : 0;
          countsByDate[date] = (countsByDate[date] || 0) + earning;
        } else {
          countsByDate[date] = (countsByDate[date] || 0) + 1;
        }
      });
      const labels = Object.keys(countsByDate).sort((a, b) => new Date(a) - new Date(b));
      const data = labels.map(label => countsByDate[label]);
      if (chart) chart.destroy();
      const ctx = document.getElementById('clicks-chart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: graphMode === 'clicks' ? 'Clicks' : 'Earnings ($)',
            data,
            borderColor: graphMode === 'clicks' ? '#2c3e50' : '#f39c12',
            backgroundColor: graphMode === 'clicks' ? 'rgba(44, 62, 80, 0.1)' : 'rgba(243, 156, 18, 0.1)',
            fill: true,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Date' }},
            y: { title: { display: true, text: graphMode === 'clicks' ? 'Clicks' : 'Earnings ($)' }, beginAtZero: true }
          }
        }
      });
    }

    function renderSalesPage(sales) {
      const salesList = document.getElementById('sales-list');
      salesList.innerHTML = '';
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const currentItems = sales.slice(start, end);
      if (currentItems.length === 0) {
        salesList.innerHTML = '<tr><td colspan="4">No sales data available.</td></tr>';
        return;
      }
      currentItems.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${sale.orderId || 'N/A'}</td>
          <td>${sale.amount ? `$${sale.amount.toFixed(2)}` : 'N/A'}</td>
          <td>${sale.amount ? `$${(sale.amount * 0.30).toFixed(2)}` : '$0.00'}</td>
          <td>${sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'}</td>
        `;
        salesList.appendChild(row);
      });
      renderPagination(sales.length);
    }

    function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const container = document.getElementById('sales-pagination');
  container.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '< Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderSalesPage(affiliateData.sales);
    }
  };

  const pageInfo = document.createElement('span');
  pageInfo.style.margin = '0 10px';
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next >';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderSalesPage(affiliateData.sales);
    }
  };

  container.appendChild(prevBtn);
  container.appendChild(pageInfo);
  container.appendChild(nextBtn);
}


    async function fetchAffiliateData(email = '') {
      try {
        const res = await fetch(`http://localhost:3000/api/affiliate-by-email?email=${email}`);
        const data = await res.json();
        affiliateData = {
          clicks: Array.isArray(data.clicks) ? data.clicks : [],
          sales: Array.isArray(data.sales) ? data.sales : []
        };
document.getElementById('click-count').textContent = affiliateData.clicks.length;
document.getElementById('sale-count').textContent = affiliateData.sales.length;

const totalEarnings = affiliateData.sales.reduce((sum, sale) => {
  return sum + ((sale.amount || 0) * 0.30);
}, 0);
document.getElementById('total-earnings').textContent = `$${totalEarnings.toFixed(2)}`;

        renderSalesPage(affiliateData.sales);
        filterClicks('year');
      } catch (err) {
        console.error("Error fetching affiliate data:", err);
      }
    }


  </script>

</body>
</html>
