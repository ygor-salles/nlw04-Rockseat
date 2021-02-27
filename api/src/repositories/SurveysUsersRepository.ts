import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { SurveyUser } from '../models/SurveyUser'

@EntityRepository(SurveyUser)
class SurveyUsersRepository extends Repository<SurveyUser> {}

export { SurveyUsersRepository } 