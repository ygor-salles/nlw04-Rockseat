import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup'

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email().required('Email incorreto')
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err })
        }

        const userRepository = getCustomRepository(UsersRepository);

        //SELECT * FROM USERS WHERE email = 'email'
        const userAlreadyExists = await userRepository.findOne({
            email
        })

        try {
            //possíveis erros
            // if(!(await schema.isValid(request.body))) throw 'Validation Failed!'
            if (userAlreadyExists) throw 'User already exists!'

            //Caso não ocorra nenhum erro ...
            const user = userRepository.create({
                name, email
            })
            await userRepository.save(user)
            return response.status(201).json(user)
        }
        catch (e) {
            return response.status(400).json({ error: e })
        }

    }
}

export { UserController };
