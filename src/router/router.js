import { createRouter, createWebHashHistory } from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

// Se importan las pagínas que serán parte del router.
// Se comenta este import para revisar la carga perezosa lazy loading.
    // import AboutPage from '@/modules/pokemon/pages/AboutPage'
    // import ListPage from '@/modules/pokemon/pages/ListPage'
    // import PokemonPage from '@/modules/pokemon/pages/PokemonPage'
    // import NoPageFound from '@/modules/shared/pages/NoPageFound'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    // Este path se agrego al final para demostrar que si una ruta cambia y los usuario tienen guardado el path anterior se pueda
    // hacer una redirección de manera facíl.
    {
        path: '/',        
        redirect: '/pokemon'
    },

    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import( /* webpackChunkName: "pokemonPage" */ '@/modules/pokemon/layouts/PokemonLayout'),
        // En las rutas hijas no se acostumbra usar el slash en la parte del path: /
        children: [
                { 
                    path: 'home', 
                    name: 'pokemon-home',
                    //component: ListPage 
                    component: () => import( /* webpackChunkName: "pokemon-home-" */ '../modules/pokemon/pages/ListPage') 
                },

                // Ejemplo de como se hace el LazyLoading
                { 
                    path: 'about', 
                    name: 'pokemon-about',
                    component: () => import( /* webpackChunkName: "pokemon-about-" */ '../modules/pokemon/pages/AboutPage') 
                },
                
                { 
                    path: 'pokemonid/:id', 
                    name: 'pokemon-id',
                    props: ( route ) => {
                        // se valida que la URL no venga con algún caracter tipo string
                        const idnum = Number( route.params.id )
                        return isNaN(  idnum  ) ? { id: 1 } : { id: idnum }
                        },
                    //component: PokemonPage 
                    component: () => import( /* webpackChunkName: "Pokemon-page-" */ '../modules/pokemon/pages/PokemonPage') 
                },

                {
                    path: '',
                    redirect: { name: 'pokemon-about' }
                },
        ]
    },

        // DBZ Layput
        {
            path: '/dbz',
            name: 'dbz',

            // Se aplicara el Guard desde el archivo de js solamnete para los componentes de DGZ
            beforeEnter: [ isAuthenticatedGuard ],

            component: () => import( /* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout'),
            // En las rutas hijas no se acostumbra usar el slash en la parte del path: /
            children: [
                    { 
                        path: 'characters', 
                        name: 'dbz-characters',
                        //component: ListPage 
                        component: () => import( /* webpackChunkName: "dbz-characters" */ '@/modules/dbz/pages/Characters') 
                    },

                    // Ejemplo de como se hace el LazyLoading
                    { 
                        path: 'about', 
                        name: 'dbz-about',
                        component: () => import( /* webpackChunkName: "dbz-about" */ '@/modules/dbz/pages/About') 
                    },

                    {
                        path: '',
                        redirect: { name: 'dbz-characters' }
                    }
                ]
        },               
        
    

    // // // { 
    // // //     path: '/home', 
    // // //     name: 'home',
    // // //     //component: ListPage 
    // // //     component: () => import( /* webpackChunkName: "ListPage" */ '../modules/pokemon/pages/ListPage') 
    // // // },

    // // // // Se comenta este import para revisar la carga perezosa lazy loading.
    // // // //{ path: '/about', component: AboutPage },

    // // // // Ejemplo de como se hace el LazyLoading
    // // // { 
    // // //     path: '/about', 
    // // //     name: 'about',
    // // //     component: () => import( /* webpackChunkName: "PaginaAbout" */ '../modules/pokemon/pages/AboutPage') 
    // // // },
    
    // // // { 
    // // //     path: '/pokemonid/:id', 
    // // //     name: 'pokemon-id',
    // // //     props: ( route ) => {
    // // //         // se valida que la URL no venga con algún caracter tipo string
    // // //         const idnum = Number( route.params.id )
    // // //         return isNaN(  idnum  ) ? { id: 1 } : { id: idnum }
    // // //         },
    // // //     //component: PokemonPage 
    // // //     component: () => import( /* webpackChunkName: "PokemonPage" */ '../modules/pokemon/pages/PokemonPage') 
    // // // },

    // Para las rutas no definidas se usa Path MAtch
    { 
        path: '/:pathMatch(.*)*', 
        //component: NoPageFound 
        component: () => import( /* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound') 
    },

  ]

 // 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  // Guard Asincróno global
        /*
            const canAccess = () => {
                return new Promise ( resolve => {       
                        const random = Math.random() * 100

                        if( random > 50 ){
                            console.log('Autenticado - CAN ACCESS');
                            resolve(true)
                        } else {
                            console.log(random, 'Bloqueado por el beforeEach Guard - CAN ACCESS');
                            resolve(false)
                        }                     
                    } 
                )
            }

            // Se aplica en el router la validación de la autorización.
            router.beforeEach( async(to, from, next) => {
                const autorizado = await canAccess()
                autorizado 
                    ? next() 
                    : next( { name: 'pokemon-home' } )
            } )
        */


    // Guard global, se ejecuta antes de entrar a cualquier rutas - Síncrono
        /*
                router.beforeEach( ( to, from, next ) => {
                console.log({ to, from, next });

                // CÓDIGO DE PRUEBA PARA MOSTRAR EL GUARD
                const random = Math.random() * 100
                if( random > 50 ){
                    console.log('Autenticado*****');
                    next()
                } else {
                    console.log(random, 'Bloqueado por el beforeEach Guard');
                    next( { name: 'pokemon-home' } )
                        }    
                    } 
                )
        */

export default router
