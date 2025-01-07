<template>
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          @click.prevent="goToPreviousPage"
        >
          Previous
        </a>
        <a
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          @click.prevent="goToNextPage"  
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ startIndex }}</span>
            to
            <span class="font-medium">{{ endIndex }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :class="{'opacity-50 pointer-events-none': isFirstPage}"
              @click.prevent="goToPreviousPage"
            >
              <span class="sr-only">Previous</span>
              <!-- Heroicon name: chevron-left -->
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </a>
            
            <template v-for="pageNumber in displayedPages" :key="pageNumber">
              <a
                v-if="pageNumber === currentPage"  
                href="#"
                aria-current="page"
                class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                {{ pageNumber }}
              </a>
              <a
                v-else
                href="#"
                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                @click.prevent="goToPage(pageNumber)"  
              >
                {{ pageNumber }}
              </a>
            </template>
            
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :class="{'opacity-50 pointer-events-none': isLastPage}"
              @click.prevent="goToNextPage"
            >
              <span class="sr-only">Next</span>
              <!-- Heroicon name: chevron-right -->
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true  
      },
      totalItems: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        default: 10
      },
      maxVisiblePages: {
        type: Number,  
        default: 5
      }
    },
    emits: ['changePage'],
    setup(props, { emit }) {
      const isFirstPage = computed(() => props.currentPage === 1);
      const isLastPage = computed(() => props.currentPage === props.totalPages);
      
      const startIndex = computed(() => (props.currentPage - 1) * props.pageSize + 1);
      const endIndex = computed(() => Math.min(startIndex.value + props.pageSize - 1, props.totalItems));
      
      const displayedPages = computed(() => {
        let startPage, endPage;
        
        if (props.totalPages <= props.maxVisiblePages) {
          startPage = 1;
          endPage = props.totalPages;
        } 
        else {
          const maxPagesBeforeCurrentPage = Math.floor(props.maxVisiblePages / 2);
          const maxPagesAfterCurrentPage = Math.ceil(props.maxVisiblePages / 2) - 1;
          
          if (props.currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = props.maxVisiblePages;
          }
          else if (props.currentPage + maxPagesAfterCurrentPage >= props.totalPages) {
            startPage = props.totalPages - props.maxVisiblePages + 1;
            endPage = props.totalPages; 
          } 
          else {
            startPage = props.currentPage - maxPagesBeforeCurrentPage;
            endPage = props.currentPage + maxPagesAfterCurrentPage;
          }
        }
        
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        return pages;
      });
      
      const goToPreviousPage = () => {
        if (!isFirstPage.value) {
          emit('changePage', props.currentPage - 1);  
        }
      };
      
      const goToNextPage = () => {
        if (!isLastPage.value) {
          emit('changePage', props.currentPage + 1);
        }  
      };
      
      const goToPage = (page: number) => {
        emit('changePage', page);  
      };
      
      return {
        isFirstPage,
        isLastPage,
        startIndex,
        endIndex,
        displayedPages,
        goToPreviousPage,
        goToNextPage,
        goToPage
      };
    }
  });
  </script>