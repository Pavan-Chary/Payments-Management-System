import User from "@/components/models/User";

describe('User interface',()=>{

    it('should create an object of type User', ()=>{
        const user = {
            userId: 1,
            name: 'User Name',
            email: 'user@gmail.com',
            isActive: true,
        } as User;

        expect(user.name).toBe('User Name');
        expect(user.email).toBe('user@gmail.com');

    });
    
})