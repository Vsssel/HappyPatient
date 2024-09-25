import { defineStore } from "pinia"
import type { Name, Actions, Getetrs, State } from "./types"

import * as actions from './actions'
import * as getters from './getters'

export const userAuthStore = defineStore<Name, State, Getetrs, Actions>('userAuthStore', {
    actions: {
        ...actions
    },

    getters: {
        ...getters
    }

    state() {
        return {
            token: ''
        }
    },

})