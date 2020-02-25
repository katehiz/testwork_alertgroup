<template>
    <section class="section accordion toggled">
        <div class="section__head">
            <div class="section__title">Площади</div>
            <button type="button" class="section__toggle-btn">
                <img :src="'./src/assets/img/chevron-top.svg'">
            </button>
        </div>
        <div class="section__body">
            <table class="table table--radius">
                <thead>
                <tr>
                    <th>Жилая</th>
                    <th>Нежилая</th>
                    <th>С пониженным коэф.</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(id, index) in squaresGroups.maxCount">
                    <td>
                        <div v-if="squaresGroups.type1[index]">
                            <span>{{squaresGroups.type1[index].name}}</span>
                            <span>{{squaresGroups.type1[index].square}} м<sup>2</sup></span>
                        </div>
                    </td>
                    <td>
                        <div v-if="squaresGroups.type2[index]">
                            <span>{{squaresGroups.type2[index].name}}</span>
                            <span>{{squaresGroups.type2[index].square}} м<sup>2</sup></span>
                        </div>
                    </td>
                    <td>
                        <div v-if="squaresGroups.type3[index]">
                            <span>{{squaresGroups.type3[index].name}}</span>
                            <span>{{squaresGroups.type3[index].square}} м<sup>2</sup></span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'areasInfoBlock',
        props: {
            squares: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        computed: {
            squaresGroups() {
                let result = {};
                result.type1 = this.squares.filter( (square) => square.type_square === 1 );
                result.type2 = this.squares.filter( (square) => square.type_square === 2 );
                result.type3 = this.squares.filter( (square) => square.type_square === 3 );
                result.maxCount = Math.max(result.type1.length, result.type2.length, result.type3.length);
                return result;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/_variables.scss';

    table thead th {
        width: calc(100% / 3);
    }
    table tbody td div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>