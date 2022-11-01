<template>
    <h1>About page  pokemon</h1>
    <hr>
    <h2> {{ name }} </h2>
    <button @click="onChangeName">
        Cambiar el nombre
    </button>
</template>


<!-- REVISIÓN DEL CICLO DE VIDA DE LOS COMPONENTES. -->
<script>

    
    export default {
        data() {
        return {
            name: 'Ángel'
        }
    },
    methods: {
        onChangeName(){
            console.log('Se cambiará el nombre a Haro')
            this.name = 'Haro'
        }
    },
    
    // TODOS LOS CICLOS DE VIDA DEL OPTION API
        beforeCreate(){console.log('01-beforeCreate')},
        // created: Ideal para solicitar peticiones http.
        created(){console.log('02-created')},
        beforeMount(){console.log('03-beforeMount')},
        mounted(){console.log('04-mounted')},
        beforeUpdate(){console.log('05-beforeUpdate')},
        updated(){console.log('06-updated')},
        activated(){console.log('07-activated')},
        deactivated(){console.log('08-deactivated')},
        beforeUnmount(){console.log('09-beforeUnmount')},
        // unmounted: para hacer una limpieza
        unmounted(){console.log('10-unmounted')},
        errorCaptured(){console.log('11-errorCaptured')},
        renderTracked(){console.log('12-renderTracked')},
        renderTriggered(){console.log('13-renderTriggered')},
    }
</script>
