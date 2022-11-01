<template>
    <!-- <h1>Pokemon page: <span> #{{ id }} </span> </h1> -->
    <h1>Pokemon page: <span> #{{ id }} </span> </h1>
    <div v-if="pokemon">
            <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
</template>

<script>
export default {

    props: {
        id: {
            type: Number,
            requied: true
        }
    },

    data() {
        return {
            // El resultado de la petición http, se va a almacenar en una propiedad reactiva.
            pokemon: null
        }
    },
    // Las peticiones http se realizan en el created ya que en este punto ya esta montodo el componente.
    created() {
        //console.log( this.$route )
            // const { id } = this.$route.params
            // console.log( id )
        // this.id = id

        this.getPokemon()

    },
    methods: {
        async getPokemon(){
            try {
            const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${ this.id }`).then( r => r.json() )
            console.log(pokemon)
            this.pokemon = pokemon
            } catch ( error ) {
                // En caso de presentar fallo la llamada http o que se modifique la url con un elemendo id invalido
                // se procedera a sacar al usuario de la página.
                this.$route.push('/')
                console.log('No hay nada que hacer aquí.')
            }
        }
    },

    // Como la propiedad de pokemion-id no se vueklve a lanzar, hay que estar pendiente de esta propiedad
    // reactiva para volver a lanzar la petición http.
    watch: {
        id(){
            this.getPokemon()
        }
    }

}
</script>