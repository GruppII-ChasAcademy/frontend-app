export type UserRole = "admin" | "sender" | "carrier" | "receiver";

    export type User = {
    id: number;
    email: string;
    password: string; 
    role: UserRole;
    token: string;
    };

    const mockUsers: User[] = [
    { id: 1, email: "admin@example.com", password: "admin123", role: "admin", token: "token-admin" },
    { id: 2, email: "sender@example.com", password: "sender123", role: "sender", token: "token-sender" },
    { id: 3, email: "carrier@example.com", password: "carrier123", role: "carrier", token: "token-carrier" },
    { id: 4, email: "receiver@example.com", password: "receiver123", role: "receiver", token: "token-receiver" },
    
    ];

    export const mockLogin = async (email: string, password: string) => {
    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error("User not found");
    
    if (user.password !== password) throw new Error("Invalid password"); 

    return user;
    };
