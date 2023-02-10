import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { ListDto } from './dto/iist.dto';
import { ListEntity } from './entities/list.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ListService', () => {
  let listService: ListService;
  let listRepository: Repository<ListEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        {
          provide: getRepositoryToken(ListEntity),
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1 }),
            save: jest.fn().mockResolvedValue({ id: 1 }),
            find: jest.fn().mockResolvedValue([{ id: 1 }]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    listService = module.get<ListService>(ListService);
    listRepository = module.get<Repository<ListEntity>>(getRepositoryToken(ListEntity));
  });

  describe('create', () => {
    it('should create a new list', async () => {
      const data: ListDto = {
        description: 'Lembrar de comprar pão no caminho para casa',
        status: true
      };
      const result = await listService.create(data);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('findAll', () => {
    it('should return all lists', async () => {
      const result = await listService.findAll();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('should return a list by description', async () => {
      const result = await listService.findOne('Lembrar de comprar pão no caminho para casa');
      expect(result).toEqual({ id: 1 });
    });
  });
});