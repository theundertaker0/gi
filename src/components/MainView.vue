<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols = "12">
                    <v-btn
                        block
                        @click = "getUsers"
                    >
                        Cargar Usuarios
                    </v-btn>
                </v-col>
                <v-col cols = "12">
                    <v-data-table
                        :headers = "headers"
                        :items = "items"
                    >

                    </v-data-table>
                </v-col>
                <v-col cols = "12">
                    <p>
                        Filtros
                    </p>
               </v-col> 
                    <v-col cols = "4">
                        <v-select
                            :items="genders"
                            label="Género"
                            outlined
                            v-model = "filtersValues.gender"
                        ></v-select>
                    </v-col>
                    <v-col cols = "4">
                        <v-select
                            :items="ages"
                            label="Edad"
                            outlined
                            v-model = "filtersValues.age"
                        ></v-select>
                    </v-col>
                    <v-col cols = "4">
                        <v-select
                            :items="nacionalities"
                            label="Nacionalidad"
                            outlined
                            v-model = "filtersValues.nacionality"
                        ></v-select>
                    </v-col>
                    <v-col cols = "12">
                        <v-btn
                            @click = "filter"
                        >
                        Filtrar
                        </v-btn>
                        <v-btn
                        @click = "cleanFilters"
                        >
                        Borrar Filtros
                        </v-btn>
                    </v-col>
            </v-row>

        </v-container>
    </v-app>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            genders : [],
            nacionalities : [],
            ages : [],
            data : [],
            items : [],
            headers : [
                {text : 'Género', value : 'gender'},
                {text : 'Nombre', value : 'fullName'},
                {text : 'Email', value : 'email'},
                {text : 'Nacionalidad', value : 'location.country'},
                {text : 'Fecha de Nacimiento', value : 'dob.date'},
                {text : 'Fecha de Registro', value : 'registered.date'},
            ],
            filtersValues : {
                gender: null,
                age : null,
                nacionality : null
            }
        }
    },
    methods: {
        getUsers() {
            axios.get('https://randomuser.me/api/?results=100').then(result => {
                let g = [], a = [], n = [];
                this.data = result.data.results,
                this.items = result.data.results.map(item => {
                    item.registered.date = item.registered.date.split('T')[0];
                    item.dob.date = item.dob.date.split('T')[0].toString();
                    item.fullName = item.name.first + " " + item.name.last
                    g.push(item.gender);
                    a.push(item.dob.age)
                    n.push(item.location.country)
                    return item;
                });
               this.genders = [...new Set(g)];
               this.ages = [...new Set(a)];
               this.nacionalities = [...new Set(n)];
            });
            
        },
        filter() {
            this.items = this.data;
         if(this.filtersValues.gender != null) {
            this.items = this.items.filter(item => item.gender == this.filtersValues.gender);
         }
         if(this.filtersValues.age != null) {
            this.items = this.items.filter(item => item.dob.age == this.filtersValues.age);
         }
         if(this.filtersValues.nacionality != null) {
            this.items = this.items.filter(item => item.location.country == this.filtersValues.nacionality);
         }
        },
        cleanFilters(){
            this.filtersValues.gender = null;
            this.filtersValues.age = null;
            this.filtersValues.nacionality = null;
            this.items = this.data;
        }
    },
}
</script>
<style>
    
</style>