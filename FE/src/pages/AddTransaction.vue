<template>
    <div class="p-6">
        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2 col-span-3 bg-blue-100 p-4 rounded-lg">
                <section class="flex flex-col items-center justify-center">
                    
                    <h2 class="text-4xl font-bold dark:text-white">Thêm giao dịch</h2>

                    <div class="w-full max-w-md my-2">
                        <label for="email-address-icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập số tiền</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M7.42584 18.2443c1.3169-2.2023 2.5334-1.5242 3.85026-3.7265 1.3169-2.2023.1004-2.8805 1.4173-5.08281 1.3169-2.20233 2.5335-1.52419 3.8504-3.72652M10.8472 20.1517c1.3169-2.2024 2.5334-1.5242 3.8503-3.7266 1.3169-2.2023.1004-2.8804 1.4173-5.0828 1.3169-2.20228 2.5334-1.52414 3.8503-3.72647l-6.8428-3.81455C11.8054 6.00361 10.5889 5.32547 9.272 7.5278s-.1004 2.8805-1.4173 5.0828c-1.3169 2.2023-2.5334 1.5242-3.85031 3.7265l6.84281 3.8146Z"/>
                            </svg>
                            </div>
                            <input type="text" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số tiền...">
                        </div>
                    </div>
                    <div class="w-full max-w-md my-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Danh mục</label>
                        <div class="flex">
                            <button id="states-button" data-dropdown-toggle="dropdown-states" class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                <span v-if="categoriesType === 'expense'">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                                    </svg>
                                </span>
                                <span v-else>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
                                    </svg>
                                </span>
                                {{ categoriesType === 'expense' ? 'Chi tiêu' : 'Thu nhập' }}
                                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <div id="dropdown-states" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                                    <li>
                                        <button 
                                        @click="categoriesType = 'expense'"
                                        type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <div class="inline-flex items-center">
                                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                                                </svg>
                                                Chi tiêu
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                        @click="categoriesType = 'income'"
                                        type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <div class="inline-flex items-center">
                                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
                                                </svg>
                                                Thu nhập
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <label for="states" class="sr-only">Choose a state</label>
                            <select id="states" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>--Chọn danh mục--</option>
                                <option v-for="category in list" value="">{{ category.name }}</option>
                            </select>
                        </div>
                        
                        <div class="w-full my-1 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                            <div class="bg-orange-600 h-1 rounded-full" style="width: 45%"></div>
                            <p class="text-xs italic text-slate-800 text-right">danh mục đạt 45%</p>
                        </div>

                    </div>
                    <div class="w-full max-w-md my-2">
                        <label for="transaction-datepicker" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày giao dịch</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input datepicker id="transaction-datepicker" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                        </div>

                    </div>
                    <div class="w-full max-w-md my-2">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Thêm ghi chú...."></textarea>
                    </div>
                    <button 
                    class="w-full max-w-md bg-green-500 text-white py-2 mt-4 shadow-md rounded-md
                    hover:bg-green-600 cursor-pointer">Xác nhận</button>
                </section>
            </div>
            <div class="lg:block col-span-1 hidden bg-green-100 p-4 rounded-lg">
                <Selection />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { initFlowbite } from 'flowbite';
    import { onMounted, nextTick, ref, computed } from 'vue';
    import Selection from '../components/Selection.vue';

    const categoriesType = ref('expense');
    const data = {
        'expense': [
            { name: 'Mua sắm', budget: 1000000 },
            { name: 'Ăn uống', budget: 500000 },
            { name: 'Vui chơi', budget: 300000 },
            { name: 'Xe cộ', budget: 200000 },
            { name: 'Nhà cửa', budget: 1500000 },
        ],
        'income': [
            { name: 'Lương'},
            { name: 'Thưởng'},
            { name: 'Kinh doanh'},
            { name: 'Đầu tư'},
            { name: 'Khác'},
        ]
    }
    const list = computed(() => {
        return data[categoriesType.value];
    });


    onMounted(() => {
        nextTick(() => {
            initFlowbite();
        });


    });
</script>

<style lang="css" scoped>

</style>