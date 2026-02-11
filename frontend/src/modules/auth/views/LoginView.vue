<template>
  <div class="flex flex-col items-center gap-5 max-w-2xl w-full mx-auto p-5 bg-white rounded-lg">
    <h1 class="text-4xl font-bold">LoginView</h1>
    <form class="w-full space-y-3">
      <fieldset class="flex flex-col gap-1">
        <label for="email" class="text-lg">Email:</label>
        <input type="email" id="email" class="border p-2 rounded" />
      </fieldset>

      <fieldset class="flex flex-col gap-1">
        <label for="password" class="text-lg">Password:</label>
        <input type="password" id="password" class="border p-2 rounded" />
      </fieldset>

      <button
        type="submit"
        class="w-full text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        @click.prevent=""
      >
        Login
      </button>
    </form>
  </div>
</template>
