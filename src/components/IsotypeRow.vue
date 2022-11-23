<template>
<div v-if="Number(imgNum) < imgNumLimit && Number(imgNum) > 0" class="imglist">
    <div v-for="i of Math.ceil(imgNum/devideNum)" :key="i" class="imglist-item">
        <div style="display: flex; flex-direction: column;">
            <div v-for="l of Number(devideNum)" :key="l" class="img-item">
                <div v-if="(Number(devideNum)*(i-1) + l) < Math.ceil(imgNum)">
                    <img :src="imgSrc" class="scaleImg">
                </div>
                <div v-else-if="(Number(devideNum)*(i-1) + l) == Math.ceil(imgNum)">
                    <img v-if="compScaleDecimal()==0" :src="imgSrc" class="scaleImg">
                    <img v-else :src="imgSrc" class="scaleImgCrop">
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
} from 'vue';

export default defineComponent({
    props: {
        imgSrc: {
            type: String,
            required: false,
            default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
        },
        imgNum: {
            type: Number,
            required: false,
            default: 10
        },
        devideNum: {
            type: Number,
            required: false,
            default: 2,
        },
        resizeWidth: {
            type: Number,
            required: false,
            default: 50,
        },
        heightGap: {
            type: Number,
            required: false,
            default: 0,
        },
        widthGap: {
            type: Number,
            required: false,
            default: 0,
        },
        rowDirection: {
            type: String,
            required: false,
            default: 'R',
        },
    },
    setup(props) {
        const imgWidth = ref < number > (0)
        const imgHeight = ref < number > (0)

        const imgNumLimit = 50

        onMounted(() => {
            getImgInfo()
        })

        const getImgInfo = () => {
            const img = new Image
            img.src = props.imgSrc
            img.onload = () => {
                imgWidth.value = img.width
                imgHeight.value = img.height
                console.log(img.width, img.height)
            }
        }

        const compScaleDecimal = () => {
            return Number(props.imgNum) - Math.floor(props.imgNum)
        }

        const compRowDirection = () => {
            if (props.rowDirection == "R") {
                return "row"
            } else if (props.rowDirection == "L") {
                return "row-reverse"
            } else {
                console.log("ERROR: row direction must be 'R' or 'L'")
                return "row"
            }
        }

        const compItemAlign = () => {
            if (props.rowDirection == "R") {
                return "left"
            } else if (props.rowDirection == "L") {
                return "right"
            } else {
                console.log("ERROR: row direction must be 'R' or 'L'")
                return "left"
            }
        }

        const compCropPosition = () => {
            if (props.rowDirection == "R") {
                return "0 100%"
            } else if (props.rowDirection == "L") {
                return "100% 100%"
            } else {
                console.log("ERROR: row direction must be 'R' or 'L'")
                return "0 100%"
            }
        }

        const resizeImgWidth = () => {
            return (addPx(Number(props.resizeWidth)))
        }
        const resizeImgHeight = () => {
            return (addPx(Number(props.resizeWidth) * imgHeight.value / imgWidth.value))
        }
        const resizeImgCropWidth = () => {
            return (addPx(Number(props.resizeWidth) * compScaleDecimal()))
        }
        const addPx = (number:number) => {
            return number + "px"
        }

        return {
            imgNumLimit,
            compScaleDecimal,
            compRowDirection,
            compItemAlign,
            compCropPosition,
            resizeImgWidth,
            resizeImgHeight,
            resizeImgCropWidth,
            addPx,
        }
    }

})
</script>

<style lang="scss">
.imglist {
    display: flex;
    flex-direction: v-bind(compRowDirection());
}

.imglist-item {
    margin-right: v-bind(addPx(widthGap));
}

.img-item {
    height: v-bind(resizeImgHeight());
    margin-bottom: v-bind(addPx(heightGap));
    text-align: v-bind(compItemAlign());
}

.scaleImg {
    width: v-bind(resizeImgWidth());
    height: v-bind(resizeImgHeight());
}

.scaleImgCrop {
    width: v-bind(resizeImgCropWidth());
    height: v-bind(resizeImgHeight());
    object-position: v-bind(compCropPosition());
    object-fit: cover;
}
</style>
