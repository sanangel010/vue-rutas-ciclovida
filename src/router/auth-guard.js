const isAuthenticatedGuard = ( to, from, next ) => {
    //console.log( { to, from, next } )
    return new Promise( () => {
      
        const random = Math.random() * 100

        if( random > 50 ){
            console.log('Está autenticado:');
            next()
        } else {
            console.log(random, 'Bloqueado por el beforeEach Guard');
            next( { name: 'pokemon-home' } )
        }                 
    })
}

export default isAuthenticatedGuard