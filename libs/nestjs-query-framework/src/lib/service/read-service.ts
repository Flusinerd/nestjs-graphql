import { PrismaClient } from '@prisma/client';

export class PrimsaReadService<Model> {
  constructor(
    private readonly primsa: PrismaClient,
    private readonly modelKey: string
  ) {}

  async findOne(id: string): Promise<Model> {
    return this.primsa[this.modelKey].findOne({ where: { id } });
  }

  async query(): Promise<Model[]> {
    return this.primsa[this.modelKey].findMany();
  }
}
