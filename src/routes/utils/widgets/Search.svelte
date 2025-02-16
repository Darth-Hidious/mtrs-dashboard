<!-- Search component -->
<script>
  import { onMount } from 'svelte';
  import searchData from '../../data/search-data.json';
  
  let isSearchVisible = false;
  let searchInput;
  let isMac = false;
  let searchQuery = '';
  let filteredResults = [];
  let selectedIndex = -1;
  let isDropdownVisible = false;

  $: {
    if (searchQuery) {
      filteredResults = searchData.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      isDropdownVisible = true;
    } else {
      filteredResults = [];
      isDropdownVisible = false;
    }
    selectedIndex = -1;
  }

  onMount(() => {
    isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  function handleKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      searchInput?.focus();
    }
    if (!isDropdownVisible && !searchQuery) return;

    switch (event.key) {
      case 'Escape':
        searchQuery = '';
        isDropdownVisible = false;
        searchInput?.blur();
        break;
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, filteredResults.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
          event.preventDefault();
          navigateToResult(filteredResults[selectedIndex]);
        }
        break;
    }
  }

  function navigateToResult(result) {
    window.location.href = result.url;
    searchQuery = '';
    isDropdownVisible = false;
  }

  function closeSearch() {
    searchQuery = '';
    isDropdownVisible = false;
    searchInput?.blur();
  }
</script>

<div class="relative w-72 md:w-80">
  <form class="relative" on:submit|preventDefault>
    <input
      bind:this={searchInput}
      bind:value={searchQuery}
      type="search"
      class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pr-16 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500"
      placeholder="Search... ({isMac ? '⌘+K' : 'Ctrl+K'})"
    />
    <div class="absolute bottom-1 right-2 flex items-center gap-2">
      {#if searchQuery}
        <button 
          type="button"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          on:click={closeSearch}
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      {/if}
      <kbd class="hidden rounded bg-gray-100 px-1.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:inline">
        {isMac ? '⌘+K' : 'Ctrl+K'}
      </kbd>
    </div>
  </form>

  {#if isDropdownVisible && filteredResults.length > 0}
    <div class="absolute left-0 right-0 top-12 rounded-lg bg-white shadow-xl dark:bg-gray-800">
      <div class="max-h-80 overflow-y-auto border-t border-gray-200 dark:border-gray-600">
        {#each filteredResults as result, i}
          <button
            on:click={() => navigateToResult(result)}
            class="w-full px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700
            {selectedIndex === i ? 'bg-gray-100 dark:bg-gray-700' : ''}"
          >
            <div class="flex items-center">
              <span class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {#if result.category === 'dashboard'}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                  {:else if result.category === 'users'}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  {/if}
                </svg>
              </span>
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">{result.title}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{result.description}</div>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>
  {:else if searchQuery}
    <div class="absolute left-0 right-0 top-12 rounded-lg bg-white p-4 text-center text-sm text-gray-500 shadow-xl dark:bg-gray-800 dark:text-gray-400">
      No results found for "{searchQuery}"
    </div>
  {/if}
</div>

<style>
  /* Add a fade-in animation */
  input {
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>