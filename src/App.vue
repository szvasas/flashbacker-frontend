<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
        <v-bottom-navigation
                shift
                app
                height="8%"
        >
            <v-btn link to="/" height="100%">
                <span>New Entry</span>
                <v-icon>create</v-icon>
            </v-btn>

            <v-btn link to="/allEntries" height="100%">
                <span>All Entries</span>
                <v-icon>book</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>
