import { Controller, Get, Post } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post('create')
    async createEmployee(): Promise<Employee> {
        return this.employeeService.createEmployee();
    }

    @Get('all')
    async findAll(): Promise<Employee[]> {
        return this.employeeService.findAll();
    }
}
