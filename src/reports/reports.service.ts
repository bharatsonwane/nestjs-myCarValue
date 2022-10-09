import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user; /** behind the scen only user id will be extract and save in report table */
        return this.repo.save(report);
    }
}
