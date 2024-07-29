import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelpCenter } from 'src/modules/help-centers/entities/help-center.entity'; // Adjust the path as necessary
import { CreateHelpCenterDto } from './dto/create-help-center.dto';
import { UpdateHelpCenterDto } from './dto/update-help-center.dto';

@Injectable()
export class HelpCenterService {
  constructor(
    @InjectRepository(HelpCenter)
    private readonly helpCenterRepository: Repository<HelpCenter>
  ) {}

  // async createTopic(createHelpCenterDto: CreateHelpCenterDto): Promise<HelpCenter> {
  //   const helpCenter = this.helpCenterRepository.create(createHelpCenterDto);
  //   return await this.helpCenterRepository.save(helpCenter);
  // }

  // async findAllTopics(): Promise<HelpCenter[]> {
  //   return await this.helpCenterRepository.find();
  // }

  // async findOneTopic(id: string): Promise<HelpCenter> {
  //   return await this.helpCenterRepository.findOneBy({ id });
  // }

  async updateTopic(id: string, updateHelpCenterDto: UpdateHelpCenterDto): Promise<HelpCenter> {
    await this.helpCenterRepository.update(id, updateHelpCenterDto);
    return this.helpCenterRepository.findOneBy({ id });
  }

  async removeTopic(id: string): Promise<void> {
    await this.helpCenterRepository.delete(id);
  }
}
