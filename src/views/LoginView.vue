<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
        <form v-if="!waitingOnVerification" action="#" @submit.prevent="handleLogin">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-model="credentials.phone" v-maska data-maska="62 ###-####-####" name="phone" id="phone" placeholder="62 8x-xxxx-xxxx" class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none"/>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @submit.prevent="handleLogin" type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Continue</button>
                </div>
            </div>
        </form>
        <form v-else action="#" @submit.prevent="handleVerification">
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <input type="text" v-model="credentials.login_code" v-maska data-maska="######" name="login_code" id="login_code" placeholder="123456" class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none"/>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @submit.prevent="handleVerification" type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">Verify</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from "axios";
import { vMaska } from "maska/vue"
import { computed, onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router";

const router = useRouter()

const credentials = reactive({
    phone: null,
})

const waitingOnVerification = ref(false)

onMounted(() => {
    if (localStorage.getItem('token')) {
        router.push({
            name: 'landing'
        })
    }
})

const getFormattedCredentials = () => {
    return {
        phone: credentials.phone.replaceAll('-', '').replaceAll(' ',''),
        login_code: credentials.login_code
    }
}

const handleLogin = () => {
    axios.post('http://localhost:8000/api/login', getFormattedCredentials())
        .then(response => {
            console.log(response.data)
            waitingOnVerification.value = true
        })
        .catch(error => {
            console.log(error)
            alert(error.response.data.message)
        })
}

const handleVerification = () => {
    axios.post('http://localhost:8000/api/login/verify', getFormattedCredentials())
        .then(response => {
            console.log(response.data) //auth token
            localStorage.setItem('token', response.data)
            router.push({ 
                name: 'landing' 
            })
        })
        .catch(error => {
            console.log(error)
            alert(error.response.data.message)
        })
}
</script>

<style lang="scss" scoped>

</style>