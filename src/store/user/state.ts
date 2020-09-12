export interface UserInterface {
    firstName?: string;
    lastName?: string;
    picture?: string;
    phone?: string;
    id?: string;
    email?: string;
    emailVerified?: boolean;
    groups?: string[];
}

const state: UserInterface = {};

export default state;
