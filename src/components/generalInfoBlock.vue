<template>
    <section class="section accordion toggled">
        <div class="section__head">
            <div class="section__title">Общая информация</div>
            <button type="button" class="section__toggle-btn">
                <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1.9 19L0 17 12 5l12 12.1-2 1.9L12 8.9 1.9 19z"/></svg>-->
                <img :src="'./src/assets/img/chevron-top.svg'">
            </button>
        </div>
        <div class="section__body">
            <table class="table table--radius">
                <thead>
                <tr>
                    <th>Объект</th>
                    <th>Помещение</th>
                    <th>Строительные оси</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{flat.name}}<br><small>{{flat.line}}</small></td>
                    <td><span class="room-num">№{{flat.flat_number}}</span></td>
                    <td>{{flat.params}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'generalInfoBlock',
        props: ['flat']
    }
</script>

<style scoped>
    table td {
        padding: 25px;
    }
    .room-num {
        font-weight: 600;
        font-size: 1.3rem;
    }
</style>