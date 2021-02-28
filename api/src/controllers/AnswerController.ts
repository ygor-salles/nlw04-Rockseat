import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUsersRepository } from '../repositories/SurveysUsersRepository';




class AnswerController {
    
    async execute(request: Request, response: Response){
        const { value } = request.params
        const { u } = request.query

        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)

        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u),
        })

        try {
            if(!surveyUser) throw 'Survey User does not exists!'
            
            surveyUser.value = Number(value)
            await surveyUsersRepository.save(surveyUser)
            return response.json(surveyUser)    
        } catch (e) {
            return response.status(400).json({ error: e })
        }
    }
}

export { AnswerController }