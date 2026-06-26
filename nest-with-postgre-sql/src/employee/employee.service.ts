import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // ================================
  // METHOD 1: Direct save()
  // ================================
  async addEmployee(employee: Employee): Promise<Employee> {
    // save() directly inserts or updates the record in DB
    // If employee has NO id → INSERT query
    // If employee HAS id → UPDATE query

    return this.employeeRepository.save(employee);
  }

  // ================================
  // METHOD 2: create() + save()
  // ================================
  async addEmployeeWithCreate(employee: Employee): Promise<Employee> {
    // create() only creates a new entity instance in memory
    // It does NOT hit the database

    const newEmployee = this.employeeRepository.create(employee);

    // save() persists the entity into DB
    // INSERT if newEmployee has no id
    // UPDATE if id exists

    return this.employeeRepository.save(newEmployee);
  }

  // ================================
  // fetch all employees method
  // ================================
  async getEmployees() {
    const exmployeeList = await this.employeeRepository.find();
    return exmployeeList;
  }

  // ================================
  // find by id method
  // ================================
  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findOneBy({ id });
    return employee;
  }

  // ================================
  // delete by id method
  // ================================
  async deleteEmployeeById(id: number) {
    const result = await this.employeeRepository.delete(id);
    return result;
  }

  // ================================
  // update by id method
  // ================================
  async updateEmployeeById(id: number, employee: Employee) {
    const result = await this.employeeRepository.update(id, employee);
    return result;
  }

  // ================================
  // update partial fields by id method
  // ================================
  async updatePartialEmployeeById(
    id: number,
    partialEmployee: Partial<Employee>,
  ) {
    const emp = await this.employeeRepository.findOneBy({ id });
    if (!emp) {
      throw new Error(`Employee with id ${id} not found`);
    }

    const updatedEmployee = Object.assign(emp, partialEmployee);
    const result = await this.employeeRepository.save(updatedEmployee);
    return result;
  }

  // ================================
  // search method with filters
  // ================================

  async search(filters: { name?: string; position?: string;salary?: number;}): Promise<Employee[]> {
    // Create query builder instance for Employee table with alias 'employee'
    const query = this.employeeRepository.createQueryBuilder('employee');

    // If name filter is provided, apply LIKE search (partial match)
    // ILIKE is used for case-insensitive search in PostgreSQL
    if (filters.name) {
      query.andWhere('employee.name ILIKE :name', {
        name: `%${filters.name}%`, // % used for wildcard search
      });
    }

    // If position filter is provided, apply exact match condition
    if (filters.position) {
      query.andWhere('employee.position = :position', {
        position: filters.position,
      });
    }

    // If salary filter is provided, apply minimum salary condition
    if (filters.salary) {
        // first part inside the ' ' we write the question 
        // second part inside the {} we write the answer
      query.andWhere('employee.salary >= :salary', {
        salary: filters.salary,
      });
    }

    // Execute query and return all matching employees
    return await query.getMany();
  }
}


