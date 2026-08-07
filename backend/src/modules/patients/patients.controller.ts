import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() body: any) {
    return this.patientsService.createPatient(body);
  }

  @Get()
  findAll() {
    return this.patientsService.findAllPatients();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Post(':id/visits')
  createVisit(@Param('id') patientId: string, @Body() body: any) {
    return this.patientsService.createVisit(patientId, body);
  }
}
