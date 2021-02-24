import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response){
        const { name, email } = request.body
        
        const userRepository = getRepository(User);
        
        //SELECT * FROM USERS WHERE email = 'email'
        const userAlreadyExists = await userRepository.findOne({email})
        
        try {
            //possíveis erros
            if(userAlreadyExists) throw 'User already exists!'
            
            //Caso não ocorra nenhum erro ...
            console.log('Caiu')
            const user = userRepository.create({
                name, email
            }) 
            await userRepository.save(user)
            return response.json(user) 
        } 
        catch (e) {
            return response.status(400).json({error: e})
        }
        
    }
}

export { UserController }