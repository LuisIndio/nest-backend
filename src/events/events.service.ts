import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { UserActiveInterface } from 'src/Common/interfaces/user-active.interface';
import { Role } from 'src/Common/enums/rol.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  async create(createEventDto: CreateEventDto,user: UserActiveInterface) {
    return await this.eventRepository.save({
      ...createEventDto,
      userId:user.id
    });
  }

  async addUsersToEvent(eventId: number, user: UserActiveInterface) {
    try {
      const event = await this.eventRepository.findOneBy({ id: eventId });
  
      if (!event) {
        throw new Error('Evento no encontrado');
      }
      const userToAdd: User = {
        id: user.id,
        email: user.email,
        role: Role.USER,
      };
  
      if (!Array.isArray(event.users)) {
        event.users = [];
      }
      event.users.push(userToAdd);
  
      await this.eventRepository.save(event);
  
      return { message: 'SUsuario agregado al evento exitosamente', event };
    } catch (error) {
      throw new Error(`Error al agregar usuario al evento: ${error.message}`);
    }
  }
  
  
  
  
  
  async findOnee(eventId: number, user: UserActiveInterface) {
    return await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.users', 'users')
      .where('event.id = :eventId', { eventId })
      .andWhere('users.id = :userId', { userId: user.id })
      .getOne();
  }
  

  async findAll() {
    
    return await this.eventRepository.find({
      relations: ['users'],
    });
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
