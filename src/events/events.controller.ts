import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/Common/enums/rol.enum';
import { ActiveUser } from 'src/Common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/Common/interfaces/user-active.interface';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Events')
@ApiBearerAuth()
@Auth(Role.USER)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto,@ActiveUser() user: UserActiveInterface) {
    return this.eventsService.create(createEventDto,user);
  }
  @Post(':eventId/add-users')
  async addUsersToEvent(
    @Param('eventId') eventId: number,
    @ActiveUser() user: UserActiveInterface,
  ) {
    try {
      console.log(user);
      console.log(eventId);
      const event = await this.eventsService.addUsersToEvent(eventId, user);
      console.log(event);
      return { message: 'Usuarios agregados al evento exitosamente', event };
    } catch (error) {
      return { message: 'Error al agregar usuarios al evento', error: error.message };
    }
  }

  @Get()
  findAll() {
    return this.eventsService.findAll(
      
    );
  }

  @Get('user')
  findAllByUser(@ActiveUser() user: UserActiveInterface)  {
    
    return this.eventsService.findAllByUser(user);
  }
  
  @Get(':id')
  findOne(@Param('id') id: number,@ActiveUser() user: UserActiveInterface) {
    return this.eventsService.findOne(id,user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto,@ActiveUser() user: UserActiveInterface) {
    return this.eventsService.update(id, updateEventDto,user);
  }
  @Delete(':id')
  remove(@Param('id') id: number,@ActiveUser() user: UserActiveInterface) {
    return this.eventsService.remove(id,user);
  }
}
