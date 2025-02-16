<script lang="ts">
  import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
  import { ViewGridAddOutline } from 'flowbite-svelte-icons';
  import { clickOutside } from '$lib/actions/click-outside';
  
  let appsDropdownOpen = false;

  function handleClickOutside() {
    appsDropdownOpen = false;
  }

  const apps = [
    {
      name: 'Dashboard',
      description: 'Data analytics and reporting',
      href: '/dashboard'
    },
    {
      name: 'Settings',
      description: 'Configure your preferences',
      href: '/settings'
    },
    {
      name: 'Users',
      description: 'Manage user accounts',
      href: '/crud/users'
    },
    {
      name: 'Products',
      description: 'View and manage products',
      href: '/crud/products'
    }
  ];
</script>

<div use:clickOutside={handleClickOutside}>
  <button
    type="button"
    on:click={() => appsDropdownOpen = !appsDropdownOpen}
    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    <ViewGridAddOutline class="h-6 w-6" />
  </button>

  <Dropdown
    bind:open={appsDropdownOpen}
    class="z-50 my-4 max-w-sm rounded-lg bg-white text-base shadow dark:bg-gray-700"
    placement="bottom"
  >
    <div class="block rounded-t-lg border-b bg-gray-50 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
      <DropdownHeader>
        <span class="text-sm font-medium text-gray-900 dark:text-white">Quick Access</span>
      </DropdownHeader>
    </div>
    <div class="grid grid-cols-2 gap-4 p-4">
      {#each apps as app}
        <a
          href={app.href}
          class="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <div class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{app.name}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{app.description}</div>
        </a>
      {/each}
    </div>
  </Dropdown>
</div>