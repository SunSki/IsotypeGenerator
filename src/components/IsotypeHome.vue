<template>
<h1>Isotype</h1>

<div v-for="index of isotypeData[0].nums.length" :key="index" class="isotypeBody">
    <div v-for="num_index of isotypeData.length" :key="num_index">
        <IsotypeRow :img-src="isotypeData[num_index-1].url" :img-num="isotypeData[num_index-1].nums[index-1]" :devide-num="holdDevideNum" :resize-width="resizeWidth" :height-gap="heightGap" :width-gap="widthGap" />
    </div>
</div>

<table>
    <tbody>
        <tr>
            <td v-for="index of isotypeData.length" :key="index"><input v-model="isotypeData[index-1].name"></td>
        </tr>
        <tr>
            <td v-for="index of isotypeData.length" :key="index"><input v-model="isotypeData[index-1].url"></td>
        </tr>
        <tr v-for="index of isotypeData[0].nums.length" :key="index">
            <td v-for="num_index of isotypeData.length" :key="num_index">
                <input v-model="isotypeData[num_index-1].nums[index-1]">
            </td>
            <td><button v-on:click="remDataNumsRow(index-1)">Remove Row</button></td>
        </tr>
        <tr>
            <td v-for="index of isotypeData.length" :key="index">
                <button v-on:click="remDataNumsColumn(index-1)">Remove Column</button>
            </td>
        </tr>
    </tbody>
</table>

<button v-on:click="addDataRow">Add Row</button>
<button v-on:click="addDataCol">Add Column</button>
<!-- <button v-on:click="addTableRow">Add Row</button> -->

<div>
    <div>devide number: <input v-model=" devideNum" type="text" oninput="value = value.replace(/[^0-9]+/i,'');"></div>
    <div>resize width(px): <input v-model="resizeWidth" type="text" maxlength="5" oninput="value = value.replace(/[^0-9]+/i,'');"></div>
    <div>width gap: <input v-model="widthGap" type="text" maxlesngth="5" oninput="value = value.replace(/[^0-9-]+/i,'');"></div>
    <div>height gap: <input v-model="heightGap" type="text" maxlength="5" oninput="value = value.replace(/[^0-9-]+/i,'');"></div>
</div>
</template>

<script lang="ts">
import IsotypeRow from "@/components/IsotypeRow.vue"

import {
    defineComponent,
    ref,
    watch
} from 'vue';

export default defineComponent({
    components: {
        IsotypeRow,
    },
    setup() {
        const devideNum = ref < number > (2)
        const holdDevideNum = ref <number> (2)
        const resizeWidth = ref < number > (50)
        const heightGap = ref < number > (0)
        const widthGap = ref < number > (0)

        const demoUrlVue = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
        const demoUrlAngular = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/500px-Angular_full_color_logo.svg.png"
        const demoUrlReact = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"

        watch(devideNum, () => {
            if (devideNum.value > 0){
                holdDevideNum.value = devideNum.value
            }
        })

        const isotypeData = ref([{
                name: "Vue",
                url: demoUrlVue,
                nums: [2, 5, 10],
            },
            {
                name: "Angular",
                url: demoUrlAngular,
                nums: [1, 3, 5],
            },
            {
                name: "React",
                url: demoUrlReact,
                nums: [5, 10, 15],
            }
        ])

        // const addTableRow

        // const addTableRow = () => {
        //     isotypeData.value.push({
        //         url: '',
        //         num: 0,
        //     })
        // }

        // const remTableRow = (index: number) => {
        //     isotypeData.value.splice(index, 1)
        // }

        const addDataRow = () => {
            for (let data of isotypeData.value) {
                data.nums.push(1)
            }
        }

        const addDataCol = () => {
            let sampleNums = []
            for (let n of isotypeData.value[0].nums) {
                sampleNums.push(1)
            }

            const sampleData = {
                name: "Vue",
                url: demoUrlVue,
                nums: sampleNums,
            }
            isotypeData.value.push(sampleData)
        }

        const remDataNumsRow = (index: number) => {
            for (let data of isotypeData.value) {
                data.nums.splice(index, 1)
            }
        }

        const remDataNumsColumn = (index: number) => {
            isotypeData.value.splice(index, 1)
        }

        return {
            holdDevideNum,
            devideNum,
            resizeWidth,
            widthGap,
            heightGap,
            isotypeData,
            addDataRow,
            addDataCol,
            remDataNumsRow,
            remDataNumsColumn,
            // addTableRow,
            // remTableRow,
        }
    }
})
</script>

<style lang="scss">
.isotypeBody {
    display: flex;
    flex-direction: row;
}
</style>
