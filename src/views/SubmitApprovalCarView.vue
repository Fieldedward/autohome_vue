<template>
    <div class="approval">
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="carName" placeholder="请输入车辆型号"></el-input>
        </p>
        <p>车辆类型&nbsp;&nbsp;
            <el-radio v-model="carType" label="0">轿车</el-radio>
            <el-radio v-model="carType" label="1">SUV</el-radio>
            <el-radio v-model="carType" label="2">跑车</el-radio>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="price" placeholder="请输入车辆价格"></el-input>
        </p>
        <p>座位配置&nbsp;&nbsp;
            <el-radio v-model="seats" label="2">二座</el-radio>
            <el-radio v-model="seats" label="5">五座</el-radio>
            <el-radio v-model="seats" label="7">七座</el-radio>
        </p>
        <p>能源类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="energyType" label="0">新能源</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="energyType" label="1">汽油</el-radio>
        </p>
        <p>是否自动&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="manualTrans" label="0">自动</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="manualTrans" label="1">手动</el-radio>
        </p>
        <p>是否二手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="secondCar" label="0">新车</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="secondCar" label="1">二手车</el-radio>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="stockNum" placeholder="请设置车辆库存"></el-input>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="carDetail" placeholder="请输入车辆描述"></el-input>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="displacement" placeholder="请输入排量信息"></el-input>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="carColor" placeholder="请输入车辆颜色"></el-input>
        </p>
        <p>排放国标&nbsp;&nbsp;
            <el-radio v-model="emissionStandard" label="0">无</el-radio>
            <el-radio v-model="emissionStandard" label="1">国四</el-radio>
            <el-radio v-model="emissionStandard" label="2">国五</el-radio>
            <el-radio v-model="emissionStandard" label="3">国六</el-radio>
            <el-radio v-model="emissionStandard" label="4">国六b</el-radio>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="mileage" placeholder="请输入车辆里程"></el-input>
        </p>
        <p>生产模式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="productionMode" label="0">合资</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="productionMode" label="1">进口</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio v-model="productionMode" label="2">国产</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="transNum" placeholder="请输入过户次数"></el-input>
        </p>
        <p style="width: 600px;padding-left: 500px">
            <el-input v-model="distributorId" placeholder="请输入经销商id"></el-input>
        </p>
        <br>
        <br>
        <el-row>
            <el-button @click="submitApproval" type="success" round>提交审核</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "SubmitApprovalCarView",
        data() {
            return {
                carName: '',
                carType: '0',
                price: '',
                seats: '5',
                energyType: '1',
                manualTrans: '0',
                secondCar: '1',
                stockNum: '5',
                carDetail: '',
                displacement: '4t',
                carColor: '黑色',
                emissionStandard: '4',
                mileage: '50公里',
                productionMode: '2',
                transNum: '1',
                distributorId: '1',
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]
            }
        },
        methods: {
            submitApproval() {
                if (this.carName && this.price && this.carDetail) {
                    this.$axios.post('http://127.0.0.1:8000/approval/approval_car/',
                        {
                            name: this.carName,
                            car_type: this.carType,
                            price: this.price,
                            seats_choice: this.seats,
                            energy_type: this.energyType,
                            manual_trans: this.manualTrans,
                            second_car: this.secondCar,
                            stock_num: this.stockNum,
                            car_detail: this.carDetail,
                            displacement: this.displacement,
                            color: this.carColor,
                            emission_standard: this.emissionStandard,
                            mileage: this.mileage,
                            production_mode: this.productionMode,
                            trans_num: this.transNum,
                            distributor_id: this.distributorId,
                            carFactory: 1,
                            is_approval: 0,
                            car_detail_id: 1,
                            img_list: '[image1,image2]',
                        }
                    ).then(res => {
                        console.log(res.data)
                        if (res.data.code === 100) {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，提交车辆待审核信息成功',
                                type: 'success'
                            })

                        } else {
                            this.$message({
                                showClose: true,
                                message: '提交失败，请稍后再试',
                                type: 'warning'
                            });
                        }

                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '请填写完整信息后在提交',
                        type: 'error'
                    });
                }

            },
        }
    }
</script>

<style scoped>

</style>