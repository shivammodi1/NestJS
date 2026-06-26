import { Body, Controller, Get, Param, Post, Put, Delete, Patch, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

/*
 * @Controller('employee')
 * All routes in this controller will start with /employee
 *
 * Examples:
 * POST /employee/addEmp
 * GET  /employee/getAllEmp
 */
@Controller('employee')
export class EmployeeController {
  /*
   * NestJS Dependency Injection (DI)
   * EmployeeService is automatically injected by NestJS.
   * We can use this service to perform database operations.
   */
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  /*
   * POST /employee/addEmp
   *
   * @Body() extracts the request body and maps it to an Employee object.
   * Calls service method that directly uses repository.save().
   */
  @Post('/addEmp')
  async addEmployee(@Body() employee: Employee) {
    const newEmployee = await this.employeeService.addEmployee(employee);
    return newEmployee;
  }

  /*
   * POST /employee/addEmpWithCreate
   *
   * Calls service method that uses:
   * repository.create() + repository.save()
   */
  @Post('/addEmpWithCreate')
  async addEmployeeWithCreate(@Body() employee: Employee) {
    const newEmployee =
      await this.employeeService.addEmployeeWithCreate(employee);

    return newEmployee;
  }

  /*
   * GET /employee/getAllEmp
   *
   * Fetches all employees from the database.
   */
  @Get('/getAllEmp')
  async getEmployees() {
    const employeeList = await this.employeeService.getEmployees();
    return employeeList;
  }

  /*
   * GET /employee/getEmpById/:id
   *
   * @Param('id') extracts the id from the URL.
   * URL parameters are strings by default,
   * so Number(id) converts it to a number.
   *
   * Example:
   * GET /employee/getEmpById/1
   */
  @Get('/getEmpById/:id')
  async getEmployeeById(@Param('id') id: string) {
    const employee = await this.employeeService.getEmployeeById(Number(id));
    return employee;
  }

  /*
   * POST /employee/deleteEmpById/:id
   *
   * Deletes an employee using the given id.
   *
   * Example:
   * POST /employee/deleteEmpById/1
   */
  @Delete('/deleteEmpById/:id')
  async deleteEmployeeById(@Param('id') id: string) {
    const result = await this.employeeService.deleteEmployeeById(Number(id));
    return result;
  }

  /*
   * POST /employee/updateEmpById/:id
   *
   * @Param('id') -> Employee id from URL
   * @Body()      -> Updated employee data
   *
   * Example:
   * POST /employee/updateEmpById/1
   */
  @Put('/updateEmpById/:id')
  async updateEmployeeById(
    @Param('id') id: string,
    @Body() employee: Employee,
  ) {
    const result = await this.employeeService.updateEmployeeById(
      Number(id),
      employee,
    );

    return result;
  }

    /*
    * PATCH /employee/updatePartialEmpById/:id
    *
    *   @Param('id') -> Employee id from URL
    *  @Body()      -> Partial employee data
    *
    * Example:
    * PATCH /employee/updatePartialEmpById/1
    */
  @Patch('/updatePartialEmpById/:id')
  async updatePartialEmployeeById(
    @Param('id') id: string,
    @Body() partialEmployee: Partial<Employee>,
  ) {
    const result = await this.employeeService.updatePartialEmployeeById(
      Number(id),
      partialEmployee,
    );

    return result;
  }

    /*
    * GET /employee/search
    *   @Query() -> Query parameters for filtering
    *   
    *   
    * Example:
    * GET /employee/search?name=John&position=Manager&salary=50000
    */
  @Get('/search')
  async search(@Query() filters: { name?: string; position?: string; salary?: number }) {
    const result = await this.employeeService.search(filters);
    return result;
  }
  

}