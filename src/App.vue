<script setup>
import { ref } from "vue";

const response = ref("");
const postName = () =>
    fetch("/api/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "John Doe" }),
    })
        .then((res) => res.text())
        .then((data) => (response.value = data));

const postDelete = () =>
    fetch("/api/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-mock-enabled": "true",
        },
        body: JSON.stringify({ name: "John Doe", age: 12 }),
    })
        .then((res) => res.text())
        .then((data) => (response.value = data));
</script>

<template>
    <div>
        <button @click="postName">post httpbin</button>
        <button @click="postDelete">delete apifox</button>
        <div class="response">{{ response }}</div>
    </div>
</template>

<style scoped>
.response {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    min-height: 100px;
    border-radius: 5px;
}
</style>
