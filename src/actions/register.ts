"use server"

import { IFormData } from "@/types/form-data"
import { IUser } from "@/types/user";
import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";

interface RegistrationResult {
  user?: IUser;
  error?: string;
}

export async function registerUser(formData: IFormData): Promise<RegistrationResult> {
    const {email, password, confirmPassword} = formData;
    
    if(password !== confirmPassword) {
        return {error: "Пароль не совпадает"};
    }
    
    if(password.length < 6 ) {
        return {error: "Пароль должен быть больше 6 символов"}
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            return ({error: "Пользователь с таким email уже существует"})
        }

        const pwHash = await saltAndHashPassword(password);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: pwHash}
                
     });

     return {user};
    } catch (error) {
        console.error("Ощибка при регистрации", error);
        return {error: "Ошибка при регестрации"};
        
    }
}