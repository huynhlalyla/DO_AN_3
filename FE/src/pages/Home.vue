<template>
  <div>
    
    <h1 class="text-5xl font-extrabold text-slate-500 dark:text-slate-700 lg:my-4">Giao dịch<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">Trong hôm nay</small></h1>
    <div class="w-full h-full flex lg:flex-row flex-col lg:gap-4 gap-2 lg:items-start items-center dark:bg-slate-400">
      <div class="max-w-sm w-full bg-white rounded-lg dark:bg-transparent dark:text-white p-4 md:p-6">
        <!-- Line Chart -->
        <div class="py-6 text-white max-h-80" id="pie-chart"></div>
      </div>

      <div 
      class="relative overflow-x-auto  sm:rounded-lg lg:rounded flex-1
      max-h-80 custom-bar w-full">
          <table class="w-full text-sm text-left rtl:text-right">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-600 dark:text-slate-50">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Mô tả
                      </th>
                      <th scope="col" class="px-6 py-3">
                          loại
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Danh mục
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Chi phí
                      </th>
                      <th scope="col" class="px-6 py-3">
                          <span class="sr-only">Sửa</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="transaction in transactionsData" :key="transaction.date"  
                  class="bg-white border-b dark:text-slate-100 dark:bg-transparent dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {{ transaction.description }}
                      </th>
                      <td class="px-6 py-4">
                          <span 
                          :class="{
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-slate-50': transaction.type === 'expense',
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': transaction.type === 'income'
                          }"
                          class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium 
                          ">
                              {{ transaction.type }}
                          </span>
                      </td>
                      <td class="px-6 py-4">
                          {{ transaction.category }}
                      </td>
                      <td class="px-6 py-4">
                          {{ transaction.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                      </td>
                      <td class="px-6 py-4 text-right">
                          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>



    </div>
  </div>


</template>

<script setup>
import {  onMounted, 
          ref 
        }                       from   'vue';
import ApexCharts               from   'apexcharts';


const transactionsData          =       ref([]);
onMounted(() => {
  //giả bộ dữ liệu giao dịch
  transactionsData.value        =       [
    { type: "expense", amount: 100000, date: "2025-27-5", description: "Mua sắm", category: "Shopping" },
    { type: "income", amount: 200000, date: "2025-28-5", description: "Lương tháng 5", category: "Salary" },
    { type: "expense", amount: 50000, date: "2025-29-5", description: "Ăn uống", category: "Food" },
    { type: "income", amount: 150000, date: "2025-30-5", description: "Tiền thưởng", category: "Bonus" },
    { type: "expense", amount: 30000, date: "2025-31-5", description: "Đi lại", category: "Transport" },
    { type: "income", amount: 120000, date: "2025-01-6", description: "Lương tháng 6", category: "Salary" },
    { type: "expense", amount: 80000, date: "2025-02-6", description: "Giải trí", category: "Entertainment" },
  ]


  const countExpense            =       transactionsData.value.reduce((total, transaction) => {
    return transaction.type     ===     "expense" ? total + 1 : total;
  }, 0);
  const countIncome             =       transactionsData.value.reduce((total, transaction) => {
    return transaction.type     ===     "income" ? total + 1 : total;
  }, 0);

const getChartOptions           =       () => {
  return {
    series: [countExpense, countIncome],
    colors: ["#1C64F2", "#16BDCA"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25
        }
      },
    },
    labels: ["Chi tiêu", "Thu nhập"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "right",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  }
}

if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
  const chart                   =       new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
  chart.render();
}

});
</script>

<style lang="css" scoped>
  /* thanh sidebar tuỳ chỉnh */
  .custom-bar::-webkit-scrollbar {
        width: 2px;
  }
  .custom-bar::-webkit-scrollbar-thumb {
      background-color: #5b5959;
      border-radius: 5px;
  }
  .custom-bar::-webkit-scrollbar-thumb:hover {
      background-color: #5b5959;
  }
</style>