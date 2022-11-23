<template>
<h1>Isotype</h1>

<div class="isotypeBody">
    <div class="isotypeBodyLeft">
        <div v-for="index of isotypeDataLeft[0].nums.length" :key="index" class="isotypeBodySection isotypeBodySectionLeft">
            <div v-for="num_index of isotypeDataLeft.length" :key="num_index" class="isotypeBodyItem isotypeBodyItemLeft">
                <IsotypeRow :img-src="isotypeDataLeft[num_index-1].url" :img-num="isotypeDataLeft[num_index-1].nums[index-1]" :devide-num="holdDevideNum" :resize-width="resizeWidth" :height-gap="heightGap" :width-gap="widthGap" :row-direction='leftDirection' />
            </div>
        </div>
    </div>
    <div class="isotypeBodyRight">
        <div v-for="index of isotypeData[0].nums.length" :key="index" class="isotypeBodySection isotypeBodySectionRight">
            <div v-for="num_index of isotypeData.length" :key="num_index" class="isotypeBodyItem isotypeBodyItemRight">
                <IsotypeRow :img-src="isotypeData[num_index-1].url" :img-num="isotypeData[num_index-1].nums[index-1]" :devide-num="holdDevideNum" :resize-width="resizeWidth" :height-gap="heightGap" :width-gap="widthGap" />
            </div>
        </div>
    </div>
</div>

<div class="tables">
    <div>
        <table>
            <tbody>
                <tr>
                    <td v-for="index of isotypeDataLeft.length" :key="index"><input v-model="isotypeDataLeft[index-1].name"></td>
                </tr>
                <tr>
                    <td v-for="index of isotypeDataLeft.length" :key="index"><input v-model="isotypeDataLeft[index-1].url"></td>
                </tr>
                <tr v-for="index of isotypeDataLeft[0].nums.length" :key="index">
                    <td v-for="num_index of isotypeDataLeft.length" :key="num_index">
                        <input v-model="isotypeDataLeft[num_index-1].nums[index-1]">
                    </td>
                    <td><button v-on:click="remDataNumsRow(isotypeDataLeft, index-1)">Remove Row</button></td>
                </tr>
                <tr>
                    <td v-for="index of isotypeDataLeft.length" :key="index">
                        <button v-on:click="remDataNumsColumn(isotypeDataLeft, index-1)">Remove Column</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button v-on:click="addDataRow(isotypeDataLeft)">Add Row</button>
        <button v-on:click="addDataCol(isotypeDataLeft)">Add Column</button>
    </div>

    <div>
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
                    <td><button v-on:click="remDataNumsRow(isotypeData, index-1)">Remove Row</button></td>
                </tr>
                <tr>
                    <td v-for="index of isotypeData.length" :key="index">
                        <button v-on:click="remDataNumsColumn(isotypeData, index-1)">Remove Column</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button v-on:click="addDataRow(isotypeData)">Add Row</button>
        <button v-on:click="addDataCol(isotypeData)">Add Column</button>
    </div>

</div>

<!-- <button v-on:click="addTableRow">Add Row</button> -->

<div>
    <div>devide number: <input v-model=" devideNum" type="text" oninput="value = value.replace(/[^0-9]+/i,'');"></div>
    <div>resize width(px): <input v-model="resizeWidth" type="text" maxlength="5" oninput="value = value.replace(/[^0-9]+/i,'');"></div>
    <div>width gap: <input v-model="widthGap" type="text" maxlesngth="5" oninput="value = value.replace(/[^0-9-]+/i,'');"></div>
    <div>height gap: <input v-model="heightGap" type="text" maxlength="5" oninput="value = value.replace(/[^0-9-]+/i,'');"></div>
    <div>group width gap: <input v-model="groupWidthGap" type="text" maxlesngth="5" oninput="value = value.replace(/[^0-9-]+/i,'');"></div>
    <div>group height gap: <input v-model="groupHeightGap" type="text" maxlength="5" oninput="value = value.replace(/[^0-9-]+/i,'');"></div>
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
        const holdDevideNum = ref < number > (2)
        const resizeWidth = ref < number > (50)
        const heightGap = ref < number > (0)
        const widthGap = ref < number > (0)
        const groupHeightGap = ref < number > (0)
        const groupWidthGap = ref < number > (0)

        const demoUrlVue = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
        const demoUrlAngular = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/500px-Angular_full_color_logo.svg.png"
        const demoUrlReact = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"

        const leftDirection = "L"

        watch(devideNum, () => {
            if (devideNum.value > 0) {
                holdDevideNum.value = devideNum.value
            }
        })

        // isotype data のtemplateを作成する
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
        const isotypeDataLeft = ref([{
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

        const addDataRow = (isoData) => {
            for (let data of isoData) {
                data.nums.push(1)
            }
        }

        const addDataCol = (isoData) => {
            let sampleNums = []
            for (let n of isoData[0].nums) {
                sampleNums.push(1)
            }

            const sampleData = {
                name: "Vue",
                url: demoUrlVue,
                nums: sampleNums,
            }
            isoData.push(sampleData)
        }

        const remDataNumsRow = (isoData, index: number) => {
            for (let data of isoData) {
                data.nums.splice(index, 1)
            }
        }

        const remDataNumsColumn = (isoData, index: number) => {
            isoData.splice(index, 1)
        }

        const addPx = (number:number) => {
            return number + "px"
        }

        return {
            holdDevideNum,
            devideNum,
            resizeWidth,
            widthGap,
            heightGap,
            groupHeightGap,
            groupWidthGap,
            isotypeData,
            isotypeDataLeft,
            leftDirection,
            addDataRow,
            addDataCol,
            remDataNumsRow,
            remDataNumsColumn,
            addPx,
        }
    }
})
</script>

<style lang="scss" scoped>
.isotypeBody {
    display: flex;
    flex-direction: row;
}


.isotypeBodySection {
    display: flex;
    margin-bottom: v-bind(addPx(groupHeightGap));
}
.isotypeBodytSectionRigh {
    flex-direction: row;
}

.isotypeBodySectionLeft {
    flex-direction: row-reverse;
}

.isotypeBodyItemRight {
    margin-right: v-bind(addPx(groupWidthGap));
}

.isotypeBodyItemLeft {
    margin-left: v-bind(addPx(groupWidthGap));
}

.tables {
    display: flex;
    flex-direction: row;
}
</style>
