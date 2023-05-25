<template>
    <div>
        <input-component @change="emailVal" name="Email"></input-component>
        <div class="tip" ref="emailTip">{{ emailTip }}</div>
    </div>
</template>

<script>
import input from '@/common/input'
import check from './js/check.js'
import './css/tip.css'
export default {
    components: {
        "input-component": input
    },
    data() {
        return {
            emailTip: '',
        }
    },
    methods: {
        emailVal(value) {
            const reg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
            const result = reg.test(value)
            check.call(this, {
                name: 'emailTip',
                result
            }, () => {
                this.$emit('value', value)
            })
        }
    }
};
</script>