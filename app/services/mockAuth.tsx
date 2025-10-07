    type Role = 'admin' | 'sender' | 'carrier' | 'customer';

    export const mockLogin = async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));


    const roles: Role[] = ['admin', 'sender', 'carrier', 'customer'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const fakeToken = `mocked.jwt.token.${Date.now()}`;

    return {
        token: fakeToken,
        role: randomRole,
    };
    };
