<template>
    <div class="wrapper">
        <div class="panel">
            <header class="panel__head">Стороны и объект договора</header>
            <main class="panel__body">
                <general-info-block></general-info-block>
                <areas-info-block v-bind:squares="getCurrentObject.squares"></areas-info-block>
                <conditions-options-block></conditions-options-block>
                <participants-control-block></participants-control-block>
            </main>
            <footer class="panel__actions">
                <actions-block></actions-block>
            </footer>
        </div>
    </div>
</template>

<script>
    import generalInfoBlock from './components/generalInfoBlock.vue';
    import areasInfoBlock from './components/areasInfoBlock.vue';
    import conditionsOptionsBlock from './components/conditionsOptionsBlock.vue';
    import participantsControlBlock from './components/participantsControlBlock.vue';
    import actionsBlock from './components/actionsBlock.vue';

    export default {
        components: {
            'general-info-block': generalInfoBlock,
            'areas-info-block': areasInfoBlock,
            'conditions-options-block': conditionsOptionsBlock,
            'participants-control-block': participantsControlBlock,
            'actions-block': actionsBlock
        },
        mounted: async function () {
            await this.$store.dispatch('LOAD_OBJECT');
        },
        computed: {
            getCurrentObject: function() {
                return this.$store.getters.getCurrentObject;
            }
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>