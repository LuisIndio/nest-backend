import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { UserActiveInterface } from 'src/Common/interfaces/user-active.interface';
import { Role } from 'src/Common/enums/rol.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

  ) {}

  async create(createEventDto: CreateEventDto,user: UserActiveInterface) {
    return await this.eventRepository.save({
      ...createEventDto,
      userId:user.id});
  }

  async findAll() {
    
    return await this.eventRepository.find();
  }
  async findAllByUser(user: UserActiveInterface) {
    if(user.role === Role.ADMIN){
      return await this.eventRepository.find();
    }
    return await this.eventRepository.find({
      where: {
        userId: user.id,
      },
    });
  }

  async findOne(id: number,user: UserActiveInterface) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new BadRequestException('Event not found');
    }
    this.validateOwnership(event, user);

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto,user: UserActiveInterface) {
    //return await this.eventRepository.update({id}, updateEventDto)
    await this.findOne( id,user );
    return await this.eventRepository.update(id,{
      ...updateEventDto,
      userId:user.id
    });
  }

  async remove(id: number,user: UserActiveInterface) {
    await this.findOne( id,user );
    return await this.eventRepository.softDelete({id});
  }

  private validateOwnership(event: Event, user: UserActiveInterface) {
    if (event.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not allowed to see this event');
    }
  }
}
