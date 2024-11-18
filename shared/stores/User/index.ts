import { type UserData } from './types'
import { useRouter } from 'vue-router'

const router = useRouter()

const me = {
    key: 'me',
    data: ref<UserData>(),

    authorize(id: number, name: string, surname: string, gender: string, birthDate: string, age: number, email: string, iin: string, role: string, token: string): void {
        this.data.value = { id, name, surname, token, gender, birthDate, age, email, iin, role };
        this.updateStore();
    },
    
    refreshToken(token: string): boolean {
        if (!!this.data.value)
            this.data.value.token = token;
        else return false;
        this.updateStore();
        return true;
    },

    getToken(): string | undefined {
        return this.data.value?.token;
    },

    isAuthorized(): boolean {
        return !!this.data.value;
    },

    sync(): void {
        const storeRecords = localStorage.getItem(this.key);
        if (!!storeRecords)
            this.data.value = JSON.parse(storeRecords);
    },

    updateStore(): void {
        try {
            localStorage.setItem(this.key, JSON.stringify(this.data.value));
        } catch (error) {
            console.error(error);
        };
    },

    signOut(): void {
        this.data.value = undefined;
        localStorage.removeItem(this.key);
    }
};

export default me;