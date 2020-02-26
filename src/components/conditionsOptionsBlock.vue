<template>
    <section class="section accordion toggled">
        <div class="section__head">
            <div class="section__title">Условия</div>
            <button type="button" class="section__toggle-btn">
                <img :src="'./src/assets/img/chevron-top.svg'">
            </button>
        </div>
        <div class="section__body">
            <div class="row">
                <div class="col-sm-12">
                    <label for="types-of-property">
                        Вид собственности
                        <span class="required-text">(обязательное поле)</span>
                    </label>
                </div>
                <div class="col-sm-6">
                    <select
                            name="types-of-property"
                            id="types-of-property"
                            class="form-element"
                            v-model="selectedTypeOfProperty">
                        <option v-for="(val, key) in properties" :value="key">{{val}}</option>
                    </select>
                </div>
                <span class="col-sm-6 col-form-label required-text">обязательное поле</span>
            </div>
        </div>
    </section>
</template>

<script>
    import {CustomSelect} from '../assets/js/scripts.js';

    export default {
        name: 'conditionsOptionsBlock',
        data: function() {
            return {
                properties: {
                    1: "индивидуальная",
                    2: "долевая",
                    3: "общая долевая",
                    4: "общая совместная"
                },
                selectedTypeOfProperty: 1
            }
        },
        mounted: function() {
            CustomSelect.init();
        },
        watch: {
            selectedTypeOfProperty: function() {
                this.$store.commit('setTypeOfProperty', this.selectedTypeOfProperty);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col-form-label {
        text-align: right;
    }
</style>