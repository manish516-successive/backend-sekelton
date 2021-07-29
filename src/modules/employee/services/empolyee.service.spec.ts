import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { LoggingService } from '../../logging/logging.service';
import { Employee } from '../entities/employee.entity'
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity)
}));

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repositoryMock: MockType<Repository<Employee>>;
  let loggingService: LoggingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        LoggingService,
        { provide: getRepositoryToken(Employee), useFactory: repositoryMockFactory },
      ],
    }).compile();
    service = module.get<EmployeeService>(EmployeeService);
    loggingService = module.get<LoggingService>(LoggingService);

    repositoryMock = module.get(getRepositoryToken(Employee));
  });

  it('should find all employees', async () => {
    jest.spyOn(loggingService, 'log').mockImplementation((message) => "");
    const mockEmployees = [{
      id: 1,
      name: "Test Employee"
    }];
    repositoryMock.find.mockReturnValue(mockEmployees);
    expect(await service.findAll()).toEqual(mockEmployees);
    expect(repositoryMock.find).toHaveBeenCalledWith({ relations: ["department"] });
  });

  it('should return a employee', async () => {
    const mockEmployee = {
      id: 1,
      name: "Test Employee"
    };
    repositoryMock.findOne.mockReturnValue(mockEmployee);
    expect(await service.findOne(1)).toEqual(mockEmployee);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(1);
  });
});