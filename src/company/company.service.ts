import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository, } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Question)
    private userService: UsersService,
  ) {}

  async create(id: number, createCompanyDto: CreateCompanyDto) {
    const userFound = await this.userRepository.findOne({ where: { id } })
    if(!userFound) {
        throw new NotFoundException('User not found');
    } else {
        const newCompany = this.companyRepository.create(createCompanyDto);
        newCompany.user = userFound;
        return this.companyRepository.save(newCompany);
    }
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if (company) {
      return company;
    } else {
      throw new NotFoundException('company not available');
    }
  }

  async findOneByOwnerId(id: number) {
    const companies = await this.companyRepository.find({
      where: { user: {id}},
      relations: ['companyLogo']
    });
    if (companies.length > 0) {
      return companies[0];
    } else {
      throw new NotFoundException('company not available');
    }
  }

  async findOneByUser(user: User) {
    const company = await this.companyRepository.findOne({ where: { user } });
    if (company) {
      return company;
    } else {
      throw new NotFoundException('company not available');
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (!company) {
      throw new BadRequestException('company not available');
    }
    await this.companyRepository.update(id, updateCompanyDto);
    return this.companyRepository.findOneBy({ id });
  }

  async updateLogoUrl(id: number, logoId: number) {
    const company = await this.findOne(id);
    if (!company) {
      throw new BadRequestException('company not available');
    }
    company.companyLogo = { id: logoId } as any;
    await this.companyRepository.save(company);
    return this.companyRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.companyRepository.delete(id);
    return id;
  }

  async getMatchedBusinesses(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } })
    const investorSubmission = this.submissionsRepository.find({
      relations: {
        question: true,
        answer: true,
      },
      where: {
        user: userFound,
      }
    });
    const ans = (await investorSubmission).map(sub2 => sub2.answer.text);
    const matchedBusinesses = this.companyRepository.find({
      where: {
        growthStage: In(ans),
        country: In(ans),
        businessSector: In(ans),
        registrationStructure: In(ans)
      }
    })
    const matched = [];
    (await matchedBusinesses).forEach((biz) => {
      var matchedMap = {};
      matchedMap['country'] = biz.country;
      matchedMap['businessSector'] = biz.businessSector;
      matchedMap['growthStage'] = biz.growthStage;
      matchedMap['registrationStructure'] = biz.registrationStructure;
      matched.push(matchedMap);
    })
    return matched;
  }

  async getSubmissionsWithAnswersGroupedByUser(answerTexts: string[]): Promise<any[]> {
    try {
      const queryBuilder = this.submissionsRepository.createQueryBuilder('submission')
        .innerJoinAndSelect('submission.user', 'user')
        .innerJoinAndSelect('submission.question', 'question')
        .innerJoinAndSelect('submission.answer', 'answer')
        .where('user.roles = :role', { role: 'investor' })
        .andWhere('answer.text IN (:...answerTexts)', { answerTexts })
        .select([
          'submission.id as submission_id',
          'user.id as user_id',
          'user.firstName as user_firstname',
          'user.lastName as user_lastname',
          'question.id as question_id',
          'question.text as question_text',
          'answer.id as answer_id',
          'answer.text as answer_text',
          'answer.weight as answer_weight'
        ])
        .groupBy('user.id, user.firstName, user.lastName, submission.id, question.id, question.text, answer.id, answer.text, answer.weight');

      const results = await queryBuilder.getRawMany();

      const groupedResults = results.reduce((acc, curr) => {
        const userId = curr.user_id;
        if (!acc[userId]) {
          acc[userId] = {
            id: userId,
            username: curr.user_firstname + " " + curr.user_lastname,
            submissions: [],
          };
        }
        acc[userId].submissions.push({
          submissionId: curr.submission_id,
          question: {
            id: curr.question_id,
            text: curr.question_text,
          },
          answer: {
            id: curr.answer_id,
            text: curr.answer_text,
            weight: curr.answer_weight,
          },
        });
        return acc;
      }, {});

      return Object.values(groupedResults);
    } catch (error) {
      console.error('Error retrieving submissions:', error);
      throw error;
    }
  }

  async getMatchedInvestors(id: number) {
    const companyFound = await this.findOneByOwnerId(id);
    if(!companyFound) {
      throw new NotFoundException();
    }
    const responsesToMatch = [companyFound.country, companyFound.businessSector, companyFound.growthStage, companyFound.registrationStructure];
    const submissions = await this.getSubmissionsWithAnswersGroupedByUser(responsesToMatch);
      
    return submissions.filter((submission) => submission.submissions.length === responsesToMatch.length).map(inv => { 
      return { id: inv.id, name: inv.username } 
    });
  }

}
