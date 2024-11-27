<template>
    <div class="container mx-auto py-8">
      <h1 class="text-heading font-gilroy text-primary">Contact Us</h1>
      <form class="space-y-4 mt-8">
        <input
          type="text"
          placeholder="Your Name"
          class="w-full px-4 py-2 border border-secondary rounded-custom focus:outline-primary"
        />
        <input
          type="email"
          placeholder="Your Email"
          class="w-full px-4 py-2 border border-secondary rounded-custom focus:outline-primary"
        />
        <textarea
          placeholder="Your Message"
          class="w-full px-4 py-2 border border-secondary rounded-custom focus:outline-primary"
          rows="4"
        ></textarea>
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-custom hover:bg-secondary"
        >
          Send
        </button>
      </form>
    </div>
  </template>
  