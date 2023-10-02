import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/Common/enums/rol.enum';
import { ActiveUser } from 'src/Common/decorators/active-user.decorator';
import { User } from 'src/users/entities/user.entity';
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

  @Get()
  findAll() {
    return this.eventsService.findAll();
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
