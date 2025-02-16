<script lang="ts">
  import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
  import { UserSolid, CogOutline, WalletOutline, ArrowLeftToBracketOutline } from 'flowbite-svelte-icons';
  import { clickOutside } from '$lib/actions/click-outside';
  
  let userDropdownOpen = false;

  function handleClickOutside() {
    userDropdownOpen = false;
  }
</script>

<div use:clickOutside={handleClickOutside}>
  <button
    on:click={() => userDropdownOpen = !userDropdownOpen}
    class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    type="button"
  >
    <div class="flex items-center gap-2">
      <img
        class="h-8 w-8 rounded-full"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt=""
        aria-hidden="true"
      />
      <div class="font-medium hidden md:block">
        <div>John Doe</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Admin</div>
      </div>
    </div>
  </button>

  <Dropdown
    bind:open={userDropdownOpen}
    class="z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
    placement="bottom"
  >
    <DropdownHeader>
      <span class="block text-sm">John Doe</span>
      <span class="block truncate text-sm font-medium">john@example.com</span>
    </DropdownHeader>
    <DropdownItem><UserSolid class="me-2 h-4 w-4" />Profile</DropdownItem>
    <DropdownItem><CogOutline class="me-2 h-4 w-4" />Settings</DropdownItem>
    <DropdownItem><WalletOutline class="me-2 h-4 w-4" />Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem><ArrowLeftToBracketOutline class="me-2 h-4 w-4" />Sign out</DropdownItem>
  </Dropdown>
</div>