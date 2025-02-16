<script lang="ts">
  import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
  import { BellRingOutline } from 'flowbite-svelte-icons';
  import { clickOutside } from '$lib/actions/click-outside';
  
  let notificationDropdownOpen = false;
  
  function handleClickOutside() {
    notificationDropdownOpen = false;
  }
  
  const notifications = [
    {
      title: 'New user registered',
      time: '2 hours ago',
      read: false
    },
    {
      title: 'Product update available',
      time: '4 hours ago',
      read: true
    },
    {
      title: 'Server maintenance scheduled',
      time: '1 day ago',
      read: true
    }
  ];
</script>

<div use:clickOutside={handleClickOutside}>
  <button
    type="button"
    on:click={() => notificationDropdownOpen = !notificationDropdownOpen}
    class="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    <BellRingOutline class="h-6 w-6" />
    {#if notifications.some(n => !n.read)}
      <div class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-gray-900"></div>
    {/if}
  </button>

  <Dropdown
    bind:open={notificationDropdownOpen}
    class="z-50 my-4 max-w-sm rounded-lg bg-white text-base shadow dark:bg-gray-700"
    placement="bottom"
  >
    <div class="block rounded-t-lg border-b bg-gray-50 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
      <DropdownHeader>
        <span class="text-sm font-medium text-gray-900 dark:text-white">Notifications</span>
      </DropdownHeader>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-gray-600">
      {#each notifications as notification}
        <div class="flex px-4 py-3">
          <div class="w-full pl-3">
            <div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">{notification.title}</span>
            </div>
            <div class="text-xs text-blue-600 dark:text-blue-500">{notification.time}</div>
          </div>
          {#if !notification.read}
            <span class="ms-2 mt-2 h-2 w-2 rounded-full bg-blue-500"></span>
          {/if}
        </div>
      {/each}
    </div>
    <a
      href="/notifications"
      class="block rounded-b-lg bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      <div class="inline-flex items-center">
        View all
      </div>
    </a>
  </Dropdown>
</div>